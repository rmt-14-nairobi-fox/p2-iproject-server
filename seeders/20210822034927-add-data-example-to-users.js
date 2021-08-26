"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        fullname: "Asra Avisena",
        email: "asra.avisena@test.com",
        password: hashPassword("test1234"),
        phonenumber: "081312345678",
        address: "Cimanggis",
        city: "Depok",
        role: "owner",
        zipCode: "16437",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "admin@test.com",
        email: "admin@test.com",
        password: hashPassword("test1234"),
        phonenumber: "081300004444",
        address: "Tapos",
        city: "Depok",
        role: "owner",
        zipCode: "16457",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Avisena Asra",
        email: "avisena.asra@test.com",
        password: hashPassword("test1234"),
        phonenumber: "081387654321",
        address: "Cimanggis",
        city: "Depok",
        role: "customer",
        zipCode: "16436",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Users", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
