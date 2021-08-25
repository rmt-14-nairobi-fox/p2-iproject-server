const neutrino = require('../apis/neutrinoBadWord');

const badWord = async (req, res, next) => {
    let content = `${req.body.title} ${req.body.description}`
    console.log(content);

    try {
        const { data } = await neutrino({
            method: 'POST',
            data: {
                content
            }
        })

        if (!data["is-bad"]) {
            next()
        } else {
            throw ({
                name: 'BadWord',
                message: 'Your petition contain profanity'
            })
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    badWord
}