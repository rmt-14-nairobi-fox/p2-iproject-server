const { SaveAccommodation, Accommodation, User } = require("../models");

class SaveAccommodationController {
  static async getAll(req, res, next) {
    try {
      const savedData = await SaveAccommodation.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          UserId: +req.user.id,
        },
        include: [
          { model: User, attributes: { exclude: ["password"] } },
          { model: Accommodation },
        ],
      });
      res.status(200).json(savedData);
    } catch (err) {
      next(err);
    }
  }

  static async save(req, res, next) {
    const data = {
      UserId: +req.user.id,
      AccommodationId: +req.params.id,
    };
    try {
      const saveAccommodation = await SaveAccommodation.create(data);
      res.status(201).json(saveAccommodation);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SaveAccommodationController;
