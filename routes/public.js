const router = require('express').Router();
const Controller = require('../controllers/public');

router.get('/home', Controller.getAllPet)

module.exports = router