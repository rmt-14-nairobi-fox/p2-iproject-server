const userController = require("../controller/userController");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHandler");
const { router: bullRouter, bullSendemail } = require("../helpers/bull");
const cron = require("node-cron");

const { User, Animal, Chat } = require("../models");

const expression = "* * * * * *";
const task = cron.schedule(
  expression,
  async () => {
    console.log("running a task every second");
    const animals = await Animal.findAll({
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    let lastPosttime = animals[animals.length - 1].createdAt.getTime();
    let dateNow = new Date().getTime() - 1000;
    if (lastPosttime >= dateNow) {
      bullSendemail();
    }
  },
  {
    scheduled: false,
    timezone: "Asia/Jakarta",
  }
);
task.start();

router.use("/admin/queues", bullRouter);

router.post("/login", userController.login);
router.get("/animal", userController.getAllanimal);

//!test send email
// router.post("/send", userController.sendEmail);

router.use(auth);
router.post("/animalAdd", userController.createAnimal);

router.use(errorHandler);

module.exports = router;
