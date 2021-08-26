const router = require("express").Router();
const { auth, authZCustomer } = require("../middlewares/auth");

const SaveAccommodationController = require("../controllers/SaveAccommodationController");
const AccommodationController = require("../controllers/AccommodationController");
const UserController = require("../controllers/UserController");
const ImageController = require("../controllers/ImageController");

router.post("/register", UserController.registerPublic);

router.post("/login", UserController.loginPublic);

router.post("/googleAuth", UserController.googleAuthVerify);

// !SAVED
router.get(
  "/savedAccommodations",
  auth,
  SaveAccommodationController.getAllSave
);
router.get("/:accomId/images", auth, ImageController.getAllImagesPublic);
// ! PUBLIC
router.get("/", AccommodationController.getAllPublic);

router.get("/:id", AccommodationController.getByIdPublic);

// ! sampai sini entah kenapa

// ! id Accommodation
router.post("/:id", auth, authZCustomer, SaveAccommodationController.save);

// ! id SaveAccommodation
router.delete("/:id", auth, authZCustomer, SaveAccommodationController.unsave);

router.use(auth);
// ! USERS PUBLIC SIDE
router.get("/profiles", UserController.userProfile);

router.put("/edit", UserController.edit);

module.exports = router;
