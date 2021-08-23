"use strict";
const slug = require("../helpers/slug");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        name: "Bed Room",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Living Room",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    data.forEach((el) => {
      el.slug = slug(el.name);
    });
    await queryInterface.bulkInsert("Facilities", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Facilities", null, {});
  },
};
