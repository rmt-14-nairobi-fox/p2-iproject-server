const { Class } = require('../models');

async function checkClass(req) {
    const { idClass } = req.params
    const idTeacher = req.user.id
    try {
        const result = await Class.findOne({
            where: {
                id: idClass
            }
        })
        if (result.TeacherId == idTeacher) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

module.exports = checkClass