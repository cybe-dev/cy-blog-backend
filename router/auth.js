"use strict";

const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  models = require("../models").admin;

const { setting } = require("../models");

router.post("/get-token", async (req, res) => {
  const failed = () => {
    req.response.error(400, "Username atau password anda salah", res);
  };

  try {
    const fetchSetting = await setting.findOne();
    models
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((admin) => {
        const match = bcrypt.compareSync(req.body.password, admin.password);

        if (match) {
          let token = jwt.sign(
            {
              id: admin.id,
            },
            fetchSetting.key
          );

          let responseData = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            token,
          };

          req.response.ok(responseData, "Berhasil mengambil token", res);
        } else {
          failed();
        }
      })
      .catch((e) => {
        failed();
      });
  } catch (error) {
    failed();
  }
});

module.exports = router;
