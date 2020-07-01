"use strict";

const { getCount } = require("./post");

const models = require("../models").comment,
  post = require("../models").post;

module.exports = {
  async index(req, res) {
    const comments = await models.findAll({
      include: {
        model: post,
        as: "post",
        attributes: ["title", "slug"],
      },
    });

    if (comments.length) {
      req.response.ok(comments, "Daftar komentar berhasil ditampilkan", res);
    } else {
      req.response.error(404, "Belum ada komentar", res);
    }
  },
  async getCount(req, res) {
    const comments = await models.findAndCountAll();
    req.response.ok(
      comments.count,
      "Jumlah komentar berhasil ditampilkan",
      res
    );
  },

  async get(req, res) {
    models
      .findByPk(req.params.id, {
        include: {
          model: post,
          as: "post",
          attributes: ["title", "slug"],
        },
      })
      .then((comment) => {
        if (comment) {
          req.response.ok(comment, "Komentar berhasil ditampilkan", res);
        } else {
          req.response.error(404, "Komentar tidak ditemukan", res);
        }
      })
      .catch((error) => {
        console.log(error);
        req.response.error(500, "Kesalahan internal", res);
      });
  },

  insert(req, res) {
    let { name, email, body, postId } = req.body;

    post
      .findByPk(postId)
      .then((post) => {
        if (!post) {
          req.response.error(404, "Postingan tidak ditemukan", res);
        } else {
          models
            .create({
              name,
              email,
              body,
              postId,
            })
            .then((data) => {
              req.response.ok(data, "Komentar berhasil ditambahkan", res);
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
  },

  destroy(req, res) {
    models
      .findByPk(req.params.id)
      .then((comment) => {
        if (!comment) {
          req.response.error(404, "Komentar tidak ditemukan", res);
        } else {
          models
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then(() => {
              req.response.ok(comment, "Komentar berhasil dihapus", res);
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
