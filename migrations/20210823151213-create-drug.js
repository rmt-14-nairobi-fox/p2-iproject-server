'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Drugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      rangePrice: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      composition: {
        type: Sequelize.STRING
      },
      doses: {
        type: Sequelize.STRING
      },
      rule: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Categories',
          key : 'id'
        },
        onUpdate : 'cascade',
        onDelete : 'cascade'
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
    await queryInterface.dropTable('Drugs');
  }
};