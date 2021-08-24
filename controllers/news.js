const { User, NewsPref, SavedNews } = require('../models');
const gnews = require('../apis/gnews');

class Controller {
  static async getNews(req, res, next) {
    try {
      const user_id = req.user.id;
      const find = await User.findByPk(user_id, {
        attributes: ['newsPrefId'],
        include: [NewsPref],
      });
      const user_newsPref = find.NewsPref.name;

      const response = await gnews.get(
        `/search?q=${user_newsPref}&lang=en&token=${process.env.GNEWS_TOKEN}`
      );
      res.status(200).json(response.data);
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }

  static async saveNews(req, res, next) {
    try {
      const user_id = req.user.id;
      const { title, description, content, url, image, publishedAt, source } =
        req.body.payload;
      const payload = {
        title,
        description,
        content,
        url,
        image,
        publishedAt: new Date(publishedAt),
        source_name: source.name,
        source_url: source.url,
        user_id,
      };

      await SavedNews.create(payload);
      res.status(201).json({ message: 'News saved successfully' });
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }

  static async getSavedNews(req, res, next) {
    try {
      const user_id = req.user.id;
      const result = await SavedNews.findAll({
        where: {
          user_id,
        },
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(result);
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }
}

module.exports = Controller;
