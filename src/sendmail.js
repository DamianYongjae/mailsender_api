import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import "../.env";

dotenv.config();

export const sendMailNew = (email) => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
  );

  return transport.sendMail(email, (res, err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      res.end();
    }
  });
};

export const sendScheduledMail = (address, subject, content) => {
  let date = Math.round(new Date("June 29, 2020 12:37:00").getTime() / 1000);
  let tempDate = Math.round(new Date().getTime() / 1000);
  const email = {
    from: "CBLM@CBLM.com",
    to: address,
    subject: subject,
    html: `기도 지향 내용: <p>${content}</p>`,
    send_at: tempDate,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return sgMail.send(email);

  // if (error.response) {
  //   console.error(error.response.body);
  // }

  // return sendMailNew(email);
};
