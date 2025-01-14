import transporter from "../config/emailConfig.js";
import EmailVerificationModel from "../models/emailVerificationModel.js";
const sendEmailVerificationOTP = async (req, user) =>{

    //4 digit OTP generation
    const otp = Math.floor(1000 + Math.random() * 9000);

    await new EmailVerificationModel({userId : user._id, otp : otp}).save();

    // OTP verification link
    const otpVarificationLink = `${process.env.FRONTEND_HOST}/account/verify-email`;

    //Send mail to user
    await transporter.sendMail({
        from: process.env.GMAIL_EMAIL_FROM,
        to: user.email,
        subject: "Verify Your Account Using OTP!!!", 
        html: `<p>Dear ${user.firstName},</p>
        <p>Your OTP code is: <h2><b>${otp}</b></h2></p>
        <p>Please use this code to complete your verification process. If you did not request this, please ignore this email.</p>
        <p>To complete your verification, click the link below:</p>
        <p><a href="${otpVarificationLink}"></a>Complete Verification</a></p>
        <p>Thank you for using our service!</p>` // HTML body with verification link
    });

    return otp;
}

export default sendEmailVerificationOTP;