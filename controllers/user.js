const {User} = require('../models')
const {generateToken}  = require('../helpers/jwt')
const {comparer} = require('../helpers/bcrypt')
class UserController{
  static login (req,res,next) {
    let email = req.body.email
    let password = req.body.password

    User
      .findOne({where: {email}})
      .then(result => {
        if(comparer(password,result.password)){
          let user = {
            username: result.username,
            id: result.id
          }
          res.status(200).json({access_token: generateToken(user), username: result.username})
        }else {
          next('wrongCredentials')
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static register (req,res,next) {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User
      .create(newUser)
      .then(result => {
        let registeredUser = {
          email: result.email,
          username: result.username
        }
        res.status(201).json(registeredUser)
      })
      .catch(err=> next(err))
  }
}

module.exports = UserController