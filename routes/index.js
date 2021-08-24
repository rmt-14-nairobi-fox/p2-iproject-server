const userRoute = require("./userRoute");
const custRoute = require("./custRoute");
const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandler");

router.use("/users", userRoute);
router.use("/cust", custRoute);
router.use(errorHandler);

module.exports = router;
