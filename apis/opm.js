const axios = require('axios').default;

const opm = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

module.exports = opm;
