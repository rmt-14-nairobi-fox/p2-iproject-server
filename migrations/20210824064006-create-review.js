"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image_url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      episodes: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rated: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userpoin: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      review: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      recomendation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
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
    await queryInterface.dropTable("Reviews");
  },
};
