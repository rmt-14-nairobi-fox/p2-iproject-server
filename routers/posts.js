const router = require('express').Router();
const Controller = require('../controllers/posts');

router.post('/', Controller.createPost);

module.exports = router;
