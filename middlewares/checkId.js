function checkId(req, res, next) {
    const { id } = req.params
    try {
        if (isNaN(Number(id))) {
            throw { name: 'Invalid Id' }
        } else {
            if (id <= 0) {
                throw { name: 'under 0' }
            } else {
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = checkId