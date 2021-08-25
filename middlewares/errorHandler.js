const errorHandler = (err, req, res, next) => {
    let message = []
    let code = null
    
    switch (err.name) {
        case 'SequelizeValidationError':
            err.errors.forEach(el => {
                message.push(el.message)
            })
            code = 400
            break;
        
        case 'SequelizeUniqueConstraintError':
            err.errors.forEach(el => {
                message.push(el.message)
            })
            code = 400
            break;
        
        default:
            console.log(err);
            message = err.message || 'Internal Server error'
            code = 500
            break;
    }
    res.status(code).json({ message })
}

module.exports = {
    errorHandler
}