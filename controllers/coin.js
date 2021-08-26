const {Coin} = require('../models')
class CoinController{
  static getAll (req,res,next) {
    Coin
      .findAll()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => next(err))
  }
  static getById (req,res,next) {
    let id = req.params.id
    Coin
      .findByPk(id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => next(err))
  }
}

module.exports = CoinController