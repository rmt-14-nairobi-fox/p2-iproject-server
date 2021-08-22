const router = require("express").Router();
const AccommodationController = require("../controllers/AccommodationController");
const { imgKitCreate } = require("../middlewares/imgKit");

const multer = require("multer"); //will save into req.file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", AccommodationController.getAll);

router.get("/:id", AccommodationController.getById);

router.post(
  "/",
  upload.single("imageUrl"),
  imgKitCreate,
  AccommodationController.create
);

module.exports = router;
