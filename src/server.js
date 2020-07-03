import cors from "cors";
import express from "express";
import { sendmail } from "./sendmail";
const router = express.Router();

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

// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // another option
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }

// server.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Credentials", "true");
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

// server.enable("trust proxy");

// server.options(
//   "*",
//   cors({
//     origin: "*",
//     allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin", "Accept"],
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

// router.options(
//   "*",
//   cors({
//     origin: "*",
//     allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin", "Accept"],
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

router.post(
  "/sendmail",
  // cors({
  //   methods: ["GET", "POST", "OPTIONS"],
  //   allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin", "Accept"],
  //   origin: "*",
  //   credentials: true,
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }),
  sendmail
);

// server.post(
//   "/sendmail",
//   cors({
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin", "Accept"],
//     origin: "*",
//     credentials: true,
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }),
//   sendmail
// );

server.use(router);

server.listen(4000, function () {
  console.log("app is listening");
});
// server.use("/", router);
export { router };
export default server;
