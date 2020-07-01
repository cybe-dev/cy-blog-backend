"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("admins", [
      {
        name: "Admin",
        email: "admin@example.com",
        password:
          "$2b$10$A6BXu.xQx4puxu80HM3Xbu1c6edFL4HuP.e6A7VYQ.B0W3lor6kJi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("admins", null, {});
  },
};
