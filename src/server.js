import cors from "cors";
import express from "express";
import { sendmail } from "./sendmail";
import handler from "./cors-handler";

const server = express();
server.use(
  cors({
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin", "Accept"],
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
server.use(express.json({ type: ["application/json"] })); // for parsing application/json
server.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const router = express.Router();
router.post("/sendmail", cors(), sendmail);
router.options(
  "*",
  cors({ origin: "*", credentials: true, optionsSuccessStatus: 200 })
);

server.use(router);

server.listen(4000, function () {
  console.log("app is listening");
});
export { router };
export default server;
