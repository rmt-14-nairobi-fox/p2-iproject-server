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
  static async cancelTransaction(req, res, next) {
    try {
      const idForUpdate = req.params.id;
      const newStatus = {
        isPayment: "CANCELED",
      };
      const updateOrder = await Order.update(newStatus, {
        where: {
          id: idForUpdate,
        },
      });
      res.status(200).json({ message: "payment canceled" });
    } catch (error) {
      next(error);
    }
  }
  static async fetchOrderById(req, res, next) {
    try {
      const response = await Order.findByPk(req.params.id, {
        include: [
          {
            model: OrderDetail,
            include: [{ model: Product, include: [User] }],
          },
        ],
      });
      res.status(200).json(response);
    } catch (error) {
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

        let payloadNewOrder;

        if (status_code == "202") {
          payloadNewOrder = {
            isPayment: "CANCELED",
          };
        }

        if (status_code == "407") {
          payloadNewOrder = {
            isPayment: "CANCELED",
          };
        }

        if (signatureMidTrans === hashSignature) {
          payloadNewOrder = {
            isPayment: "PAID",
          };

          const updateOrder = await Order.update(payloadNewOrder, {
            where: {
              id: idFromDb,
            },
          });
        }
        res.status(200).json({ message: "payment success" });
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
        order: [["id", "DESC"]],
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
      const { custDetails } = req.body;
      let parameter = {
        transaction_details: {
          order_id: createOrder.id,
          gross_amount: +totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          customer_name: custDetails.custName,
          customer_email: custDetails.email,
          customer_address: custDetails.address,
          customer_phone: custDetails.phoneNumber,
          customer_date_service: custDetails.dateService,
        },
      };
      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      //update database masukin token
      let payloadToken = {
        tokenPayment: transactionToken,
      };
      const updateOrder = await Order.update(payloadToken, {
        where: {
          id: createOrder.id,
        },
      });
      res.status(200).json(transactionToken);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;

// { totalPrice: 170000,
//   orderDetails:
//    [ { id: 15,
//        name: 'The Rock Lightning',
//        ProviderId: 7,
//        price: 150000,
//        ServiceId: 10,
//        detail:
//         'Selain bisa potong rambut juga bisa potong arus listrik rumahmu',
//        createdAt: '2021-08-25T12:29:57.008Z',
//        updatedAt: '2021-08-25T12:29:57.008Z',
//        Service: [Object],
//        User: [Object] },
//      { id: 13,
//        name: 'Messi Gardener',
//        ProviderId: 5,
//        price: 20000,
//        ServiceId: 11,
//        detail: 'Bersihkan kebun tanpa sisa',
//        createdAt: '2021-08-25T12:29:57.008Z',
//        updatedAt: '2021-08-25T12:29:57.008Z',
//        Service: [Object],
//        User: [Object] } ],
//   custDetails:
//    { custName: 'customerregist',
//      email: 'cust3@mail.com',
//      address: 'Jl. Singgasana no 69.  Pringsewu, Lampung, Indonesia.',
//      phoneNumber: '+6282181080180',
//      dateService: '2021-08-28' } }
