import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to:string, html:string) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'kamrulthedev@gmail.com',
        pass: 'tpjh ssuc xpoc etun',
      },
    });

 await transporter.sendMail({
      from: 'kamrulthedevr@gmail.com', // sender address
      to,  // list of receivers
      subject: "Reset Your Password with in 10 minists !", // Subject line
      text: "", // plain text body
      html, // html body
    });
}
