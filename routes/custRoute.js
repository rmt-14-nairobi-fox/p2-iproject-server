const router = require("express").Router();
const CustController = require("../controllers/customerController");

router.get("/services", CustController.serviceAll);
router.get("/services/:id", CustController.showProduct);

module.exports = router;
