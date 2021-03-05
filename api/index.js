import cors from "cors";
import express from "express";
import { sendmail } from "./sendmail";

const server = express();
server.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
server.use(express.json({ type: ["application/json"] })); // for parsing application/json
server.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const router = express.Router();
router.post("/sendmail", sendmail);

server.use(router);

export { router };
export default server;
