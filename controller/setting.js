"use strict";

const { admin, setting } = require("../models"),
  bcrypt = require("bcrypt");

const getProfile = (req, res) => {
  admin
    .findByPk(req.id)
    .then((data) => {
      req.response.ok(data, "Berhasil menampilkan profile", res);
    })
    .catch((error) => {
      req.response.error(404, "Admin tidak ditemukan", res);
    });
};

const updateProfile = (req, res) => {
  let { name, email } = req.body;

  admin
    .findByPk(req.id)
    .then((admin) => {
      if (!admin) {
        req.response.error(404, "Admin tidak ditemukan", res);
      } else {
        admin
          .update(
            {
              name: name,
              email: email,
            },
            {
              where: {
                id: req.id,
              },
            }
          )
          .then(() => {
            req.response.ok(admin, "Profile berhasil diedit", res);
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
};

const changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;

  admin
    .findByPk(req.id)
    .then((fetchAdmin) => {
      const match = bcrypt.compareSync(oldPassword, fetchAdmin.password);

      if (match) {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(newPassword, salt);

        admin
          .update(
            {
              password: passwordHash,
            },
            {
              where: {
                id: req.id,
              },
            }
          )
          .then(() => {
            req.response.ok(null, "Password berhasil diganti", res);
          })
          .catch((err) => {
            req.response.errorValidation(400, err, res);
          });
      } else {
        req.response.error(400, "Password lama yang anda masukkan salah", res);
      }
    })
    .catch((error) => {
      console.log(error);
      req.response.error(404, "Admin tidak ditemukan", res);
    });
};

const getSetting = (req, res) => {
  setting
    .findByPk(1)
    .then((data) => {
      req.response.ok(data, "Berhasil menampilkan pengaturan", res);
    })
    .catch((error) => {
      req.response.error(500, "Kesalahan Internal", res);
    });
};

const updateSetting = (req, res) => {
  const { blogName, key } = req.body;
  setting
    .update(
      { blogName, key },
      {
        where: {
          id: 1,
        },
      }
    )
    .then((data) => {
      req.response.ok({ blogName, key }, "Berhasil menyimpan pengaturan", res);
    })
    .catch((error) => {
      req.response.errorValidation(400, error, res);
    });
};

module.exports = {
  updateProfile,
  changePassword,
  getProfile,
  getSetting,
  updateSetting,
};
