"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        address: "Jalan Bontang IV",
        AuthorId: 1,
        description: "Full furnished",
        price: 2000000,
        status: "active", //rent, active
        zipCode: "16457",
        type: "house", //house, apartement
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: "Jalan Pekapuran",
        AuthorId: 2,
        description: "Full furnished",
        price: 2500000,
        status: "rent", //rent, active
        zipCode: "16453",
        type: "house", //house, apartement
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Accommodations", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Accommodations", null, {});
  },
};
