const { Post } = require('../models');

class Controller {
  static async createPost(req, res, next) {
    try {
      const user_id = req.user.id;
      const { title, message, savedNews_id } = req.body;
      const payload = {
        title,
        message,
        user_id,
        savedNews_id,
      };

      await Post.create(payload);
      res.status(201).json({ message: 'Post created' });
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }
}

module.exports = Controller;
