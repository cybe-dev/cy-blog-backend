"use strict";

const { setting, post, category, admin, comment } = require("../models");

const blogInfo = (req, res) => {
  setting
    .findByPk(1, { attributes: ["blogName"] })
    .then((data) => {
      req.response.ok(data, "Berhasil menampilkan pengaturan", res);
    })
    .catch((error) => {
      req.response.error(500, "Kesalahan Internal", res);
    });
};

const allPost = async (req, res) => {
  let posts;
  if (req.query.q) {
    const { Op } = require("sequelize");
    posts = await post.findAll({
      where: {
        title: {
          [Op.like]: `%${req.query.q}%`,
        },
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
      ],
      order: [["createdAt", "desc"]],
    });
  } else {
    posts = await post.findAll({
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
      order: [["createdAt", "desc"]],
    });
  }

  if (posts.length) {
    let response = [];
    posts.forEach((item) => {
      let responseTemp = item;
      responseTemp.body = responseTemp.body
        .replace(/(<([^>]+)>)/gi, "")
        .substring(0, 356);

      response.push(responseTemp);
    });

    req.response.ok(
      response,
      req.query.q
        ? `Berhasil menampilkan data pencarian "${req.query.q}"`
        : "Berhasil menampilkan daftar postingan",
      res
    );
  } else {
    req.response.error(404, "Belum ada postingan", res);
  }
};

const allCategory = (req, res) => {
  category
    .findAll({ attributes: ["slug", "name"] })
    .then((categories) => {
      if (categories) {
        req.response.ok(
          categories,
          "Daftar kategori berhasil ditampilkan",
          res
        );
      } else {
        req.response.error(404, "Belum ada kategori", res);
      }
    })
    .catch((error) => {
      req.response.error(500, "Kesalahan Internal", res);
    });
};

const categoryBySlug = (req, res) => {
  category
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
      order: [[{ model: post, as: "posts" }, "createdAt", "desc"]],
    })
    .then((data) => {
      if (!data) {
        req.response.error(404, "Kategori tidak ditemukan", res);
      } else {
        let response = data;
        let posts = [];

        data.posts.forEach((item) => {
          let responseTemp = item;
          responseTemp.body = responseTemp.body
            .replace(/(<([^>]+)>)/gi, "")
            .substring(0, 356);

          posts.push(responseTemp);
        });

        response.posts = posts;

        req.response.ok(
          response,
          "Berhasil menampilkan kategori " + data.name,
          res
        );
      }
    })
    .catch((error) => {
      console.log(error);
      req.response.error(500, "Kesalahan internal", res);
    });
};

const getPost = (req, res) => {
  post
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
};

module.exports = { blogInfo, allPost, allCategory, categoryBySlug, getPost };
