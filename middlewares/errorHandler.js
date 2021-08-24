function errorHandler(err, req, res, next) {
    switch (err.name) {
        case '':

            break;

        default:
            res.status(500).json({ message: 'Internal Server Error' })
            break;
    }
}
module.exports = errorHandler