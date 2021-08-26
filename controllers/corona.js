const corona = require('../apis/corona');

class Controller {
  static async getCoronaGraph(req, res, next) {
    try {
      const response = await corona.get('/graph.png?c=ID', {
        responseType: 'arraybuffer',
      });

      let base64Img = Buffer.from(response.data, 'binary').toString('base64');
      base64Img = 'data:image/png;base64,' + base64Img;

      res.status(200).json({ image: base64Img });
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }
}

module.exports = Controller;
