const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage()
})

const multerUpload = upload.single('imgUrl');

module.exports = multerUpload;