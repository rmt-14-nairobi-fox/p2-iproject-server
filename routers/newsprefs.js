const router = require('express').Router();
const Controller = require('../controllers/newsprefs');

router.get('/', Controller.getNewsPrefs);

module.exports = router;
