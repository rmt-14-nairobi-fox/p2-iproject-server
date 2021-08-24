const {Drug, User, Category} = require('../models')

class DrugController{
    static showAll(req,res,next){
        Drug.findAll({
            include:[Category],
            order: [['id', 'DESC']],
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static createDrug(req,res,next){
        let newDrug = {
            name:req.body.name,
            rangePrice:req.body.rangePrice,
            description:req.body.description,
            composition:req.body.composition,
            doses:req.body.doses,
            rule:req.body.rule,
            imgUrl:req.body.imgUrl,
            categoryId:req.body.categoryId,
        }
        Drug.create(newDrug)
        .then((data)=>{
            res.status(201).json(data)   
        })
        .catch(err=>{
            next(err)
        })
    }
    static deleteDrug(req,res,next){
        Drug.destroy({where:{id:+req.params.id}})
        .then((data)=>{
            if (data) {
                res.status(200).json({message: "success delete Drug"})
            } else{
                next({
                    name : "Not Found",
                    message:`Product with id ${id} not found` 
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static updateDrug(req,res,next){
        let id = +req.params.id
        let updateDrug = {
            name:req.body.name,
            rangePrice:req.body.rangePrice,
            description:req.body.description,
            composition:req.body.composition,
            doses:req.body.doses,
            rule:req.body.rule,
            imgUrl:req.body.imgUrl,
            categoryId:req.body.categoryId,
        }
        Drug.update(updateDrug,{
            where : {id:id},
            returning : true
        })
        .then((data) =>{
            if(data[0]){
                res.status(200).json(data)  
            } else{
                next({
                    name : "Not Found",
                    message:`Drug with id ${id} not found` 
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static showById(req,res,next){
        const id = +req.params.id
        Drug.findByPk(
            id,
            {include : [{model:Category}]
        })
        .then((data)=>{
            if(data){
                res.status(200).json(data)
            } else{
                next({
                    name : "Not Found",
                    message:`Drug with id ${id} not found` 
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}
module.exports=DrugController