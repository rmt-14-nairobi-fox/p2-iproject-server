const { SavedNews } = require('../models');

module.exports = async function (req, res, next) {
  try {
    const user_id = req.user.id;
    const { savedNews_id } = req.body;

    const find = await SavedNews.findOne({
      where: {
        id: savedNews_id,
      },
    });

    if (find) {
      const { user_id: findUser_id } = find;

      if (user_id == findUser_id) {
        next();
      } else {
        const error = new Error();
        error.name = 'Forbidden';
        error.message = "You can't use this saved news for your post";

        throw error;
      }
    } else {
      const error = new Error();
      error.name = 'Not Found';
      error.message = `Saved news with id ${savedNews_id} is not found`;

      throw error;
    }
  } catch (err) {
    err.endpoint = req.baseUrl;
    next(err);
  }
};
