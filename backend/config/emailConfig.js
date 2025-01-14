import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();

// Create Transporter to send email
const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_EMAIL_HOST,
  port: process.env.GMAIL_EMAIL_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.GMAIL_EMAIL_USER,
    pass: process.env.GMAIL_EMAIL_PASS,
  },
});

export default transporter



