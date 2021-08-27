const {OAuth2Client} = require('google-auth-library');
const {User} = require('./../models')
const {generatePass} = require('./../helpers/bcrypt')
const {signToken} = require('./../helpers/jwt')

class Controller {
	static async googleLogin(req,res,next){
		try{

			const client = new OAuth2Client('958739728302-hdp3k0kgjbj7fi14q3tka2gjberbqcf3.apps.googleusercontent.com');
			const ticket = await client.verifyIdToken({
				idToken : req.body.idToken,
				audience : '958739728302-hdp3k0kgjbj7fi14q3tka2gjberbqcf3.apps.googleusercontent.com'
			})

			const payload = ticket.getPayload()
			const { name, email, picture} = payload
			console.log(payload);

			const newPass = generatePass(email) //defaultpass

			const [user, create ] = await User.findOrCreate({
				where : {email},
				defaults : {
					name,
					email,
					password : newPass,
					gender : 'unverified',
					date_birth : new Date(),
					profile_picture : picture

				} 
			})

			const access_token = signToken({id : user.id, name : user.name, role: user.role})
			res.status(200).json({ 
				data :

				{	id : user.id, 
					name : user.name, 
					email : user.email, 
					access_token : access_token }});
		}
		catch(err){
			next(err)
		}
	}
	
}

module.exports = Controller