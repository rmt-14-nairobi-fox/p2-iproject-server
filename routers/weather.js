const router = require('express').Router();
const Controller = require('../controllers/weather');

router.post('/', Controller.getWeather);

module.exports = router;
