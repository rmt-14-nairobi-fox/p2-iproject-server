const axios = require('axios');

let url = process.env.URL_IMGBB

const instance = axios.create({
    baseURL: url
})

module.exports = instance