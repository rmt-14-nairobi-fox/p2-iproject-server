const axios = require("axios");

const loremPicsum = axios.create({
  baseURL: "https://picsum.photos/50",
});

const randomImage = () => {
  loremPicsum({
    method: "GET",
  })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

console.log(randomImage());

module.exports = {
  randomImage,
};
