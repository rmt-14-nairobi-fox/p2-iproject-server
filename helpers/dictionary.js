const axios = require("axios");

const ninjaAPI = axios.create({
  baseURL: "https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary",
});

const dictionary = (word) => {
  return new Promise((resolve, reject) => {
    ninjaAPI({
      method: "GET",
      params: { word },
      headers: {
        "x-rapidapi-host": "dictionary-by-api-ninjas.p.rapidapi.com",
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      },
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  dictionary,
};
