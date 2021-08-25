const router = require("express").Router();
const OrderController = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");

router.get("/", authentication, OrderController.fetchOrderDetail);
router.post("/checkout", authentication, OrderController.custCheckout);
router.get("/notif", authentication, OrderController.notifPayment);

module.exports = router;
