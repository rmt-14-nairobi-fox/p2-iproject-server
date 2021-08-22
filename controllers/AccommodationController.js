const { Accommodation } = require("../models");

class AccommodationController {
  static async getAll(req, res, next) {
    try {
      const accommodationsData = await Accommodation.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(accommodationsData);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    const id = +req.params.id;
    try {
      const accommodationData = await Accommodation.findByPk(id);
      if (accommodationData) {
        res.status(200).json(accommodationData);
      } else {
        throw { name: "AccommodationNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    const data = {
      address: req.body.address,
      AuthorId: "" || 1,
      description: req.body.description,
      price: +req.body.price,
      status: req.body.status || "active",
      zipCode: req.body.status,
      long: "",
      lat: "",
      imageUrl: "",
      type: req.body.status,
    };
    try {
      const createdAccommodation = await Accommodation.create(data);

      res.status(201).json(createdAccommodation);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = AccommodationController;
