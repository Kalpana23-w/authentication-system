import transporter from "../config/emailConfig.js";

const confirmEmailVerification = async (user)=>{

    transporter.sendMail({
        from: process.env.GMAIL_EMAIL_FROM,
        to: user.email,
        subject: "Account Verified Successfully!!!", 
        html: `<p>Hello ${user.firstName},</p>
            <p>We are happy to inform you that your account has been successfully verified. You can now access all the features of our platform.</p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <p>Thank you for using our service!</p>`
    })
}

export default confirmEmailVerification;



