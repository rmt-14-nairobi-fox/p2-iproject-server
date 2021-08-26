const {Watcher} = require('../models')

function authorize(req,res,next) {
  let watcherId = req.params.id
  let UserId = req.user.id
  // console.log(watcherId);
  Watcher
    .findByPk(watcherId)
    .then(result => {
      // console.log(result);
      if(result.UserId === UserId){
        next()
      }else{
        next('unauthorized')
      }
    })
    .catch(err => next(err))
}

module.exports = authorize