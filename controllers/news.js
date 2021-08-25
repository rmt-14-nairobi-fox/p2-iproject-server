const { User, NewsPref, SavedNews } = require('../models');
const gnews = require('../apis/gnews');
const mail = require('../config/nodemailer');

class Controller {
  static async searchNews(req, res, next) {
    try {
      const searchQuery = req.body.searchQuery || null;

      if (searchQuery) {
        const response = await gnews.get(
          `/search?q=${searchQuery}&lang=en&token=${process.env.GNEWS_TOKEN}`
        );
        res.status(200).json(response.data);
      } else {
        const error = new Error();
        error.name = 'Bad Request';
        error.message = 'Please provide some keywords';

        throw error;
      }
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }

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

  static async deleteSavedNews(req, res, next) {
    try {
      const id = req.params.savedId;
      const user_id = req.user.id;

      await SavedNews.destroy({
        where: {
          id,
          user_id,
        },
      });

      res.status(200).json({ message: 'Saved news deleted successfully' });
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }

  static async sendEmail(req, res, next) {
    try {
      const user_id = req.user.id;
      const user_email = req.user.email;
      const result = await SavedNews.findAll({
        where: {
          user_id,
        },
        attributes: ['title', 'url'],
      });

      if (result.length) {
        let emailText = '';

        result.forEach((news, i) => {
          emailText += `${i + 1}. ${news.title}\nLink: ${news.url}\n\n`;
        });

        let mailDetails = {
          from: 'the.newromantimes21@gmail.com',
          to: user_email,
          subject: 'Your Saved News at The New Roman Times',
          text: emailText,
        };

        mail.sendMail(mailDetails, function (err, data) {
          if (err) {
            throw err;
          } else {
            res.status(200).json({
              message: 'Email sent',
            });
          }
        });
      } else {
        const error = new Error();
        error.name = 'Not Found';
        error.message = "You don't have any saved news";

        throw error;
      }
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }
}

module.exports = Controller;
