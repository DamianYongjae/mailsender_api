import "../.env";
import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

export const sendMailNew = (email) => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );

  return transport.sendMail(email, (res, err) => {
    if (err) {
      console.log(err);
    } else {
      res.end();
    }
  });
};

export const sendScheduledMail = async (address, subject, content) => {
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
  try {
    await sgMail.send(email);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }

  // return sendMailNew(email);
};

const server = express();
server.use(cors({ origin: true, credentials: true }));
server.use(express.json());
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
  next();
});

server.post(`/sendmail`, async (req, res) => {
  let data = {
    address: req.body.email,
    subject: "26 차 요한연수 지향",
    content: req.body.intention,
  };
  try {
    sendScheduledMail(data.address, data.subject, data.content);

    // res.end();
  } catch (error) {
    console.log(error);
  }
});

server.listen(4000, function () {
  console.log("app is listening");
});
