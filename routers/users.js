const router = require('express').Router();
const Controller = require('../controllers/users');
const upload = require('../config/multer');
const imagekit = require('../middlewares/imagekit');
const authentication = require('../middlewares/authentication');

router.post(
  '/register',
  upload.single('profile-image'),
  imagekit,
  Controller.register
);

router.post('/login', Controller.login);

router.post('/google', Controller.google);

router.use(authentication);

router.patch(
  '/edit',
  upload.single('profile-image'),
  imagekit,
  Controller.edit
);

module.exports = router;
