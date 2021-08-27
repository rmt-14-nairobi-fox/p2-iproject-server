const router = require('express').Router()
const Controller = require('./../controllers/storyController')
const { authentication } = require('./../middlewares/auth')

router.get('/', Controller.getAllStories)
router.get('/searchbytag', Controller.storiesPopulateTag)
router.get('/searchbyfilter', Controller.resultSearch)
router.get('/random', Controller.getRandom)
// router.get('/seecomments', Controller.getComment)/*/

/*WITH AUTH*/
router.use(authentication)
router.get('/read/:id', Controller.storyFindByPk)
router.post('/add/', Controller.addStory)
router.post('/comment', Controller.addComment)
router.post('/like', Controller.addLike)
router.get('/created', Controller.getStoryByAuthor)
router.delete('/delete/:id', Controller.deleteStory)
router.patch('/edit/:id', Controller.editStoryText)
module.exports = router