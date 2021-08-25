const { Wishlist, Destination, Category } = require('../models')

class ControllerWishList {
  static async addUserWishlist(req, res, next) {
    const { id } = req.params
    try {
      const destination = await Destination.findByPk(id)
      if (!destination) throw ({ name: "data not found" })
      else {
        const result = await Wishlist.create({
          UserId: req.user.id,
          DestinationId: destination.id
        })
        res.status(201).json(result)
      }
    } catch (err) {
      next(err)
    }
  }

  static async findWishListsByUserId(req, res, next) {
    try {
      const result = await Wishlist.findAll({
        order: [['id', 'DESC']],
        where: {
          UserId: req.user.id
        },
        include: [
          {
            model: Destination,
            include: {
              model: Category,
            }
          }
        ] //https://sequelize.org/master/manual/advanced-many-to-many.html#through-tables-versus-normal-tables-and-the--quot-super-many-to-many-association-quot-
      })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async deleteWishlist(req, res, next) {
    const { id } = req.params
    try {
      const foundWishlist = await Wishlist.findOne({ where: { id } })
      // console.log(foundWishlist);
      // console.log(foundWishlist === null);
      if (foundWishlist === null) throw ({ name: "data not found" })
      else {
        await Wishlist.destroy({ where: { id } })
        res.status(200).json({ message: `Wishlist has been deleted` })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerWishList