function readAllFarmOpt(role, id) {
    let options = {
        order: [
            ['updatedAt', 'DESC']
        ],
    }

    if (role === 'customer') {
        options.where = {
            UserId: id
        }
    }

    return options
}

module.exports = {
    readAllFarmOpt
}