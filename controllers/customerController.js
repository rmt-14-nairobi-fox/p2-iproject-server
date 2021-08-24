const { nextTick } = require("vue/types/umd");
const { Service } = require("../models");
class CustController {
  static async serviceAll(req, rex, next) {
    try {
      const result = await Service.findAll();
      res.status(200).json(resul);
    } catch (error) {
      nextTick(error);
    }
  }
}

module.exports = CustController;
