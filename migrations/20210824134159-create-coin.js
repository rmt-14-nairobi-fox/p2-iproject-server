'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Coins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      symbol: {
        type: Sequelize.STRING,
        allowNull:false
      },
      price: {
        type: Sequelize.FLOAT
      },
      recommendation: {
        type: Sequelize.STRING
      },
      analysis: {
        type: Sequelize.STRING
      },
      priceHistory: {
        type: Sequelize.ARRAY(Sequelize.FLOAT)
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
    await queryInterface.dropTable('Coins');
  }
};