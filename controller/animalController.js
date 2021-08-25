const { User, Animal, Chat } = require("../models");
const { bullSendemail } = require("../helpers/bull");

class animalController {
  static async getAllanimal(req, res) {
    try {
      const animals = await Animal.findAll({
        include: [{ model: User, attributes: { exclude: ["password"] } }],
      });
      res.status(200).json(animals);
    } catch (err) {
      next(err);
    }
  }

  static async createAnimal(req, res, next) {
    const UserId = Number(req.user.id);
    const { name, type, imageUrl } = req.body;
    const newAnimal = { name, type, imageUrl, UserId };

    try {
      const animal = await Animal.create(newAnimal, { returning: true });

      //* send queue
      bullSendemail(animal);
      res.status(201).json(animal);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = animalController;
