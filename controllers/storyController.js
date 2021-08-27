const { Story, User, StoryComment, StoriesLike } = require('./../models')
const { getPagingData } = require('./../helpers/pagination')
const {Op} = require('sequelize')

class Controller{
	static async getAllStories(req, res, next){
		try{

			const queries = {...req.query}
			let limit = 5
			let filterPage = queries.page ? queries.page : 0;
			let getResultPage = await Story.findAndCountAll({
				limit : limit, 
				offset : filterPage * limit
			})

			const dataShown = getPagingData(getResultPage, filterPage, limit)
			if (getResultPage.rows.length !== 0) {
				res.status(200).json(dataShown)
			}else if (getResultPage.rows.length === 0){
				throw ({message : "Page not found"})
			}
		}
		catch(err){
			next(err)
		}
	}

	static async storiesPopulateTag(req, res, next){
		try{
			const {tag} = req.query
			console.log(tag);
			const result = await Story.findAndCountAll({
				where : {
					tag
				}
			})
			res.status(200).json(result)
		}
		catch(err){
			res.send(err)
		}
	}

	static async storyFindByPk(req, res, next){
		try{
			const {id} = req.params
			const result = await Story.findByPk(id, {
				include : [StoryComment,User,StoriesLike, {
					model : User,
					as : 'UserComment'
				}]
			})
			if (result) {
				res.status(200).json(result)
			}else{
				throw ({message : "notfoundstory"})
			}
		}
		catch(err){
			next(err)
		}
	}

	static async addStory(req, res, next){
		console.log(req.body);
		try{
			const {id} = req.user
			const {title, sinopsis, story_text, cover_image_url, AuthorId, tag} = req.body
			const result = await Story.create({
				title,
				sinopsis,
				story_text,
				cover_image_url,
				AuthorId : id,
				tag
			})
			console.log(result);
			res.status(201).json(result)
		}
		catch(err){
			console.log(err);
			res.send(err)
		}
	}

	static async deleteStory(req, res, next){
		try{
			const {id} = req.params
			const result = await Story.destroy({
				where : {
					id
				},
				force : true
			})
			res.status(200).json(result)
		}
		catch(err){
			next(err)
		}
	}

	static async addComment(req,res,next){
		try{
			const {reaction, StoryId} = req.body
			const {id} = req.user
			console.log(id);
			const result = await StoryComment.create({
				reaction,
				StoryId,
				UserId : id
			})

			res.status(201).json(result)
		}
		catch(err){
			console.log(err);
			res.status(500).json(err)
		}
	}

	static async addLike(req, res, next){
		try{
			const {StoryId} = req.body
			const {id} = req.user

			const result = StoriesLike.create({
				StoryId,
				UserId : id
			})
			res.status(201).json({message:"Success add like to story"})
		}
		catch(err){
			res.send(err)
		}
	}

	static async resultSearch(req, res, next){
		try{
			const {or} = Op; 
			const {filter} = req.query
			const result = await Story.findAll({
				where : {
					title : {
						[Op.iLike] : `%${filter}%`
					},
				}
			})

			res.status(200).json(result)
		}
		catch(err){
			next(err)
		}
	}

	static async getStoryByAuthor(req, res, next){
		try{
			const {id} = req.user
			const result = await Story.findAndCountAll({
				where : {
					AuthorId : id
				}
			})
			res.status(200).json(result)
		}
		catch(err){
			next(err)
		}
	}

	static async editStoryText(req, res, next){
		try{
			const {id} = req.params
			const {story_text} = req.body
			console.log(story_text, id);
			const result = await Story.update(
				{
					story_text
				},{
					where : {
						id
					},
				})
			
			res.status(200).json(result)
		}
		catch(err){
			next(err)
		}
	}

	static async getRandom(req, res, next){
		try{
			const alls = await Story.findAndCountAll()
			const numb = Math.floor(Math.random() * alls.count) ;
			const result = alls.rows[numb]
			res.status(200).json({choice : result})
		}
		catch(err){
			next(err)
		}
	}
}

module.exports = Controller