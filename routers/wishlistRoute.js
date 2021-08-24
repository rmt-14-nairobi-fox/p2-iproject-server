const Controller = require("../controllers/controller")

const router = require("express").Router()

router.post("/add/:id", Controller.addFish)
router.get("/", Controller.getWishlist)
router.delete("/:id", Controller.deleteFish)



module.exports = router
