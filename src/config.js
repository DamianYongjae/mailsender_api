import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

export const sendScheduledMail = (address, subject, content) => {
  let date = Math.round(new Date("August 30, 2020 18:00:00").getTime() / 1000);
  let tempDate = Math.round(new Date().getTime() / 1000);
  let now1 = new Date();
  let now2 = new Date();
  // let time = Math.round(now1.setMinutes(now1.getMinutes() + 5) / 1000);
  let sendTime = Math.round(now2.setDate(now2.getDate() + 2) / 1000);
  const email = {
    from: "CBLM@CBLM.com",
    to: address,
    subject: subject,
    html: content,
    // send_at: Math.round(now1.setMinutes(now1.getMinutes() + 5) / 1000),
    send_at: sendTime,
  };
  const email2 = {
    from: "CBLM@CBLM.com",
    to: "cblmne@gmail.com",
    subject: subject,
    html: content,
    // send_at: Math.round(now2.setMinutes(now2.getMinutes() + 5) / 1000),
    send_at: sendTime,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // sgMail.send(email2);
  return sgMail.send(email);
};
