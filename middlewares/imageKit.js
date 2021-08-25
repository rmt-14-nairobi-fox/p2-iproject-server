const axios = require("axios");
const FormData = require("form-data");

// buat function utk imagekit
async function imageKit(req, res, next) {
    try {
        // console.log(req.file);
        if (!req.file) {
            throw ({ name: "image is required" })
        } else {
            const form = new FormData()
            // console.log(req.file, 'ini reqfile <<<<<<');
            // console.log(form, 'ini form');
            const fileEncode = req.file.buffer.toString("base64")
            form.append('file', fileEncode)
            form.append('fileName', req.file.originalname)
            const privateKey = new Buffer.from(process.env.IMAGEKITPRIVATKEY + ":").toString("base64");
            const uploader = await axios.post(
                "https://upload.imagekit.io/api/v1/files/upload",
                form,
                {
                    headers: {
                        ...form.getHeaders(),
                        Authorization: `Basic ${privateKey}`,
                    },
                }
            );
            // console.log(uploader.data);
            let image;
            let formatFileImg = uploader.data.name.substring(uploader.data.name.lastIndexOf('.') + 1).toLowerCase()
            if (formatFileImg === 'jpeg') {
                throw ({ name: "format file image cant be JPEG" })
            } else {
                if (req.file.size >= 500000) {
                    throw ({ name: "file size excedeed the maximum size" })
                } else {
                    image = uploader.data.url;
                }
            }
            req.body.imageUrl = image
            next()
        }
    } catch (err) {
        // console.log(err);
        next(err)
    }
}
module.exports = imageKit;

