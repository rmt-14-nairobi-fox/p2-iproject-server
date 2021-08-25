const Controller = require("../controllers/controller")
const authenticate = require("../middlewares/authentication")
const router = require("express").Router()

router.use(authenticate)
router.get("/", Controller.getFishes)
router.get("/:fishName", Controller.getFishById)

module.exports = router
