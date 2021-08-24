function errorHandler(err, req, res, next) {

	let cod = 500
	let messages = 'Internal Server Error'

	if (err.name === "SequelizeValidationError") {
		cod = 400
		messages = err.errors.map(e => e.message)
		console.log(messages);
	}

	switch (err.message){
		case "unauthorized":
		cod = 401
		messages = "Email/password wrong"
		break
	}

	res.status(cod).json({messages})
}

module.exports = errorHandler