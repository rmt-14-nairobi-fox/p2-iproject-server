'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull : false,
        type: Sequelize.STRING
      },
      sinopsis: {
        allowNull : false,
        type: Sequelize.TEXT
      },
      story_text: {
        allowNull : false,
        type: Sequelize.TEXT
      },
      cover_image_url: {
        type: Sequelize.STRING
      },
      AuthorId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stories');
  }
};