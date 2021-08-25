const { SaveAccommodation, Accommodation, User } = require("../models");

class SaveAccommodationController {
  static async getAllSave(req, res, next) {
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
      const foundAccommodation = await SaveAccommodation.findAll({
        where: {
          UserId: data.UserId,
          AccommodationId: data.AccommodationId,
        },
      });
      if (foundAccommodation.length > 0) {
        throw { name: "AlreadyAdded" };
      } else {
        const saveAccommodation = await SaveAccommodation.create(data);
        res.status(201).json(saveAccommodation);
      }
    } catch (err) {
      next(err);
    }
  }

  static async unsave(req, res, next) {
    const id = +req.params.id;
    try {
      const foundSaved = await SaveAccommodation.findByPk(id);
      if (foundSaved) {
        const saveAccommodation = await SaveAccommodation.destroy({
          where: { id },
        });
        res.status(200).json({ message: "Save accommodation has been remove" });
      } else {
        throw { name: "SaveNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SaveAccommodationController;
