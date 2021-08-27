const jwt = require('jsonwebtoken');

function authorize(req, res, next) {
    try {
        console.log("MASUk")
        // const payload = jwt.verify(req.headers.Authorization, process.env.);
        const payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        // console.log(payload)
        req.userData = payload; 
        next();
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    authorize
}