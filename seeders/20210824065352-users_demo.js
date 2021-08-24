'use strict';

const {generatePass} = require('./../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', 
      [
        {
          name : "John Doe",
          email : "john@mail.com",
          password : generatePass('123456'),
          gender : "male",
          date_birth : "2000-10-01",
          profile_picture : "https://ik.imagekit.io/61kwqbplekv7/dummy_profile_picture_i2nNaF_j8.jpg?updatedAt=1629789891619",
          createdAt : new Date(),
          updatedAt : new Date()
        },{
          name : "Mary Jane",
          email : "jane@mail.com",
          password : generatePass('123456'),
          gender : "female",
          date_birth : "1999-07-12",
          profile_picture : "https://ik.imagekit.io/61kwqbplekv7/dummy_profile_picture_i2nNaF_j8.jpg?updatedAt=1629789891619",
          createdAt : new Date(),
          updatedAt : new Date()
        },{
          name : "Jim Carry",
          email : "jim@mail.com",
          password : generatePass('123456'),
          gender : "female",
          date_birth : "2001-06-07",
          profile_picture : "https://ik.imagekit.io/61kwqbplekv7/dummy_profile_picture_i2nNaF_j8.jpg?updatedAt=1629789891619",
          createdAt : new Date(),
          updatedAt : new Date()
        }
      ])
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {restartIdentity:true})
  }
};
