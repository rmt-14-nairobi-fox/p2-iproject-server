const midtransClient = require("midtrans-client");
const { Order, OrderDetail } = require("../models");
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});
class OrderController {
  static async custCheckout(req, res, next) {
    try {
      console.log("===================");
      console.log(req.body.orderDetails, "bodyy");
      // console.log(req.body, "<<<boddyyyyy");

      let parameter = {
        transaction_details: {
          order_id: "YOUR-ORDERID-123456",
          gross_amount: +req.body.totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: req.body.custDetails,
      };
      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      if (!transactionToken) {
        throw { name: "errorTransaction" };
      } else {
        const payloadOrder = {
          CustomerId: req.user.id,
          isPayment: "pending",
          totalPrice: +req.body.totalPrice,
        };

        const createOrder = await Order.create(payloadOrder);

        let orderDetail;
        req.body.orderDetails.forEach((el) => {
          orderDetail = OrderDetail.create({
            OrderId: createOrder.id,
            price: el.price,
            ProductId: el.id,
          });
        });
        res.status(200).json(transactionToken);
      }
    } catch (error) {
      console.log(error, "<<<<<<<<<");
      next(error);
    }
  }
}

module.exports = OrderController;
