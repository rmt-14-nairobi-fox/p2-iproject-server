const router = require("express").Router();
const AccommodationController = require("../controllers/AccommodationController");
const { imgKitCreate } = require("../middlewares/imgKit");
const { auth, authZOwner } = require("../middlewares/auth");

const multer = require("multer"); //will save into req.file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(auth);

router.get("/", AccommodationController.getAll);

router.get("/:id", authZOwner, AccommodationController.getById);

// upload.single("imageUrl"),
// imgKitCreate,
router.post("/", AccommodationController.create);

//! will have middleware for imagekit
router.put("/:id", authZOwner, AccommodationController.update);

router.delete("/:id", authZOwner, AccommodationController.delete);

router.patch("/:id", authZOwner, AccommodationController.changeStatus);

module.exports = router;
