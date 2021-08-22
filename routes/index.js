const router = require("express").Router();
const accommodationsRouter = require("./accommodations");

router.use("/accommodations", accommodationsRouter);

module.exports = router;
