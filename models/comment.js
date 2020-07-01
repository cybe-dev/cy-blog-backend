"use strict";

const checkEmpty = require("../response").checkEmpty;

module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          checkEmpty,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkEmpty,
          isEmail: true,
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          checkEmpty,
        },
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkEmpty,
          isNumeric: true,
        },
      },
    },
    {}
  );
  comment.associate = function (models) {
    // associations can be defined here

    comment.belongsTo(models.post, {
      foreignKey: "postId",
      as: "post",
    });
  };
  return comment;
};
