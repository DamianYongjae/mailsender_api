import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

export const sendScheduledMail = (address, subject, content) => {
  let date = Math.round(new Date("August 30, 2020 18:00:00").getTime() / 1000);
  let tempDate = Math.round(new Date().getTime() / 1000);
  let now = new Date();
  let time = Math.round(date.setMinutes(now.getMinutes() + 5).getTime() / 1000);
  let sendTime = Math.round(date.setDate(now.getDate() + 2).getTime() / 1000);
  const email = {
    from: "CBLM@CBLM.com",
    to: address,
    subject: subject,
    html: content,
    send_at: time,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return sgMail.send(email);
};
