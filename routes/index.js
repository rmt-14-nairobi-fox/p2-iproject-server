const router = require("express").Router();
const accommodationsRouter = require("./accommodations");
const publicRouter = require("./public");
const usersRouter = require("./users");
const { errorHandler } = require("../middlewares/errors");

router.use("/accommodations", accommodationsRouter);
router.use("/users", usersRouter);
router.use("/public", publicRouter);

router.use(errorHandler);
module.exports = router;
