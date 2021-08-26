const {Watcher} = require('../models')
class WatcherController{
  static getAll (req,res,next) {
    let UserId = req.user.id
    Watcher
      .findAll({
        where: {UserId},
        include: ['Coin']
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => next(err))
  }
  static getById (req,res,next) {

  }
  static post (req,res,next) {
    let newWatcher = {
      CoinId: req.params.coinId,
      UserId: req.user.id,
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice
    }

    Watcher
      .create(newWatcher)
      .then(result => {
        res.status(201).json({message: 'New watcher created'})
      })
      .catch(err=> next(err))
  }
  static patch (req,res,next) {
    let watcherId = req.params.id
    let newTreshold = {
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice
    }
    Watcher
      .update(newTreshold, {
        where: {
          id: watcherId
        }
      })
      .then(result => {
        res.status(200).json({message: 'Watcher has been updated'})
      })
      .catch(err => next(err))

  }
  static delete (req,res,next) {
    let watcherId = req.params.id

    Watcher
      .destroy({
        where: {
          id: watcherId
        }
      })
      .then(result => {
        res.status(200).json({message: 'Watcher has been deleted'})
      })
      .catch(err => next(err))
  }
}

module.exports = WatcherController