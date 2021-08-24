const router = require("express").Router();
const CustController = require("../controllers/customerController");

router.get("/services", CustController.serviceAll);

module.exports = router;
