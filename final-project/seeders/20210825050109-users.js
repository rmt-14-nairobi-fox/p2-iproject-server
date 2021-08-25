'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const user = require('./users.json')
user.forEach(el => {
  el.password = hashPassword(el.password)
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', user, {})
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
