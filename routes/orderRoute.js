const router = require("express").Router();
const OrderController = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");

router.get("/", authentication, OrderController.fetchOrderByCustId);
router.get("/:id", authentication, OrderController.fetchOrderById);
router.post("/checkout", authentication, OrderController.custCheckout);
router.post("/notif", OrderController.notifPayment);
router.patch("/:id", authentication, OrderController.cancelTransaction);

module.exports = router;
