const router = require('express').Router();
const Controller = require('../controllers/users');
const upload = require('../config/multer');
const imagekit = require('../middlewares/imagekit');

router.post(
  '/register',
  upload.single('profile-image'),
  imagekit,
  Controller.register
);

router.post('/login', Controller.login);

router.put('/edit', Controller.edit);

module.exports = router;
