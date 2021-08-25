const imgBB = require('../apis/imgBB');
const FormData = require('form-data');

const uploadImage = async (req, res, next) => {
    const imgFile = req.file.buffer.toString('base64')
    const apiKey = process.env.KEY_IMGBB

    try {
        const form = new FormData()
        form.append('key', apiKey)
        form.append('image', imgFile)

        const { data: { data } } = await imgBB({
            method: 'POST',
            url: '/upload',
            headers: {
                ...form.getHeaders()
            },
            data: form
        })

        req.body.imageUrl = data.url
        next()
    }
    catch (err) {
        next({
            name: 'ImgBBError',
            message: err.message || 'Something error with image uploader'
        })        
    }
}

module.exports = {
    uploadImage
}