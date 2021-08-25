const animalController = require("../controller/animalController");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHandler");

router.get("/", animalController.getAllanimal);
router.use(auth);
router.post("/", animalController.createAnimal);

router.use(errorHandler);

module.exports = router;
