const { Petition, Sign } = require('../models');

class SignController {
    static async addSign(req, res, next) {
        let petitionId = +req.params.id
        let userId = req.user.id
        try {
            const sign = await Sign.create({
                petitionId,
                userId
            })

            const inc = await Petition.increment('signCount', {
                where: {
                    id: petitionId
                }
            })

            let signCount = inc[0][0][0].signCount
            let maxCount = inc[0][0][0].maxCount

            if (signCount === maxCount) {
                await Petition.update({
                    status: 'archived'
                }, {
                    where: {
                        id: petitionId
                    }
                })

                //nodemailer kirim email ke pembuat petisi kalo udah selesai petisinya
            }

            res.status(201).json({
                id: sign.id,
                petitionId: sign.petitionId,
                userId: sign.userId
            })
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = SignController