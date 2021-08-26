"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AccommodationFacilities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      AccommodationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Accommodation",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      FacilityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Facilities",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("AccommodationFacilities");
  },
};
