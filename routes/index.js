const userRoute = require("./userRoute");
const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandler");

router.use("/users", userRoute);
router.use(errorHandler);

module.exports = router;
