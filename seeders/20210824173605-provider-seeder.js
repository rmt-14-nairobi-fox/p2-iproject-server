"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Valentno Rossi",
          username: "valentino46",
          email: "valentino@mail.com",
          password: "valentino46",
          phoneNumber: "283764823764",
          address: "Lampung",
          imgUser:
            "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2021/08/16/rossi-pcjpg-20210816100533.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Marc Marquez",
          username: "marquez93",
          email: "marcmarquez@mail.com",
          password: "marquez93",
          phoneNumber: "283764823764",
          address: "Lampung",
          imgUser:
            "https://cdn0-production-images-kly.akamaized.net/kccAanIxJY-M_7j4Gkm1prumDvo=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2863111/original/027969600_1564028804-5.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Lionel Messi",
          username: "lionel30",
          email: "lionel@mail.com",
          password: "lionel30",
          phoneNumber: "283764823764",
          address: "Lampung",
          imgUser:
            "https://cdn-2.tstatic.net/tribunnews/foto/bank/images/foto-lionel-messi-dengan-jersey-psg.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Cristiano Ronaldo",
          username: "ronaldo69",
          email: "ronaldo@mail.com",
          password: "ronaldo69",
          phoneNumber: "283764823764",
          address: "Lampung",
          imgUser:
            "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=425,format=auto/sites/default/files/styles/768x768/public/d8/images/methode/2020/06/24/cf9d675c-b1fe-11ea-953d-a7ecc5cbd229_image_hires_144326.jpg?itok=cjfUeF1R&v=1592981014",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Dwayne Johnson",
          email: "dwayne@mail.com",
          username: "therock69",
          password: "therock69",
          phoneNumber: "085676456435",
          address: "Lampung",
          imgUser:
            "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/bolasport/medium_4f7a0d3d1e93f6b0683c98ce36334e17.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Deddy Corbuzier",
          email: "corbuzier@mail.com",
          phoneNumber: "082136483474",
          username: "corbuzier13",
          password: "corbuzier13",
          address: "Lampung",
          imgUser:
            "https://d5f1t0vbfwydq.cloudfront.net/fit-in/1500x750/images/2021/08/da7d7c91-f30d-43ff-bb88-838d37c4cd3f.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Tony Stark",
          email: "starkton89@mail.com",
          phoneNumber: "082136483474",
          username: "tonystark89",
          password: "tonystark89",
          address: "Lampung",
          imgUser:
            "https://static.republika.co.id/uploads/images/detailnews/adegan-kematian-iron-man-dalam-film-avengers-endgame_210602125138-901.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Henry Cavill",
          email: "henrycavill@mail.com",
          phoneNumber: "082136483474",
          username: "henrycavill90",
          password: "henrycavill90",
          address: "Lampung",
          imgUser:
            "https://cdn.antaranews.com/cache/800x533/2020/05/29/WhatsApp-Image-2020-05-29-at-04.52.14-1.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     Add commands to revert seed here.
     *
     * Example:
     */
  },
};
