"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Accommodations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      AuthorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      long: {
        type: Sequelize.FLOAT,
      },
      lat: {
        type: Sequelize.FLOAT,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Accommodations");
  },
};
