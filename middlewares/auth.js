const { verifyToken } = require('../helpers/jwt');

function authentication(req, res, next) {
    const { access_token } = req.headers
    try {
        const payload = verifyToken(access_token)
        if (payload) {
            req.user = {
                id: payload.id,
                email: payload.email,
                role: payload.role
            }
            next()
        } else {
            throw { name: 'JsonWebTokenError' }
        }
    } catch (err) {
        next(err)
    }
}

function checkTeacher(req, res, next) {
    const { role } = req.user
    try {
        if (role === 'teacher') {
            next()
        } else {
            throw { name: 'Forbidden Add Class' }
        }
    } catch (err) {
        next(err)
    }
}

function checkStudent(req, res, next) {
    const { role } = req.user
    try {
        if (role === 'student') {
            next()
        } else {
            throw { name: 'Forbidden Follow Class' }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication, checkTeacher, checkStudent }