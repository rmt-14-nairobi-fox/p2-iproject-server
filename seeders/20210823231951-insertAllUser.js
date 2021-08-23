"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userData = require("../db/user.json");
    userData.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Users", userData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
