'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require('./type.json')

    data.forEach(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Types', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Types', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};