"use strict";

const checkEmpty = require("../response").checkEmpty;

module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    "admin",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkEmpty,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email telah digunakan",
        },
        allowNull: false,
        validate: {
          checkEmpty,
          isEmail: {
            args: true,
            msg: "Email tidak valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkEmpty,
        },
      },
    },
    {}
  );
  admin.associate = function (models) {
    // associations can be defined here
    admin.hasMany(models.post, {
      foreignKey: "authorId",
      as: "posts",
    });
  };
  return admin;
};
