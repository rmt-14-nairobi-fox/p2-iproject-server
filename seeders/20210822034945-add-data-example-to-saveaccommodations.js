"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        UserId: 3,
        AccommodationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("SaveAccommodations", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("SaveAccommodations", null, {});
  },
};
