class UserController {
    static helloWorld(req, res, next) {
        res.send('Hello World')
    }
}

module.exports = UserController