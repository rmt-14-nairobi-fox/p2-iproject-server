const midtransClient = require("midtrans-client");
const { Order, OrderDetail } = require("../models");
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
// let mockNotificationJson = {
//   'currency': 'IDR',
//   'fraud_status': 'accept',
//   'gross_amount': '24145.00',
//   'order_id': 'test-transaction-321',
//   'payment_type': 'bank_transfer',
//   'status_code': '201',
//   'status_message': 'Success, Bank Transfer transaction is created',
//   'transaction_id': '6ee793df-9b1d-4343-8eda-cc9663b4222f',
//   'transaction_status': 'pending',
//   'transaction_time': '2018-10-24 15:34:33',
//   'va_numbers': [{'bank': 'bca', 'va_number': '490526303019299'}]
// }
class OrderController {
  static async notifPayment(req, res, next) {
    console.log("masuk notiffff");
    apiClient.transaction
      .notification(mockNotificationJson)
      .then((statusResponse) => {
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(
          `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
        );

        if (transactionStatus == "capture") {
          console.log("masuk capture");
          // capture only applies to card transaction, which you need to check for the fraudStatus
          if (fraudStatus == "challenge") {
            console.log("masuk challenge");
            // TODO set transaction status on your databaase to 'challenge'
            // TODO set transaction status on your databaase to 'challenge'
          } else if (fraudStatus == "accept") {
            console.log("masuk accept");
            // TODO set transaction status on your databaase to 'success'
          }
        } else if (transactionStatus == "settlement") {
          console.log("masuk settlement");
          // TODO set transaction status on your databaase to 'success'
        } else if (transactionStatus == "deny") {
          console.log("masuk deny");
          // TODO you can ignore 'deny', because most of the time it allows payment retries
          // and later can become success
        } else if (
          transactionStatus == "cancel" ||
          transactionStatus == "expire"
        ) {
          console.log("masuk cancel");
          // TODO set transaction status on your databaase to 'failure'
        } else if (transactionStatus == "pending") {
          console.log("masuk pending");
          // TODO set transaction status on your databaase to 'pending' / waiting payment
        }
      });
  }
  static async fetchOrderDetail(req, res, next) {
    try {
      const orders = await Order.findAll({
        where: {
          CustomerId: req.user.id,
        },
        // include: [OrderDetail],
      });

      // const detailsOrder = await orders.map((el) => {
      //   return OrderDetail.findAll({
      //     where: {
      //       OrderId: el.id,
      //     },
      //   });
      // });

      res.status(200).json(orders);
    } catch (error) {
      console.log("==================");
      console.log(error);
      next(error);
    }
  }
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
