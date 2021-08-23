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
     return queryInterface.bulkInsert('Drugs', [
      {
        name: "Paket Isolasi Mandiri",
        rangePrice:"Rp 400.000 - Rp 450.000",
        description:"Paket suplemen isolasi mandiri",
        composition:"Per tablet:vitamin E 30 Iu, vitamin C 750mg",
        doses:"2x1 tablet per hari",
        rule:"diminum setelah makan",
        categoryId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "tremenza",
        rangePrice:"Rp 18.000 - Rp 25.000",
        description:"tremenza merupakan obat yang dapat meringankan gejala flu",
        composition:"Pseudoephedrine HCl 60 mg, Triprolidine HCl 2.5 mg",
        doses:"dewasa 3x1 tablet per hari",
        rule:"diminum setelah makan",
        categoryId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ],{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Drugs', null, {});
  }
};
