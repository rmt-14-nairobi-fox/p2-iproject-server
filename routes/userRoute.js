const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", authentication, UserController.findUser);
router.post("/auth/google", UserController.googleLogin);

module.exports = router;
