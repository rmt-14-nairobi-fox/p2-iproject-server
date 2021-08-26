const router = require('express').Router();
const Controller = require('../controllers/comments');
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.post('/', Controller.fetchComments);

module.exports = router;
