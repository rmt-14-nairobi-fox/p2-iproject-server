"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Chats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roomName: {
        type: Sequelize.STRING,
      },
      messages: {
        type: Sequelize.STRING,
      },
      ReceiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Animals",
          id: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      SenderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          id: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("Chats");
  },
};
