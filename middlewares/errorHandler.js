function errorHandler(err, req, res, next) {
    let message
    switch (err.name) {
        case 'SequelizeUniqueConstraintError':
            message = {}
            err.errors.forEach(el => {
                if (message[el.path] === undefined) {
                    message[el.path] = ''
                }
                message[el.path] = el.message
            })
            res.status(400).json(message)
            break;
        case 'SequelizeValidationError':
            message = {}
            err.errors.forEach(el => {
                if (message[el.path] === undefined) {
                    message[el.path] = ''
                }
                message[el.path] = el.message
            })
            res.status(400).json(message)
            break;
        case 'JsonWebTokenError':
            if (err.message === 'jwt must be provided') {
                res.status(401).json({ message: 'Please Login First' })
            } else if (err.message === 'invalid signature') {
                res.status(401).json({ message: 'Your Token is Invalid' })
            }
            break;
        case 'Wrong Email/Password':
            res.status(400).json({ message: 'Please Login First' })
            break;
        default:
            res.status(500).json({ message: 'Internal Server Error' })
            break;
    }
}

module.exports = errorHandler
