const { Destination, Category } = require('../models')

class ControllerDestination {
  static async create(req, res, next) {
    const data = {
      name: req.body.name,
      country: req.body.country,
      city: req.body.city,
      price: req.body.price,
      image: req.body.imageUrl,
      categoryId: req.body.categoryId,
      authorId: req.user.id
    };
    try {
      const result = await Destination.create(data)
      // console.log(result);
      res.status(201).json({
        id: result.id,
        name: result.name,
        country: result.country,
        city: result.city,
        price: result.price, 
        image: result.image,
        categoryId: result.categoryId,
        authorId: result.authorId,
        updatedAt: new Date(),
        createdAt: new Date()
      })
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }

  static async findAll(req, res, next) {
    try {
      const result = await Destination.findAll({
        include: Category,
        order: [['id', 'DESC']]
      })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async findByPk(req, res, next) {
    const { id } = req.params
    try {
      const result = await Destination.findByPk(id)
      if (result) {
        res.status(200).json(result)
      } else throw ({ name: `data not found` })
    } catch (err) {
      next(err)
    }
  }

  static async edit(req, res, next) {
    const data = {
      name: req.body.name,
      country: req.body.country,
      city: req.body.city,
      price: req.body.price,
      image: req.body.imageUrl,
      categoryId: req.body.categoryId,
      authorId: req.user.id
    };
    const { id } = req.params
    try {
      const result = await Destination.update(data,
        { where: { id }, returning: true }
      );
      res.status(200).json({
        id: result[1][0].id,
        name: result[1][0].name,
        country: result[1][0].country,
        city: result[1][0].city,
        price: result[1][0].price,
        image: result[1][0].image,
        categoryId: result[1][0].categoryId,
        authorId: result[1][0].authorId,
        updatedAt: new Date(),
        createdAt: new Date()
      })
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params
    try {
      const result = await Destination.destroy({ where: { id } })
      // console.log(result);
      res.status(200).json({ message: `Destination has been deleted` })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerDestination