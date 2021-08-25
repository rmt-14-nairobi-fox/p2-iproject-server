const axios = require('axios').default

function fetchPriceHistory(coinCode, limit) {
  let currentDate = Date.now()
  let yesterday = currentDate - 86400000
  let output = []
  // console.log(yesterday);
  // console.log(currentDate, `Current Date`);
  let url = ``
  if(coinCode === 'BTC'){
    url = `https://api-pub.bitfinex.com/v2/tickers/hist?symbols=t${coinCode}USD&start=${yesterday}&end=${currentDate}&limit=${limit}`
  }else {
    url = `https://api-pub.bitfinex.com/v2/tickers/hist?symbols=t${coinCode}BTC&start=${yesterday}&end=${currentDate}&limit=${limit}`
  }
  
  return axios.get(url)
    // .then(({data}) => {
    //   let priceHistory = []
    //   data.forEach(price => {
    //     priceHistory.unshift(price[1])
    //   });
    // })
    // .catch(err=> console.log(err))
}

module.exports = fetchPriceHistory