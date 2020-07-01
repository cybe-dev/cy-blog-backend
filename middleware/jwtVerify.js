"use strict";

const jwt = require("jsonwebtoken");
const { setting } = require("../models");

const jwtVerify = (req, res, next) => {
  var bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    setting
      .findOne()
      .then((fetchSetting) => {
        jwt.verify(bearerToken, fetchSetting.key, function (err, decoded) {
          if (err) {
            res.sendStatus(403);
          } else {
            req.id = decoded.id;
            next();
          }
        });
      })
      .catch((e) => {
        res.sendStatus(403);
      });
  } else {
    res.sendStatus(403);
  }
};

module.exports = jwtVerify;
