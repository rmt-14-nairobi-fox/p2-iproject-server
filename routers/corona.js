const router = require('express').Router();
const Controller = require('../controllers/corona.js');

router.get('/', Controller.getCoronaGraph);

module.exports = router;
