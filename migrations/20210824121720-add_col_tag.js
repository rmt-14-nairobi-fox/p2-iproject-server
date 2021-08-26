'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Stories', 'tag', {
      allowNull : false,
      type : Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'tag', {})
  }
};
