const axios = require('axios').default

function fetchTechnicalAnalysis(coinCode) {
  let TAapiKey = 'FBT2CTIJ4AKJLBEOPR6GTALMJWV2BW4NU7GV33XW2WIWIS5H'
  return axios({
    method: 'GET',
    url: `https://technical-analysis-api.com/api/v1/analysis/${coinCode}?apiKey=${TAapiKey}`
  })
    // .then(({data})=>{
    //   let newData = {
    //     price: data.price_btc,
    //     recommendation: data.recommendation,
    //     analysis: data.description.replace(/(\r\n|\n|\r)/gm," ")
    //   }
    //   console.log(newData);
    // })
    // .catch(err=>console.log(err))
}
// fetchTechnicalAnalysis('ETH')
module.exports = fetchTechnicalAnalysis