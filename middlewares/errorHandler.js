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
        case 'Forbidden Add Class':
            res.status(403).json({ message: 'Only teachers can add class' })
            break;
        case 'Forbidden Follow Class':
            res.status(403).json({ message: 'Only students can follow class' })
            break;
        case 'Invalid Id':
            res.status(400).json({ message: 'Id must be number' })
            break;
        case 'under 0':
            res.status(400).json({ message: 'Id must be greater than zero' })
            break;
        case 'Not Found':
            res.status(404).json({ message: 'Data Not Found' })
            break;
        default:
            res.status(500).json({ message: 'Internal Server Error' })
            break;
    }
}

module.exports = errorHandler
