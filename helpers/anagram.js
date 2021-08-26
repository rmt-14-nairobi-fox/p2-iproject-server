const axios = require("axios");

const countdown = axios.create({
  baseURL: "https://danielthepope-countdown-v1.p.rapidapi.com/solve",
});

const anagram = (word) => {
  return new Promise((resolve, reject) => {
    countdown({
      method: "GET",
      url: `/${word}`,
      params: { variance: "-1" },
      headers: {
        "x-rapidapi-host": "danielthepope-countdown-v1.p.rapidapi.com",
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
  anagram,
};
