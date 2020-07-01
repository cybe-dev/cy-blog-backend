"use strict";

const SequelizeSlugify = require("sequelize-slugify"),
  checkEmpty = require("../response").checkEmpty;

module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "post",
    {
      authorId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          checkEmpty,
        },
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          checkEmpty,
        },
      },
      categoryId: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      slug: DataTypes.STRING,
    },
    {}
  );
  post.associate = function (models) {
    // associations can be defined here
    post.belongsTo(models.category, {
      foreignKey: "categoryId",
      as: "category",
    });

    post.belongsTo(models.admin, {
      foreignKey: "authorId",
      as: "author",
    });

    post.hasMany(models.comment, {
      foreignKey: "postId",
      as: "comments",
    });
  };

  SequelizeSlugify.slugifyModel(post, {
    source: ["title"],
    slugOptions: { lower: true },
    overwrite: false,
    column: "slug",
    incrementalReplacement: "-",
  });

  return post;
};
