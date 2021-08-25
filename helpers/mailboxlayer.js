const axios = require('axios');

function checkEmail(email) {
    axios({
        method: 'get',
        url: `http://apilayer.net/api/check?access_key=9216b513126f98b9be90b29b7c5fd351&email=${email}&smtp=1&format=1`
    })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}
