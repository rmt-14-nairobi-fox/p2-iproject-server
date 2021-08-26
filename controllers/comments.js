const { Comment, User } = require('../models');

class Controller {
  static async fetchComments(req, res, next) {
    try {
      const post_id = req.body.post_id || null;

      if (post_id) {
        const result = await Comment.findAll({
          where: {
            post_id,
          },
          include: [
            {
              model: User,
              attributes: ['name', 'imgUrl'],
            },
          ],
        });

        res.status(200).json(result);
      } else {
        const error = new Error();
        error.name = 'Bad Request';
        error.message = 'Please send post ID to fetch comments';

        throw error;
      }
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }
}

module.exports = Controller;
