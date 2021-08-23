const router = require("express").Router();
const { auth, authZCustomer } = require("../middlewares/auth");

const SaveAccommodationController = require("../controllers/SaveAccommodationController");
const AccommodationController = require("../controllers/AccommodationController");

router.use(auth);
router.get("/savedAccommodations", SaveAccommodationController.getAllSave);

router.get("/", AccommodationController.getAllPublic);

router.get("/:id", AccommodationController.getByIdPublic);

// ! id Accommodation
router.post("/:id", authZCustomer, SaveAccommodationController.save);

// ! id SaveAccommodation
router.delete("/:id", authZCustomer, SaveAccommodationController.unsave);

module.exports = router;
