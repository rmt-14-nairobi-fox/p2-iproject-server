'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Stories', 'AuthorId', {
      type : Sequelize.INTEGER,
      references : {
        model : 'Users',
        key : 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Stories', 'AuthorId', {})
  }
};
