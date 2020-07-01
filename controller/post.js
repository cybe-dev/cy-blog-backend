"use strict";

const models = require("../models").post;

const { category, admin, comment } = require("../models");

module.exports = {
  async index(req, res) {
    const posts = await models.findAll({
      include: [
        {
          model: category,
          as: "category",
          attributes: ["name", "slug"],
        },
        {
          model: admin,
          as: "author",
          attributes: ["name"],
        },
      ],
    });

    if (posts.length) {
      req.response.ok(posts, "Daftar postingan berhasil ditampilkan", res);
    } else {
      req.response.error(404, "Belum ada postingan", res);
    }
  },
  async getCount(req, res) {
    const posts = await models.findAndCountAll();

    req.response.ok(posts.count, "Jumlah postingan berhasil ditampilkan", res);
  },
  get(req, res) {
    models
      .findOne({
        where: {
          slug: req.params.slug,
        },
        include: [
          {
            model: category,
            as: "category",
            attributes: ["name", "slug"],
          },
          {
            model: admin,
            as: "author",
            attributes: ["name"],
          },
          {
            model: comment,
            as: "comments",
          },
        ],
      })
      .then((post) => {
        if (!post) {
          req.response.error(404, "Postingan tidak ditemukan", res);
        } else {
          req.response.ok(post, "Berhasil menampilkan postingan", res);
        }
      })
      .catch((error) => {
        console.log(error);
        req.response.error(500, "Kesalahan internal", res);
      });
  },
  insert(req, res) {
    let { title, body, categoryId } = req.body;

    category
      .findByPk(categoryId)
      .then((category) => {
        if (!category && categoryId) {
          req.response.error(400, "Kategori tidak ditemukan", res);
        } else {
          let createValue;
          if (categoryId) {
            createValue = {
              authorId: req.id,
              title,
              body,
              categoryId,
            };
          } else {
            createValue = {
              authorId: req.id,
              title,
              body,
            };
          }
          models
            .create(createValue)
            .then((data) => {
              req.response.ok(data, "Postingan berhasil ditambahkan", res);
            })
            .catch((error) => {
              console.log(error);
              req.response.errorValidation(400, error, res);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        req.response.error(500, "Kesalahan internal", res);
      });
  },
  update(req, res) {
    models
      .findByPk(req.params.id)
      .then((post) => {
        if (!post) {
          req.response.error(404, "Postigan tidak ditemukan", res);
        } else {
          let { title, body, categoryId } = req.body;

          category
            .findByPk(categoryId)
            .then((category) => {
              if (!category && categoryId) {
                req.response.error(400, "Kategori tidak ditemukan", res);
              } else {
                let createValue;
                if (categoryId) {
                  createValue = {
                    title,
                    body,
                    categoryId,
                  };
                } else {
                  createValue = {
                    title,
                    body,
                    categoryId: null,
                  };
                }
                models
                  .update(createValue, {
                    where: {
                      id: req.params.id,
                    },
                  })
                  .then(() => {
                    req.response.ok(post, "Postingan berhasil diedit", res);
                  })
                  .catch((error) => {
                    req.response.errorValidation(400, error, res);
                  });
              }
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
  destroy(req, res) {
    models
      .findByPk(req.params.id)
      .then((post) => {
        if (!post) {
          req.response.error(404, "Postingan tidak ditemukan", res);
        } else {
          models
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then(() => {
              req.response.ok(post, "Postingan berhasil dihapus", res);
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
