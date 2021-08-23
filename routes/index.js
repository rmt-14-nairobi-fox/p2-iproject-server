const router = require("express").Router();
const accommodationsRouter = require("./accommodations");
const { errorHandler } = require("../middlewares/errors");

router.use("/accommodations", accommodationsRouter);

router.use(errorHandler);
module.exports = router;
