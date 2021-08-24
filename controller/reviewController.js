const { Review, User } = require("../models");

class reviewController {
  static async AllReview(req, res, next) {
    try {
      const result = await Review.findAll({
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
  static async myReview(req, res, next) {
    const { id } = req.user;
    try {
      const result = await Review.findAll({
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
  static async reviewCreate(req, res, next) {
    try {
      const { url, image_url, title, episodes, rated, userpoin, review, recomendation } = req.body;
      const { id } = req.user;
      const payload = {
        url: url,
        image_url: image_url,
        title: title,
        episodes: episodes,
        rated: rated,
        userpoin: userpoin,
        review: review,
        recomendation: recomendation,
        UserId: id,
      };
      const result = await Review.create(payload);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async updateReview(req, res, next) {
    const id = +req.params.id;
    const { userpoin, review, recomendation } = req.body;
    try {
      const userReview = await Review.findByPk(id);
      if (userReview !== null) {
        const payload = {
          userpoin: userpoin,
          review: review,
          recomendation: recomendation,
        };
        console.log(payload);
        const result = await Review.update(payload, { where: { id: id }, returning: true });
        res.status(200).json(result[1][0]);
      } else {
        throw { name: "NotFound" };
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteReview(req, res, next) {
    const id = +req.params.id;
    try {
      const review = await Review.findByPk(id);
      if (review !== null) {
        await Review.destroy({
          where: { id: id },
        });
        res.status(200).json({ message: "review has ben delete" });
      } else {
        throw { name: "NotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = reviewController;
