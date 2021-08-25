const axios = require('axios');

let url = process.env.URL_BAD_WORD_NEUTRINO
let userId = process.env.USER_ID_NEUTRINO
let apiKey = process.env.KEY_BAD_WORD_NEUTRINO

const instance = axios.create({
    baseURL: url,
    headers: {
        'user-id': userId,
        'api-key': apiKey
    }
})

module.exports = instance