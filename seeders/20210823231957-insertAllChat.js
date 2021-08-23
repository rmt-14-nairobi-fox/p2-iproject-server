"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const chatData = require("../db/Chats.json");
    chatData.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Chats", chatData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Chats", null, {});
  },
};
