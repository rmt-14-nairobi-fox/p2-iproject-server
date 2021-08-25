const UserController = require("../controllers/UserController");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/profiles", auth, UserController.userProfile);

router.put("/edit", auth, UserController.edit);

module.exports = router;
