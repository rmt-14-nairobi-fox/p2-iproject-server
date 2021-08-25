'use strict';
const flight = require('./flights.json')
flight.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Flights', flight, {})
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Flights', null, {})
  }
};
