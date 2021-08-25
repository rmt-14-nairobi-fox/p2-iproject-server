const Controller = require("../controllers/controller")
const authenticate = require("../middlewares/authentication")
const router = require("express").Router()

router.use(authenticate)
router.post("/add/:fishName", Controller.addFish)
router.get("/", Controller.getWishlist)
router.delete("/:fishName", Controller.deleteFish)



module.exports = router
