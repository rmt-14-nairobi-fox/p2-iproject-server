const router = require("express").Router();
const OrderController = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");

router.get("/", authentication, OrderController.fetchOrderByCustId);
router.post("/checkout", authentication, OrderController.custCheckout);
router.post("/notif", OrderController.notifPayment);

router.get("/:id", authentication, OrderController.fetchOrderByCustId);

module.exports = router;
