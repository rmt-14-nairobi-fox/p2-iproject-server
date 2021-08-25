const userController = require("../controller/userController");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHandler");
const { router: bullRouter } = require("../helpers/bull");
const geoLocation = require("../helpers/geolocation");

router.use("/admin/queues", bullRouter);

router.post("/login", userController.login);
router.get("/animal", userController.getAllanimal);

router.post("/nearbyPost", geoLocation, userController.calculateLocation);

router.use(auth);
router.post("/animalAdd", userController.createAnimal);

router.use(errorHandler);

module.exports = router;
