"use strict";

const checkEmpty = require("../response").checkEmpty;

module.exports = (sequelize, DataTypes) => {
  const setting = sequelize.define(
    "setting",
    {
      blogName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkEmpty,
        },
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkEmpty,
        },
      },
    },
    {}
  );
  setting.associate = function (models) {
    // associations can be defined here
  };
  return setting;
};
