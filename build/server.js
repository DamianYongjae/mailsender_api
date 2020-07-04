"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.router = void 0;

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _sendmail = require("./sendmail");

var _corsHandler = _interopRequireDefault(require("./cors-handler"));

var server = (0, _express["default"])();
server.use((0, _cors["default"])({
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin", "Accept"],
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

}));
server.use(_express["default"].json({
  type: ["application/json"]
})); // for parsing application/json

server.use(_express["default"].urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

var router = _express["default"].Router();

exports.router = router;
router.post("/sendmail", (0, _cors["default"])(), _sendmail.sendmail);
router.options("*", (0, _cors["default"])({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200
}), _corsHandler["default"]);
server.use(router);
server.listen(4000, function () {
  console.log("app is listening");
});
var _default = server;
exports["default"] = _default;