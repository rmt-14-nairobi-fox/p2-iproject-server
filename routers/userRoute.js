const Controller = require("../controllers/controller")
const router = require("express").Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)


module.exports = router
