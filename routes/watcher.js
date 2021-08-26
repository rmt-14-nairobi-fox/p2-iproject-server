const router = require('express').Router()
const WatcherController = require('../controllers/watcher')
const authorize = require('../middlewares/authorize')

router.post('/:coinId',WatcherController.post)
router.get('/',WatcherController.getAll)
router.patch('/:id',authorize, WatcherController.patch)
router.delete('/:id', authorize, WatcherController.delete)


module.exports = router