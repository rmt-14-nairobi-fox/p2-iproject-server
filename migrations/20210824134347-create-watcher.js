'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Watchers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      CoinId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Coins',
          key: 'id'
        }
      },
      minPrice: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      maxPrice: {
        type: Sequelize.FLOAT,
        allowNull:false
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
    await queryInterface.dropTable('Watchers');
  }
};