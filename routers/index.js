const router = require("express").Router()
const userRoute = require("./userRoute")
const fishRoute = require("./fishRoute")
const wishlistRoute = require("./wishlistRoute")
const errorHandlers = require("../middlewares/errorHandlers")

router.use("/users", userRoute)
router.use("/fishes", fishRoute)
router.use("/wishlists", wishlistRoute)
router.use(errorHandlers)

module.exports = router
