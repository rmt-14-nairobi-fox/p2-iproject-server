const axios = require("axios");
const FormData = require("form-data");

function image(req, res, next) {
    const fileencoded = req.file.buffer.toString('base64')
    const form = new FormData()
    form.append('file', fileencoded)
    form.append('fileName', req.file.originalname);
    const privateKey = new Buffer.from(process.env.PRIVATE_KEY + ':').toString('base64');
    axios.post("https://upload.imagekit.io/api/v1/files/upload", form, {
        headers : {
                ...form.getHeaders(),
                Authorization: `Basic ${privateKey}`
            }
        })
        .then((result) => {
            req.body.imageKit = result.data.url
            next();
        })
        .catch((err) => {
            next(err)
            // console.log(err)
        })
}


module.exports = { image }