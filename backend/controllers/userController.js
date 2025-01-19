import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import EmailVerificationModel from '../models/emailVerificationModel.js';
import sendEmailVerificationOTP from '../utils/sendEmailVerificationOTP.js'
import confirmEmailVerification from '../utils/confirmEmailVerification.js';
import generateTokens from '../utils/generateTokens.js';
import setTokenCookies from '../utils/setTokensCookies.js'
import refreshAccessToken from '../utils/refreshAccessToken.js';

class UserController {

    // Registration
    static userRegistration = async (req, res) => {
        try {
            const { firstName, lastName, email, password, password_confirmation } = req.body;

            //All fields required
            if (!firstName || !lastName || !email || !password || !password_confirmation) {
                return res.status(400).json({
                    status: "Failed",
                    message: "All fields are required"
                })
            }

            //Password and Password confirmation match
            if (password !== password_confirmation) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Confirmation password does not match"
                })
            }

            //Existing User
            const existingUser = await userModel.findOne({ email })
            if (existingUser) {
                return res.status(400).json({
                    status: "Failed",
                    message: "User already exist"
                })
            }

            //Password Hashing
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(password, salt);

            //Create new user and save in database
            const newUser = await userModel({
                firstName, lastName, email, password: hashPassword
            }).save();

            sendEmailVerificationOTP(req, newUser);

            return res.status(201).json({
                status: "Success",
                message: "New user registered successfully",
                user: { id: newUser._id, email: newUser.email }
            });

        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: "Unable to register please try again"
            });
        }
    }
    // Email verification
    static VerifyEmail = async (req, res) => {
        try {

            const { email, otp } = req.body;

            if (!email || !otp) {
                return res.status(401).json({
                    status: "Failed",
                    message: "All fields are required"
                })
            }

            //Check for existing user is already verified email
            const existingUser = await userModel.findOne({ email });

            //If User not exist
            if (!existingUser) {
                return res.status(401).json({
                    status: "Failed",
                    message: "User does not exist"
                })
            }

            //User exist but already verified
            if (existingUser) {
                if (existingUser.is_verified) {
                    return res.status(401).json({
                        status: "Failed",
                        message: "Already Verified Email!"
                    })
                }
            }

            //If OTP is not send for existing User then resend it
            const emailverification = await EmailVerificationModel.findOne({ userId: existingUser._id, otp })
            if (!emailverification) {
                if (!existingUser.is_verified) {
                    sendEmailVerificationOTP(req, existingUser);
                    return res.status(401).json({
                        status: "Failed",
                        message: "Invalid OTP, New OTP send to your email"
                    })
                }
                return res.status(401).json({
                    staus: "Failed",
                    message: "Invalid OTP"
                })
            }

            //OTP Expire
            const currentTime = new Date();
            const expiredTime = new Date(emailverification.createdAt.getTime() + 10 * 60 * 1000)
            if (currentTime > expiredTime) {
                sendEmailVerificationOTP(res, existingUser);
                return res.status(401).json({
                    status: "Failed",
                    message: "OTP expired, new OTP is send to your email"
                })
            }

            //update is_Verified to true after verification
            existingUser.is_verified = true;
            await existingUser.save();

            await EmailVerificationModel.deleteMany({ userId: existingUser._id })

            await confirmEmailVerification(existingUser);

            return res.status(201).json({
                staus: "Success",
                message: "Email Verified Successfully!"
            })

        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: "Unable too verify your account, please try later"
            })
        }
    }
    //Login
    static userLogin = async (req, res) => {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "Failed",
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid username or password"
            })
        }

        if (!user.is_verified) {
            return res.status(401).json({
                status: "Failed",
                message: "First verify your account"
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password)
        if (user) {
            if (!matchPassword) {
                return res.status(401).json({
                    status: "Failed",
                    message: "Invalid username or password"
                })
            }
        }

        //Generate tokens
        const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);

        //Set cookies
        setTokenCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);

        //Send success response with tokens
        return res.status(201).json({
            user: { userId: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
            status: "Success",
            message: "Loged in Successfully!!!",
            access_token: accessToken,
            refresh_token: refreshToken,
            access_token_exp: accessTokenExp,
            is_auth: true
        })

    }

    // Get New access token or Refresh token
    static getNewAccessToken = async (req, res) => {
        try {
            // Get new token
            const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp } = await refreshAccessToken(req, res);
            // Set new token to cookies
            setTokenCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp);

            return res.status(200).json({
                status: "Success",
                Message: "New Access Token Generated",
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                access_token_exp: newAccessTokenExp
            })
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: "Unable to generate new token, please try later"
            })
        }
    }

    //Change Password



}

export default UserController;