"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendScheduledMail = void 0;

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("../.env");

_dotenv["default"].config();

var sendScheduledMail = function sendScheduledMail(address, subject, content) {
  var date = Math.round(new Date("June 29, 2020 12:37:00").getTime() / 1000);
  var tempDate = Math.round(new Date().getTime() / 1000);
  var email = {
    from: "CBLM@CBLM.com",
    to: address,
    subject: subject,
    html: "\uAE30\uB3C4 \uC9C0\uD5A5 \uB0B4\uC6A9: <p>".concat(content, "</p>"),
    send_at: tempDate
  };

  _mail["default"].setApiKey(process.env.SENDGRID_API_KEY);

  return _mail["default"].send(email);
};

exports.sendScheduledMail = sendScheduledMail;