const cron = require('node-cron')
const {updateCoins, priceWatch} = require('./tasks')

let backgroundJob = cron.schedule('0 */3 * * *',() => {
  updateCoins()
  priceWatch()
}, {
  scheduled: false
})

module.exports = backgroundJob

