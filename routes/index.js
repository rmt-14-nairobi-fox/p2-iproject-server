const custRouter = require("./custRoute");
const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandler");


router.use("/cust", custRouter);
router.use(errorHandler);

module.exports = router;
