const router = require("express").Router();
const AccommodationController = require("../controllers/AccommodationController");

const multer = require("multer"); //will save into req.file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", AccommodationController.getAll);

router.get("/:id", AccommodationController.getById);

router.post("/", upload.single("imgUrl"), AccommodationController.create);

module.exports = router;
