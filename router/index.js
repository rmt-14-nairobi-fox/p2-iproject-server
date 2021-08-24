const router = require("express").Router();
const userRouter = require("./userRouter");
const errHandler = require("../middleware/errorHandler");

router.use("/user", userRouter);

// router.use(errHandler);

module.exports = router;
