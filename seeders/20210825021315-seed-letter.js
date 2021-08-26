"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = [
      {
        letter: "A",
        score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "B",
        score: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "C",
        score: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "D",
        score: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "E",
        score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "F",
        score: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "G",
        score: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "H",
        score: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "I",
        score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "J",
        score: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "K",
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "L",
        score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "M",
        score: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "N",
        score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "O",
        score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "P",
        score: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "Q",
        score: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "R",
        score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "S",
        score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "T",
        score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "U",
        score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "V",
        score: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "W",
        score: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "X",
        score: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "Y",
        score: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        letter: "Z",
        score: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert("Letters", data, {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return querqueryInterface.bulkDelete("Letters", null, {});
  },
};
