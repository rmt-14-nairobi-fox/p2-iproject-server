const { Petition, Sign } = require('../models');

class PetitionController {
    static async addPetition(req, res, next) {
        let authorId = req.user.id
        let { title, description, imageUrl, source, maxCount } = req.body

        try {
            const petition = await Petition.create({
                authorId,
                title,
                description,
                imageUrl,
                source,
                signCount: 1,
                maxCount,
                status: 'published'
            })

            const authorSign = await Sign.create({
                userId: authorId,
                petitionId: petition.id
            })
            
            res.status(201).json(petition)
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = PetitionController