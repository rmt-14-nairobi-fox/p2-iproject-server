const router = require("express").Router();
const { auth, authZOwner } = require("../middlewares/auth");

const SaveAccommodationController = require("../controllers/SaveAccommodationController");
router.use(auth);

router.get("/", SaveAccommodationController.getAll);

router.post("/:id", SaveAccommodationController.save);

module.exports = router;
