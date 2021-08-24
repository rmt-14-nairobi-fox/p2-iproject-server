'use strict';

const {generatePass} = require('./../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [{
      name : "TesUser",
      email : "",
      password : generatePass('123456'),
      date_birth : "01-02-2020",
      profile_picture : "https://ik.imagekit.io/61kwqbplekv7/dummy_profile_picture_i2nNaF_j8.jpg?updatedAt=1629789891619",
      gender : "male",
      createdAt : new Date(),
      updatedAt : new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, { restartIdentity : true })
  }
};
