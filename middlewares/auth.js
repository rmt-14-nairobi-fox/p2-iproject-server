const {decodeToken} = require('./../helpers/jwt')

function authentication(req, res, next){
	try{
		const {access_token} = req.headers
		if (!access_token) {
			throw ({message:'invalid token'})
		}else{
			const payload = decodeToken(access_token)
			req.user = {
				id : payload.id,
				name : payload.name,
				email : payload.email
			}
			next()
		}	
	}
	catch(err){
		next(err)
	}
}

module.exports = {authentication}