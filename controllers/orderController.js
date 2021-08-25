const midtransClient = require("midtrans-client");
var sha512 = require("js-sha512");
const { Order, OrderDetail, User, Product } = require("../models");
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
class OrderController {
  static async fetchOrderById(req, res, next) {
    try {
      const response = await Order.findByPk(req.params.id, {
        include: [{ model: OrderDetail, include: [Product] }],
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async notifPayment(req, res, next) {
    try {
      let order_id = +req.body.order_id;
      let status_code = req.body.status_code;
      let myServerKey = process.env.MIDTRANS_SERVER_KEY;
      const signatureMidTrans = req.body.signature_key;

      const findOrder = await Order.findByPk(order_id);

      if (!findOrder) {
        throw { name: "paymentFailed" };
      } else {
        const idFromDb = findOrder.id.toString();
        const grossFromDb = findOrder.totalPrice.toString() + ".00";
        const hashSignature = sha512(
          idFromDb + status_code + grossFromDb + myServerKey
        );

        if (signatureMidTrans === hashSignature) {
          const payloadNewOrder = {
            isPayment: "PAID",
          };

          const updateOrder = await Order.update(payloadNewOrder, {
            where: {
              id: idFromDb,
            },
          });
          res.status(200).json(updateOrder);
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async fetchOrderByCustId(req, res, next) {
    try {
      const orders = await Order.findAll({
        where: {
          CustomerId: req.user.id,
        },
      });

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
  static async custCheckout(req, res, next) {
    try {
      let totalPrice = 0;

      req.body.orderDetails.forEach((el) => {
        console.log(el.price, "<<<<<PRICE");
        totalPrice += el.price;
      });

      const payloadOrder = {
        CustomerId: req.user.id,
        isPayment: "PENDING",
        totalPrice: +totalPrice,
      };

      const createOrder = await Order.create(payloadOrder);

      const newOrderDetail = req.body.orderDetails.map((el) => {
        return {
          OrderId: createOrder.id,
          price: el.price,
          ProductId: el.id,
        };
      });

      const newDetail = await OrderDetail.bulkCreate(newOrderDetail);

      let parameter = {
        transaction_details: {
          order_id: createOrder.id, //order_id
          gross_amount: +totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: req.body.custDetails,
      };
      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      //update database masukin token
      res.status(200).json(transactionToken);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
      next(error);
    }
  }
}

module.exports = OrderController;
