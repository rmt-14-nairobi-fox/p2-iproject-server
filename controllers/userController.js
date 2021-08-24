const { User } = require('./../models')
const {generatePass, checkPass} = require('./../helpers/bcrypt')
const {signToken} = require('./../helpers/jwt')

class Controller {
	static async register(req, res, next){
		try{
			const {name, email, password, date_birth, gender} = req.body
			const userCreated = await User.create({
				name,
				email,
				password,
				date_birth,
				gender	
			})

			if (userCreated) {
				res.status(201).json(userCreated)
			}
		}
		catch(err){
			next(err)
		}
	}

	static async login(req, res, next){
		try{
			const {email, password} = req.body
			const findUser = await User.findOne({
				where : {
					email
				}
			})

			if (findUser) {
				const passCheck = checkPass(password, findUser.password)
				if (passCheck) {
					const access_token = signToken({
						id : findUser.id,
						email : findUser.email,
					})

					res.status(200).json({access_token})
				}else{
					throw ({message : 'unauthorized'})
				}
			}else{
				throw ({message : 'unauthorized'})
			}
		}
		catch(err){
			next(err)
		}
	}
}

module.exports = Controller