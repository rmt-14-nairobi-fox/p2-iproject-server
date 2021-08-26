const router = require("express").Router();
const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");
const errHandler = require("../middleware/errorHandler");
const Middleware = require("../middleware/autntikasi&Autorisasi");

router.use("/user", userRouter);
router.use(Middleware.authentication);
router.use("/review", reviewRouter);

router.use(errHandler);

module.exports = router;
