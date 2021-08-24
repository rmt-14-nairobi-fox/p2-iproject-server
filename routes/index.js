const userController = require("../controller/userController");
const errorHandler = require("../middlewares/errorHandler");
const router = require("express").Router();

router.use("/login", userController.login);
router.use(errorHandler);

module.exports = router;
