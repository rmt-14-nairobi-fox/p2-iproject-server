const router = require('express').Router();
const Controller = require('../controllers/weather');

router.get('/', Controller.getWeather);

module.exports = router;
