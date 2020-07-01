"use strict";

const models = require("../models").admin;

module.exports = {
  async index(req, res) {
    const admins = await models.findAll({});

    if (admins.length) {
      req.response.ok(admins, "Data admin berhasil ditampilkan", res);
    } else {
      req.response.error("404", "Data masih kosong", res);
    }
  },
  get(req, res) {
    models
      .findByPk(req.params.id)
      .then((data) => {
        if (!data) {
          req.response.error(404, "Admin tidak ditemukan", res);
        } else {
          req.response.ok(data, "Berhasil menampilkan admin " + data.name, res);
        }
      })
      .catch((error) => {
        console.log(error);
        req.response.error(500, "Kesalahan internal", res);
      });
  },
  insert(req, res) {
    let { name, email, password } = req.body;

    const bcrypt = require("bcrypt");

    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    models
      .create({
        name,
        email,
        password,
      })
      .then((data) => {
        req.response.ok(data, "Data admin berhasil ditambahkan", res);
      })
      .catch((error) => {
        req.response.errorValidation(400, error, res);
      });
  },
  update(req, res) {
    let { name, email } = req.body;

    models
      .findByPk(req.params.id)
      .then((admin) => {
        if (!admin) {
          req.response.error(404, "Admin tidak ditemukan", res);
        } else {
          models
            .update(
              {
                name: name,
                email: email,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
            .then(() => {
              req.response.ok(admin, "Admin berhasil diedit", res);
            })
            .catch((err) => {
              req.response.errorValidation(400, err, res);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        req.response.error("500", "Internal error", res);
      });
  },
  destroy(req, res) {
    models
      .findByPk(req.params.id)
      .then((admin) => {
        if (!admin) {
          req.response.error(404, "Admin tidak ditemukan", res);
        } else {
          models
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then(() => {
              req.response.ok(admin, "Admin berhasil dihapus", res);
            })
            .catch((error) => {
              console.log(error);
              req.response.error(500, "Kesalahan internal", res);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        req.response.error(500, "Kesalahan internal", res);
      });
  },
};
