const router = require("express").Router();
const Controller = require("../controllers/gameController");
const { authentication } = require("../middlewares/authentication");

router.get("/", Controller.getHome);

router.post("/", Controller.joinUser);

router.use(authentication);

router.get("/letters", Controller.getWords);

router.get("/leaderboard", Controller.getTopScorer);

router.get("/users", Controller.getUsers);

router.post("/word", Controller.checkWord);

router.patch("/user/:id", Controller.logoutUser);

router.post("/scores", Controller.saveScore);

module.exports = router;
