const jwt = require('jsonwebtoken')
const secret = '340202'

function signToken(obj){
	return jwt.sign(obj, secret);
}

function decodeToken(token){
	return jwt.verify(token, secret);
}

module.exports = {signToken, decodeToken}