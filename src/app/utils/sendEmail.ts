import nodemailer from "nodemailer";
import config from "../config";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: "kamrulthedevr@gmail.com", // list of receivers
      subject: "Password Change ✔", // Subject line
      text: "Ki Kobor Password Vole gaso ..?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: %s", error);
  }
}
