'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'gender', {
      type : Sequelize.STRING,
      allowNull : false
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'gender', {})
  }
};
