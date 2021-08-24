const { Service, Product, User } = require("../models");
class CustController {
  static async showProduct(req, res, next) {}
  static async serviceAll(req, res, next) {
    try {
      const result = await Service.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CustController;
