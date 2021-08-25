const { verifyToken } = require("../helpers/jwt");


authenticate = async (req, res, next) => {
    // console.log(req)
    try {
        const { access_token } = req.headers
        // console.log(access_token);
        if (!access_token) {
            res.status(401).json({message: "Unauthorized"})
        } else {
            console.log("lolos AUTHENTICATION <========================================")
            const result = verifyToken(access_token) //Jangan pake object
            req.user = {
                id: result.id,
                email: result.email
            }
            if (!result) {
                console.log("Gagal")
                res.status(401).json({message: "Unauthorized"})
            } else {
                console.log("lolos result AUTHENTICATION <========================================")
                next()
            }
        }
    } catch (err) {
        console.log("GAGAL AUTHENTICATION")
        res.status(500).json(err)
    }
}

module.exports = authenticate