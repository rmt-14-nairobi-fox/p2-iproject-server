const {Category} = require('../models')

class CategoryController{
    static showAll(req,res,next){
        Category.findAll()
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static createCategory(req,res,next){
        let newCategory = {
            name:req.body.name
        }
        Category.create(newCategory)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static deleteCategory(req,res,next){
        const id = +req.params.id
        Category.destroy({where:{id:id}})
        .then((data)=>{
            if(data){
                res.status(200).json({message:`Category with id ${id} success to deleted`})
            } else{
                next({
                    name : "Not Found",
                    message:`Category with id ${id} not found` 
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static updateCategory(req,res,next){
        let id = +req.params.id
        let updateCategory = {
            name : req.body.name
        }
        Category.update(updateCategory,{
            where : {id:id},
            returning : true
        })
        .then((data) =>{
            if(data[0]){
                res.status(200).json(data[1][0])
            } else{
                next({
                    name : "Not Found",
                    message:`Category with id ${id} not found` 
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static showById(req,res,next){
        const id = +req.params.id
        Category.findByPk(id)
        .then((data)=>{
            if(data){
                res.status(200).json(data)
            } else{
                next({
                    name : "Not Found",
                    message:`Category with id ${id} not found` 
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}
module.exports=CategoryController