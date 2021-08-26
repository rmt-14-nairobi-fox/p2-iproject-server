const router = require("express").Router();
const CustController = require("../controllers/customerController");
const authentication = require("../middlewares/authentication");
router.get("/services", CustController.serviceAll);
router.get("/services/:id", authentication, CustController.showProduct);

module.exports = router;
