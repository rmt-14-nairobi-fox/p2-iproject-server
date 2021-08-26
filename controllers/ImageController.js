const { Image, Accommodation } = require("../models");

class ImageController {
  static async saveImage(req, res, next) {
    const paramsId = +req.params.id;
    const data = {
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      AccommodationId: +paramsId,
    };
    try {
      const accommodationData = await Accommodation.findByPk(paramsId);

      if (accommodationData) {
        const imageAdded = await Image.create(data);
        res.status(201).json(imageAdded);
      } else {
        throw { name: "AccommodationNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async getAllImages(req, res, next) {
    const paramsId = +req.params.id;
    try {
      const accommodationData = await Accommodation.findByPk(paramsId);

      if (accommodationData) {
        const imageData = await Image.findAll({
          where: {
            AccommodationId: paramsId,
          },
        });

        res.status(200).json(imageData);
      } else {
        throw { name: "AccommodationNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteImage(req, res, next) {
    const imageId = +req.params.imageId;
    const accommodationId = +req.params.id;

    try {
      const accommodationFound = await Accommodation.findByPk(accommodationId);
      if (accommodationFound) {
        const imageFound = await Image.findByPk(imageId);

        if (imageFound) {
          const imageData = await Image.destroy({
            where: {
              id: imageId,
            },
          });

          res.status(200).json({ message: "Image has been destroyed" });
        } else {
          throw { name: "ImageNotFound" };
        }
      } else {
        throw { name: "AccommodationNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
  static async getImageById(req, res, next) {
    const imageId = +req.params.imageId;
    const accommodationId = +req.params.id;

    try {
      const accommodationFound = await Accommodation.findByPk(accommodationId);
      if (accommodationFound) {
        const imageFound = await Image.findByPk(imageId);

        if (imageFound) {
          const imageData = await Image.findByPk(imageId, {
            include: Accommodation,
          });

          res.status(200).json(imageData);
        } else {
          throw { name: "ImageNotFound" };
        }
      } else {
        throw { name: "AccommodationNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  // !PUBLIC
  static async getAllImagesPublic(req, res, next) {
    const paramsId = +req.params.accomId;
    try {
      const accommodationData = await Accommodation.findByPk(paramsId);

      if (accommodationData) {
        const imageData = await Image.findAll({
          where: {
            AccommodationId: paramsId,
          },
        });

        res.status(200).json(imageData);
      } else {
        throw { name: "AccommodationNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ImageController;
