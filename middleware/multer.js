const multer = require("multer");
const storage = multer.memoryStorage()
//Filter

const upload = multer({
    storage: storage
});

const uploadSingle = upload.single("imageURL");

module.exports = {uploadSingle}