const { Watchlist, User } = require("../models");

class WatchListController {
  static async myWatchlist(req, res, next) {
    const { id } = req.user;
    try {
      const result = await Watchlist.findAll({
        where: { UserId: id },
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async WatchlistCreate(req, res, next) {
    try {
      const { url, image_url, title, episodes, rated } = req.body;
      const { id } = req.user;
      const payload = {
        url: url,
        image_url: image_url,
        title: title,
        episodes: episodes,
        rated: rated,
        UserId: id,
      };
      const result = await Watchlist.create(payload);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async deleteWatchlist(req, res, next) {
    const id = +req.params.id;
    try {
      const watchList = await Watchlist.findByPk(id);
      if (watchList !== null) {
        await Watchlist.destroy({
          where: { id: id },
        });
        res.status(200).json({ message: "WatchList has been Remove" });
      } else {
        throw { name: "NotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = WatchListController;
