const userController = require("../controller/userController");
const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandler");

router.post("/login", userController.login);
router.use(errorHandler);

module.exports = router;
