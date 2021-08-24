const router = require("express").Router();
const OrderController = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");

// router.post("/", OrderController.createOrder);
router.post("/checkout", authentication, OrderController.custCheckout);

module.exports = router;
