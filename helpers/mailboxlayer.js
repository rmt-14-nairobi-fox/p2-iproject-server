const axios = require('axios');

async function checkEmail(email) {
    const key = process.env.MAILBOXLAYER
    try {
        return await axios({
            method: 'get',
            url: `http://apilayer.net/api/check?access_key=${key}&email=${email}&smtp=1&format=1`
        })

    } catch (err) {
        console.log(err)
    }
}

module.exports = checkEmail
