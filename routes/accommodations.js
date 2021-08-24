const router = require("express").Router();
const AccommodationController = require("../controllers/AccommodationController");
const { imgKitCreate } = require("../middlewares/imgKit");
const { auth, authZOwner } = require("../middlewares/auth");

const multer = require("multer"); //will save into req.file
const ImageController = require("../controllers/ImageController");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(auth);

router.get("/", AccommodationController.getAll);

router.post("/", AccommodationController.create);

router.get("/:id", authZOwner, AccommodationController.getById);

// ! id accommodation IMAGE
router.post(
  "/:id/images",
  upload.single("imageUrl"),
  imgKitCreate,
  authZOwner,
  ImageController.saveImage
);

router.get("/:id/images", authZOwner, ImageController.getAllImages);

router.delete("/:id/images/:imageId", authZOwner, ImageController.deleteImage);

// router.post("/:id/images", authZOwner, ImageController.saveImage);

//! will have middleware for imagekit
router.put("/:id", authZOwner, AccommodationController.update);

router.delete("/:id", authZOwner, AccommodationController.delete);

router.patch("/:id", authZOwner, AccommodationController.changeStatus);

module.exports = router;
