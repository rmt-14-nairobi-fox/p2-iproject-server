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
    return queryInterface.bulkInsert('Categories', [
      {
        name: "Covid-19",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Batuk & flu",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Vitamin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Demam",
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ],{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
