const { SavedNews } = require('../models');

module.exports = async function (req, res, next) {
  try {
    const user_id = req.user.id;
    const id = req.params.savedId;

    const find = await SavedNews.findByPk(id);
    const { user_id: savedUser_id } = find;

    if (user_id == savedUser_id) {
      next();
    } else {
      const error = new Error();
      error.name = 'Forbidden';
      error.message = 'You are not allowed to delete this saved news';

      throw error;
    }
  } catch (err) {
    err.endpoint = req.baseUrl;
    next(err);
  }
};
