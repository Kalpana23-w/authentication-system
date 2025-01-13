import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
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

  //Login

  //Get New access token or Refresh token


  //Change Password



}

export default UserController;