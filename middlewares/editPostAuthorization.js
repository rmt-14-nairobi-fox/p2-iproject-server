const { Post } = require('../models');

module.exports = async function (req, res, next) {
  try {
    const user_id = req.user.id;
    const post_id = req.params.postId;

    const find = await Post.findByPk(post_id);

    if (find) {
      const { user_id: findUser_id } = find;

      if (user_id == findUser_id) {
        next();
      } else {
        const error = new Error();
        error.name = 'Forbidden';
        error.message = 'You are not allowed to modify this post';

        throw error;
      }
    } else {
      const error = new Error();
      error.name = 'Not Found';
      error.message = `Post with id ${post_id} is not found`;

      throw error;
    }
  } catch (err) {
    err.endpoint = req.baseUrl;
    next(err);
  }
};
