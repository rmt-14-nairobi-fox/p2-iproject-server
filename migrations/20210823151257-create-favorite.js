'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references:{
          model:"Users",
          key:"id"
        },
        onUpdate:"cascade",
        onDelete:"cascade"
      },
      image_url: {
        type: Sequelize.STRING
      },
      nameDrug: {
        type: Sequelize.STRING
      },
      sellingUnitDrug: {
        type: Sequelize.STRING
      },
      minPriceDrug: {
        type: Sequelize.INTEGER
      },
      BasePriceDrug: {
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
    await queryInterface.dropTable('Favorites');
  }
};