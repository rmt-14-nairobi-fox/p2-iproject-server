const router = require('express').Router();
const Controller = require('../controllers/posts');
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.get('/', Controller.getPosts);

router.post('/', Controller.createPost);

module.exports = router;
