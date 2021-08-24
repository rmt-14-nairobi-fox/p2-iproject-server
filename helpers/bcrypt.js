const bcrypt = require('bcrypt')
const round = 8

function generatePass(pass){
	return bcrypt.hashSync(pass, bcrypt.genSaltSync(round))
}

function checkPass(pass, hash){
	return bcrypt.compareSync(pass, hash)
}

module.exports = {generatePass, checkPass}