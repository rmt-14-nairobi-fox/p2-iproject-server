const userController = require("../controller/userController");
const errorHandler = require("../middlewares/errorHandler");
const router = require("express").Router();

router.post("/login", userController.login);

//!test main
router.post("/send", userController.sendEmail);

router.use(errorHandler);

module.exports = router;
