'use strict';

const SequelizeSlugify = require('sequelize-slugify');
const checkEmpty = require('../response').checkEmpty;

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkEmpty
      }
    },
    slug: DataTypes.STRING
  }, {});

  category.associate = function(models) {
    // associations can be defined here
    category.hasMany(models.post,{
      foreignKey : "categoryId",
      as: "posts"
    })
  };

  SequelizeSlugify.slugifyModel(category, {
    source: ['name'],
    slugOptions: { lower: true },
    overwrite: false,
    column: 'slug',
    incrementalReplacement: '-'
  });

  return category;
};