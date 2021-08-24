const { Post, SavedNews } = require('../models');

class Controller {
  static async getPosts(req, res, next) {
    try {
      const result = await Post.findAll({
        include: [
          {
            model: SavedNews,
            attributes: ['title'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(result);
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }

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

  static async editPost(req, res, next) {
    try {
      const user_id = req.user.id;
      const post_id = req.params.postId;
      const { title, message, savedNews_id } = req.body;
      const payload = {
        title,
        message,
        user_id,
        savedNews_id,
      };

      await Post.update(payload, {
        where: {
          id: post_id,
        },
      });

      res.status(200).json({ message: 'Post edited' });
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const user_id = req.user.id;
      const post_id = req.params.postId;

      await Post.destroy({
        where: {
          id: post_id,
          user_id,
        },
      });

      res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }
}

module.exports = Controller;
