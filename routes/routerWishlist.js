const router = require('express').Router()
const ControllerWishlist = require('../controllers/ControllerWishlist')
const authentication = require('../middlewares/authentication')
const { authorizationWishlist } = require('../middlewares/authorization')

router.use(authentication)
router.get('/', authorizationWishlist, ControllerWishlist.findWishListsByUserId)
router.post('/:id', authorizationWishlist, ControllerWishlist.addUserWishlist)
router.delete('/:id', authorizationWishlist, ControllerWishlist.deleteWishlist)

module.exports = router