"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Services",
      [
        {
          name: "Potong Rambut",
          createdAt: new Date(),
          updatedAt: new Date(),
          description:
            "Bisa memotong rambut segala usia, dari balita hingga tua!",
          imgUrl: "https://statik.tempo.co/?id=823516&width=650",
        },
        {
          name: "Ojek",
          createdAt: new Date(),
          updatedAt: new Date(),
          description:
            "Bisa mengantarkanmu dari sini sampai sana sesuai kemauanmu!",
          imgUrl: "https://photo.kontan.co.id/photo/2015/09/14/144063599p.jpg",
        },
        {
          name: "Potong Rumput",
          createdAt: new Date(),
          updatedAt: new Date(),
          description: "Bisa memotong rumput dirumahmu sampai ke akar-akarnya!",
          imgUrl:
            "https://www.acehardware.co.id/files/Mesin%20Potong%20Rumput%20Bensin%20Tipe%20Gendong.jpg",
        },
        {
          name: "Tukang Listrik",
          createdAt: new Date(),
          updatedAt: new Date(),
          description:
            "Bisa membenahi kelistrikan rumah tanggamu! tidak termasuk kehidupan rumah tangga ya!",
          imgUrl:
            "https://asset.kompas.com/crops/5ObVREergfA2HWd6kfdQYGW3yD8=/89x100:889x633/750x500/data/photo/2018/04/25/1696189687.jpg",
        },
        {
          name: "Tukang Kebun",
          createdAt: new Date(),
          updatedAt: new Date(),
          description:
            "Bisa membersihan dan merawat kebunmu, tapi tidak dengan dosamu!",
          imgUrl:
            "https://iqbalazhari.com/wp-content/uploads/2016/10/bisnis-usaha-tukang-kebun.jpg",
        },
        {
          name: "Perawatan Binatang",
          createdAt: new Date(),
          updatedAt: new Date(),
          description:
            "Bisa menjaga hewan yang jinak hingga yang galak! apalagi hatimu?",
          imgUrl:
            "https://media.suara.com/pictures/653x366/2020/04/07/84704-aktivitas-hewan-di-kebun-binatang-saat-lockdown.jpg",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Services", null, {});
  },
};
