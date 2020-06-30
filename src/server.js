import "../.env";
import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);
server.use(express.json({ type: ["application/json", "text/plain"] })); // for parsing application/json
server.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
server.use("/");
// server.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "*",
//   ); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization",
//   );
//   res.header("Access-Control-Allow-Credentials", true);
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

server.options("*", cors());

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
  sgMail.send(email);

  // if (error.response) {
  //   console.error(error.response.body);
  // }

  // return sendMailNew(email);
};

server.post(`/sendmail`, async (req, res) => {
  let data = {
    address: req.body.email,
    subject: "26 차 요한연수 지향",
    content: req.body.intention,
  };
  try {
    await sendScheduledMail(data.address, data.subject, data.content)
      .catch((e) => console.log(`Error: ${e}`)); // res.send(JSON.stringify(res));
    return res.end();
  } catch (error) {
    console.log(error);
  }
});

server.listen(4000, function () {
  console.log("app is listening");
});

export default server;
