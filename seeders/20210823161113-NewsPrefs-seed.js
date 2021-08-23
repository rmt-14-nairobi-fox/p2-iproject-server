'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const newsprefs = require('./newsprefs.json').map((newspref) => {
      newspref.createdAt = new Date();
      newspref.updatedAt = new Date();

      return newspref;
    });
    await queryInterface.bulkInsert('NewsPrefs', newsprefs, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('NewsPrefs', null, {});
  },
};
