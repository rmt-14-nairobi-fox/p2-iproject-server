const Controller = require("../controllers/controller")
const router = require("express").Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/google", Controller.googleLogin)


module.exports = router
