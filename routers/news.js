const router = require('express').Router();
const Controller = require('../controllers/news');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);

router.get('/', Controller.getNews);

router.post('/', Controller.saveNews);

router.post('/search', Controller.searchNews);

router.get('/saved', Controller.getSavedNews);

router.delete('/saved/:savedId', authorization, Controller.deleteSavedNews);

module.exports = router;
