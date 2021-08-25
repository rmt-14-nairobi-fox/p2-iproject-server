const userController = require("../controller/userController");
const router = require("express").Router();
const userRouter = require("./userRoutes");
const animalRouter = require("./animalRoutes");
const errorHandler = require("../middlewares/errorHandler");
const { router: bullRouter } = require("../helpers/bull");
const geoLocation = require("../helpers/geolocation");

router.use("/admin/queues", bullRouter);
router.use("/user", userRouter);
router.use("/animal", animalRouter);

router.post("/nearbyPost", geoLocation, userController.calculateLocation);

router.use(errorHandler);

module.exports = router;
