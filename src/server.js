import cors from "cors";
import express from "express";
import { sendScheduledMail } from "./sendmail";

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
server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "*",
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

server.options("*", cors());

server.post(`/sendmail`, cors(), async (req, res) => {
  let data = {
    address: req.body.email,
    subject: req.body.subject,
    content: req.body.intention,
  };
  try {
    await sendScheduledMail(data.address, data.subject, data.content); // res.send(JSON.stringify(res));
    return res.end();
  } catch (error) {
    console.log(error);
  }
});

server.listen(4000, function () {
  console.log("app is listening");
});

export default server;
