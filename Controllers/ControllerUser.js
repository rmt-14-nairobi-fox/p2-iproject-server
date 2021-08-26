const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { signToken, verifyToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class ControllerUser {
  static async register(req, res, next) {
    const { email, password } = req.body
    try {
      const result = await User.create({ email, password, role: "customer" })
      const access_token = signToken({ id: result.id, email: result.email })
      res.status(201).json({ id: result.id, email: result.email, role: result.role, access_token })
      // console.log(res);
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }
  static async login(req, res, next) {
    const { email, password } = req.body
    try {
      const result = await User.findOne({ where: { email } })
      if (result) {
        if (checkPassword(password, result.password)) {
          const access_token = signToken({ id: result.id, email: result.email, role: result.role })
          res.status(200).json({ id: result.id, email: result.email, role: result.role, access_token })
          // console.log(res);
        } else {
          throw ({ name: 'Unauthorized' })
        }
      } else {
        throw ({ name: 'Unauthorized' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async userLoginned(req, res, next) {
    try {
      const access_token = req.headers.access_token
      const payload = verifyToken(access_token)
      const { email, role } = payload
      res.status(200).json({ email, role})
    } catch (err) {
      next(err)
    }
  }

  static async googleAuth(req, res, next) {
    try {
      // console.log(req.body.access_token);
      const ticket = await client.verifyIdToken({
        idToken: req.body.access_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      const { email } = ticket.getPayload()
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: email,
          role: "customer" //jadi customer
        }
      })
      if (user) {
        const access_token = signToken({
          id: user.id,
          email: user.email,
          role: user.role
        })
        res.status(200).json({ id: user.id, email: user.email, role: user.role, access_token })
      }
    } catch (err) {
      next(err)
    }
  }
  
}

module.exports = ControllerUser