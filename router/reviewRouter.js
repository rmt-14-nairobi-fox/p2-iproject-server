const router = require("express").Router();
const reviewController = require("../controller/reviewController");
const Middleware = require("../middleware/autntikasi&Autorisasi");

router.get("/", reviewController.AllReview);
router.get("/myreview", Middleware.authorization, reviewController.myReview);
router.post("/", reviewController.reviewCreate);
router.put("/:id", Middleware.authorization, reviewController.updateReview);
router.delete("/:id", Middleware.authorization, reviewController.deleteReview);

module.exports = router;
