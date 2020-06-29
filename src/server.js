import "../.env";
import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

const PORT = process.env.PORT || 4000;

const UNIX_Timestamp = 1575909015;

export const sendMailNew = (email) => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
  );

  return transport.sendMail(email, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
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
  return sendMailNew(email);
};

const server = express();
server.use(
  cors({
    origin: "*",
  }),
  express.json(),
);

server.post(`/sendmail`, (req, res) => {
  try {
    let data = {
      address: req.body.email,
      subject: "26 차 요한연수 지향",
      content: req.body.intention,
    };
    sendScheduledMail(data.address, data.subject, data.content);
    res.end();
  } catch (error) {
    console.log(error);
  }
});

server.listen(
  { port: PORT },
  () => console.log(`Server running on http://localhost:${PORT}`),
);
