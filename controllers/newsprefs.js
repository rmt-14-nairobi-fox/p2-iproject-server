const { NewsPref } = require('../models');

class Controller {
  static async getNewsPrefs(req, res, next) {
    try {
      const response = await NewsPref.findAll({
        attributes: ['name'],
      });

      res.status(200).json(response);
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }
}

module.exports = Controller;
