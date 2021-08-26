const {decodeToken} = require('../helpers/jwt')
const {User} = require('../models')

function authenticate(req,res,next) {
  if(req.headers.access_token){
    let user = decodeToken(req.headers.access_token)
    if(user){
      User
        .findByPk(user.id)
        .then(result => {
          req.user = result
          next()
        })
        .catch(err => {
          next(err)
        })
    }else {
      next('UserTokenError')
    }
  }else {
    next('notLoggedIn')
  }
}

module.exports = authenticate