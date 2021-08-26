const {Coin, User, Watcher} = require('../models')
const fetchPriceHistory = require('./bitfinex')
const fetchTechnicalAnalysis = require('./technical-analysis')
const {sendEmailMaxPrice, sendEmailMinPrice} = require('./nodemailer')

function updateCoins() {
  Coin
    .findAll()
    .then(result => {
      result.forEach(coin => {
        fetchTechnicalAnalysis(coin.symbol)
          .then(({data}) => {
            let dataUpdate = {
              price: data.price_btc,
              recommendation: data.recommendation,
              analysis: data.description
            }
            return Coin.update(dataUpdate,{where:{id: coin.id}})
          })
          .then(result => {
            return fetchPriceHistory(coin.symbol,100)
          })
          .then(({data})=> {
            let priceHistory = []
            data.forEach(price => {
              priceHistory.unshift(price[1])
            });
            return Coin.update({priceHistory},{where:{id:coin.id}})
          })
          .then(result => {
            console.log(`${coin.name} has been updated`);
          })
          .catch(err => {
            console.log(`${coin.name} failed to update`);
          })
      });
    })
    .catch(err=> console.log(err))
}

function priceWatch() {
  User
    .findAll()
    .then(result => {
      result.forEach(user => {
        Watcher
          .findAll({
            where: {UserId: user.id},
            include: ['Coin', 'User']
          })
          .then(watchersResult => {
            // console.log(watchersResult.Coin);
            watchersResult.forEach(watcher => {
              if(watcher.minPrice >= watcher.Coin.price && watcher.minPrice !== 0){
                console.log(watcher.maxPrice);
                console.log(watcher.minPrice);
                console.log(watcher.Coin.price);
                sendEmailMinPrice(watcher)
                watcher.minPrice = 0
              }else if(watcher.maxPrice <= watcher.Coin.price && watcher.maxPrice !== 0){
                sendEmailMaxPrice(watcher)
                watcher.maxPrice = 0
              }
              Watcher.update({minPrice: watcher.minPrice, maxPrice: watcher.maxPrice}, {where: {id: watcher.id}})
              .then(result => {
                console.log('watcher has been updated');
              })
              .catch(err=> console.log(err))
            });
          })
      });
    })
    .catch(err=> {
      console.log(err);
    })
}

module.exports = {updateCoins, priceWatch}
