"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Potong Rambut The Rock",
          ProviderId: 7,
          price: 15000,
          ServiceId: 1,
          detail: "Potong rambut tanpa gunting",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Corbuzier Keeper",
          ProviderId: 8,
          price: 10000,
          ServiceId: 6,
          detail: "Biasa merawat hewan buas seperti kamu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rossi Ojek Virtual",
          ProviderId: 3,
          price: 15000,
          ServiceId: 2,
          detail: "Ojek semakin didepan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marquez Ojol Oke",
          ProviderId: 7,
          price: 20000,
          ServiceId: 2,
          detail: "Bisa mengantarkanmu ke pelaminan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Messi Gardener",
          ProviderId: 5,
          price: 20000,
          ServiceId: 5,
          detail: "Bersihkan kebun tanpa sisa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ronaldo Grass Cutting",
          ProviderId: 6,
          price: 50000,
          ServiceId: 3,
          detail: "Potong rumput tanpa potong gaji",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "The Rock Lightning",
          ProviderId: 7,
          price: 150000,
          ServiceId: 4,
          detail:
            "Selain bisa potong rambut juga bisa potong arus listrik rumahmu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
