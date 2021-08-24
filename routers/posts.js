const router = require('express').Router();
const Controller = require('../controllers/posts');
const authentication = require('../middlewares/authentication');

router.get('/', Controller.getPosts);

router.use(authentication);

router.post('/', Controller.createPost);

module.exports = router;
