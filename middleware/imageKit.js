const axios = require("axios");
const FormData = require("form-data");

const imageKit = async (req, res, next) => {
    try {
        if (!req.file) {
            throw ({
                name: 'InvalidImage',
                errors: [{
                    message: 'image cannot empty'
                }]
            })
        }

        if (req.file.size > 500000 || req.file.mimetype.split('/')[0] !== 'image') {
            const errors = []

            if (req.file.size > 255000) {
                errors.push({
                    message: 'file size cannot more than 500 KB'
                })
            }

            if (req.file.mimetype.split('/')[0] !== 'image') {
                errors.push({
                    message: 'file type must be image'
                })
            }

            throw ({
                name: 'InvalidImage',
                errors
            })
        }

        const privateKey = Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64");

        const form = new FormData();
        form.append("file", req.file.buffer.toString("base64"));
        form.append("fileName", req.file.originalname);

        const response = await axios.post("https://upload.imagekit.io/api/v1/files/upload",
            form, {
                headers: {
                    ...form.getHeaders(),
                    Authorization: "Basic " + privateKey,
                },
            }
        );

        req.imgUrl = response.data.url;
        next();

    } catch (err) {
        next(err)
    }
}

module.exports = imageKit;