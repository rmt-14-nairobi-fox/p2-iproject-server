function errorHandler(err, req, res, next) {

	console.log(err.name);
	let cod = 500
	let messages = 'Internal Server Error'

	if (err.name === "SequelizeValidationError") {
		cod = 400
		messages = err.errors.map(e => e.message)
		console.log(messages);
	}else if(err.name === "JsonWebTokenError") {
		messages = "You need to login first"
		cod = 401
	}

	switch (err.message){
		case "unauthorized":
		cod = 401
		messages = "Email/password wrong"
		break

		case "notfoundstory":
		cod = 400
		messages = "No Story with this id found"
		break

		case "invalid token":
		cod = 401
		messages = "You need to login first"
		break

		case "Page not found":
		cod = 400
		messages = "Page not found"
		break

	}

	res.status(cod).json({messages})
}

module.exports = errorHandler