const opm = require('../apis/opm');

class Controller {
  static async getWeather(req, res, next) {
    try {
      const { lat, long } = req.body;
      const response = await opm.get(
        `/weather?lat=${lat}&lon=${long}&appid=${process.env.OPM_KEY}`
      );

      res.status(200).json(response.data);
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }
}

module.exports = Controller;
