const axios = require('axios').default;

const gnews = axios.create({
  baseURL: 'https://gnews.io/api/v4',
});

module.exports = gnews;
