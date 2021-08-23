"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const animalData = require("../db/animal.json");
    animalData.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Animals", animalData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Animals", null, {});
  },
};
