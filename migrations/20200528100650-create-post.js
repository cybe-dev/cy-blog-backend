"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      authorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          //Required field
          model: "admins",
          key: "id",
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      categoryId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          //Required field
          model: "categories",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING(65),
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("posts");
  },
};
