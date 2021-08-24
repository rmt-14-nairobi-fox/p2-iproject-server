const router = require("express").Router();
const { auth, authZCustomer } = require("../middlewares/auth");

const SaveAccommodationController = require("../controllers/SaveAccommodationController");
const AccommodationController = require("../controllers/AccommodationController");
const UserController = require("../controllers/UserController");

router.post("/register", UserController.registerPublic);

router.post("/login", UserController.loginPublic);

// ! PUBLIC
router.get("/", AccommodationController.getAllPublic);

router.get("/:id", AccommodationController.getByIdPublic);

router.use(auth);
// !SAVED
router.get("/savedAccommodations", SaveAccommodationController.getAllSave);

// ! USERS PUBLIC SIDE
router.get("/profiles", UserController.userProfile);

router.put("/edit", UserController.edit);

// ! id Accommodation
router.post("/:id", authZCustomer, SaveAccommodationController.save);

// ! id SaveAccommodation
router.delete("/:id", authZCustomer, SaveAccommodationController.unsave);

module.exports = router;
