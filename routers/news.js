const router = require('express').Router();
const Controller = require('../controllers/news');
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.get('/', Controller.getNews);

router.post('/', Controller.saveNews);

router.get('/saved', Controller.getSavedNews);

module.exports = router;
