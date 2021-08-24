const userRoute = require("./userRoute");
const custRoute = require("./custRoute");
const orderRoute = require("./orderRoute");
const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandler");

router.use("/users", userRoute);
router.use("/cust", custRoute);
router.use("/orders", orderRoute);
router.use(errorHandler);

module.exports = router;
