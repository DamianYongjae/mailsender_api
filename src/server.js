import "../.env";
import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

export const sendMailNew = (email) => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );

  return transport.sendMail(email);
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
server.use(cors());

server.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://stoic-mccarthy-046543.netlify.app"
  ); // update to match the domain you will make the request from
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.post(`/sendmail`, cors(), (req, res) => {
  try {
    let data = {
      address: req.body.email,
      subject: "26 차 요한연수 지향",
      content: req.body.intention,
    };
    sendScheduledMail(data.address, data.subject, data.content);
    return res.end();
  } catch (error) {
    console.log(error);
  }
});

// server.listen(4000, function () {
//   console.log("app is listening");
// });
