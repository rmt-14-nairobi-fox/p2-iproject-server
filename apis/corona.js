const axios = require('axios').default;

const corona = axios.create({
  baseURL: 'https://corona.dnsforfamily.com',
});

module.exports = corona;
