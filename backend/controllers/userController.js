import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import sendEmailVarificationOTP from '../utils/sendEmailVarificationOTP.js'
import EmailVarificationModel from '../models/emailVerificationModel.js';
class UserController {

    // Registration
  static userRegistration = async(req, res)=>{
    try {
        const {firstName, lastName, email, password, password_confirmation} = req.body;
        
        //All fields required
        if(!firstName || !lastName || !email ||!password || !password_confirmation){
            res.status(400).json({
                status:"Failed",
                message:"All fields are required"
            })
        }

        //Password and Password confirmation match
        if(password !== password_confirmation){
            res.status(400).json({
                status:"Failed",
                message:"Confirmation password does not match"
            })
        }

        //Existing User
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            res.status(400).json({
                status:"Failed",
                message:"User already exist"
            })
        }

        //Password Hashing
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);

        //Create new user and save in database
        const newUser = await userModel({
            firstName, lastName, email, password:hashPassword
        }).save();

        sendEmailVarificationOTP(req, newUser);

        res.status(201).json({
            status:"Success",
            message:"New user registered successfully",
            user:{ id :newUser._id, email: newUser.email }
        });

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Unable to register please try again"
        });
    }
  }
  // Email Varification
  static VerifyEmail = async (req, res)=>{
    try {
        
        const {email, otp } = req.body;
        if(!email || !otp){
            res.status(404).json({
                status:"Failed",
                message:"All fields are required"
            })
        }

        //Check for existing user is already verified email
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            if(existingUser.is_verified){
                res.status(404).json({
                    status:"Failed",
                    message:"Already Verified Email!"
                })
            }
        }
        
        //If OTP is not send for existing User then resend it
        const emailVerification = await EmailVarificationModel.findOne({userId : existingUser._id, otp})
        if(!emailVerification){
            if(!existingUser.is_verified){
                sendEmailVarificationOTP(req, existingUser);
                res.status(404).json({
                    status:"Failed",
                    message:"Invalid OTP, New OTP send to your email"
                })
            }
            res.status(404).json({
                staus:"Failed",
                message:"Invalid OTP"
            })
        }

       

        //OTP Expire
        const currentTime = new Date();
        const expiredTime = new Date(emailVerification.createdAt.getTime() + 5 * 60 * 1000)
        if(currentTime > expiredTime){
            sendEmailVarificationOTP(res,existingUser);
            res.status(404).json({
                status:"Failed",
                message:"OTP expired, new OTP is send to your email"
            })
        }

        //update is_Verified to true after varification
        existingUser.is_verified = true;
        await existingUser.save();

        await EmailVarificationModel.deleteMany({userId : existingUser._id})
        res.status(500).json({
            staus:"Success",
            message:"Email Verified Successfully!"
        })

    } catch (error) {
        res.status(500).json({
            status:"Failed",
            message:"Unable too verify your account, please try later"
        })
    }
  }
  //Login

  //Get New access token or Refresh token


  //Change Password



}

export default UserController;