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
      zipCode: req.body.zipCode,
      long: null,
      lat: null,
      imageUrl: "",
      type: req.body.type,
    };
    try {
      const createdAccommodation = await Accommodation.create(data);

      res.status(201).json(createdAccommodation);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const id = +req.params.id;
    const data = {
      address: req.body.address,
      // AuthorId: "" || 1,
      description: req.body.description,
      price: +req.body.price,
      status: req.body.status || "active",
      zipCode: req.body.zipCode,
      long: null,
      lat: null,
      // imageUrl: "",
      type: req.body.type,
    };
    console.log(data, "<<<<<<<");
    try {
      const foundAccommodation = await Accommodation.findByPk(id);
      if (foundAccommodation) {
        const updatedAccomodation = await Accommodation.update(data, {
          where: { id: id },
          returning: true,
        });
        res.status(200).json(updatedAccomodation[1][0]);
      } else {
        throw { name: "AccommodationNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const id = +req.params.id;

    try {
      const foundAccommodation = await Accommodation.findByPk(id);
      if (foundAccommodation) {
        const dataDelete = foundAccommodation.id;
        const deleteAccommodation = await Accommodation.destroy({
          where: { id: id },
        });
        res.status(200).json({ message: `${dataDelete} success to delete` });
      } else {
        throw { name: "AccommodationNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AccommodationController;
