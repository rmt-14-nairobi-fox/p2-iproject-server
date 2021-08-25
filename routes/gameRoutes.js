const router = require("express").Router();
const Controller = require("../controllers/gameController");

router.get("/", Controller.getHome);

router.post("/", Controller.joinUser);

module.exports = router;
