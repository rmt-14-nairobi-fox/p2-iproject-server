"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        title: "Good House",
        address: "Depok",
        AuthorId: 1,
        description: "Full furnished",
        price: 2000000,
        status: "active", //inactive, active
        zipCode: "16457",
        type: "house", //house, apartement
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Good clean House",
        address: "Jalan Pekapuran",
        AuthorId: 2,
        description: "Full furnished",
        price: 2500000,
        status: "inactive", //inactive, active
        zipCode: "16453",
        type: "house", //house, apartement
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Accommodation", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Accommodation", null, {});
  },
};
