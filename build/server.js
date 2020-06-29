"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendScheduledMail = exports.sendMailNew = void 0;

require("../.env");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailerSendgrid = _interopRequireDefault(require("nodemailer-sendgrid"));

var PORT = process.env.PORT || 4000;
var UNIX_Timestamp = 1575909015;

var sendMailNew = function sendMailNew(email) {
  var transport = _nodemailer["default"].createTransport((0, _nodemailerSendgrid["default"])({
    apiKey: process.env.SENDGRID_API_KEY
  }));

  return transport.sendMail(email, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

exports.sendMailNew = sendMailNew;

var sendScheduledMail = function sendScheduledMail(address, subject, content) {
  var date = Math.round(new Date("June 29, 2020 12:37:00").getTime() / 1000);
  var email = {
    from: "CBLM@CBLM.com",
    to: address,
    subject: subject,
    html: "\uAE30\uB3C4 \uC9C0\uD5A5 \uB0B4\uC6A9: <p>".concat(content, "</p>"),
    send_at: date
  };
  return sendMailNew(email);
};

exports.sendScheduledMail = sendScheduledMail;
var server = (0, _express["default"])();
server.use((0, _cors["default"])({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

}), _express["default"].json());
server.post("/sendmail", function (req, res) {
  try {
    var data = {
      address: req.body.email,
      subject: "26 차 요한연수 지향",
      content: req.body.intention
    };
    sendScheduledMail(data.address, data.subject, data.content);
    res.end();
  } catch (error) {
    res.status(500).send();
  }
});
server.listen({
  port: PORT
}, function () {
  return console.log("Server running on http://localhost:".concat(PORT));
});