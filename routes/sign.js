const router = require('express').Router();
const Controller = require('../controllers/sign');
const { noRepeatSign } = require('../middlewares/auth');

router.post('/:id', noRepeatSign, Controller.addSign)

module.exports = router