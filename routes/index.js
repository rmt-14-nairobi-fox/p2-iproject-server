const router = require("express").Router();
const accommodationsRouter = require("./accommodations");
const usersRouter = require("./users");
const { errorHandler } = require("../middlewares/errors");

router.use("/accommodations", accommodationsRouter);
router.use("/users", usersRouter);

router.use(errorHandler);
module.exports = router;
