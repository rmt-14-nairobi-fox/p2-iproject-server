const router = require('express').Router();
const Controller = require('../controllers/petition');
const upload = require('multer')();
const { uploadImage } = require('../middlewares/uploadImage');
const { badWord } = require('../middlewares/badWord');

router.post('/',
    upload.single('petition-img'),
    badWord,
    uploadImage,
    Controller.addPetition)

module.exports = router