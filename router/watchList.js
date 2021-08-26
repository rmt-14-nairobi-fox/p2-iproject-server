const router = require("express").Router();
const watchListController = require("../controller/watchlistController");
const Middleware = require("../middleware/autntikasi&Autorisasi");

router.get("/mywatchlist", watchListController.myWatchlist);
router.post("/", watchListController.WatchlistCreate);
router.delete("/:id", Middleware.authorization, watchListController.deleteWatchlist);

module.exports = router;
