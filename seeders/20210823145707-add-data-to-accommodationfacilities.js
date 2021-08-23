"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        AccommodationId: 1,
        FacilityId: 1,
        amount: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        AccommodationId: 1,
        FacilityId: 2,
        amount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("AccommodationFacilities", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("AccommodationFacilities", null, {});
  },
};
