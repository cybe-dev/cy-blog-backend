"use strict";

const models = require("../models").category;
const { admin, post } = require("../models");

module.exports = {
  async index(req, res) {
    const categories = await models.findAll({});

    if (categories.length) {
      req.response.ok(categories, "Daftar kategori berhasil ditampilkan", res);
    } else {
      req.response.error(404, "Belum ada kategori", res);
    }
  },
  get(req, res) {
    models
      .findOne({
        where: {
          slug: req.params.slug,
        },
        include: [
          {
            model: post,
            as: "posts",
            include: [
              {
                model: admin,
                as: "author",
                attributes: ["name"],
              },
            ],
          },
        ],
      })
      .then((data) => {
        if (!data) {
          req.response.error(404, "Kategori tidak ditemukan", res);
        } else {
          req.response.ok(
            data,
            "Berhasil menampilkan kategori " + data.name,
            res
          );
        }
      })
      .catch((error) => {
        console.log(error);
        req.response.error(500, "Kesalahan internal", res);
      });
  },
  insert(req, res) {
    let { name } = req.body;

    models
      .create({
        name,
      })
      .then((data) => {
        req.response.ok(data, "Kategori berhasil ditambahkan", res);
      })
      .catch((error) => {
        req.response.errorValidation(400, error, res);
      });
  },
  update(req, res) {
    let { name } = req.body;

    models
      .findByPk(req.params.id)
      .then((category) => {
        if (!category) {
          req.response.error(404, "Kategori tidak ditemukan", res);
        } else {
          models
            .update(
              {
                name: name,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
            .then(() => {
              req.response.ok(category, "Kategori berhasil diedit", res);
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
      .then((category) => {
        if (!category) {
          req.response.error(404, "Kategori tidak ditemukan", res);
        } else {
          models
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then(() => {
              req.response.ok(category, "Kategori berhasil dihapus", res);
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
