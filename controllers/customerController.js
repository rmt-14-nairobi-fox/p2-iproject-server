const {User, Category, Drug, Favorite} = require('../models/index')
const {comparePassword} = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const { Op } = require("sequelize");
const axios = require('axios')

class CustomerController{
    static register(req,res,next){
        let newCustomers = {
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            role : "Customers",
            phoneNumber : req.body.phoneNumber
        }
        User.create(newCustomers)
        .then((data)=>{
            res.status(201).json({id:data.id, email:data.email})
        })
        .catch(err=>{
            next(err)
        })
    }
    static login(req,res,next){
        User.findOne({where: {email:req.body.email}})
        .then((data)=>{
            if(data){
                if(comparePassword(req.body.password, data.password)){
                    let payload = {
                        id : data.id,
                        email: data.email,
                        role: data.role
                    }
                    let access_token = jwtSign(payload)
                    res.status(200).json({access_token})
                } else{
                    next({
                        name : "Invalid Login",
                        message:`email/password not match` 
                    })
                }
            } else{
                next({
                    name : "Invalid Login",
                    message:`email/password not match` 
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static googleLogin(req,res,next){
        let payload = null;
        const {id_token} = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken : id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then((data)=>{
            payload = data.getPayload()
            return User.findOne({where:{email:payload.email}})
        })
        .then((user)=>{
            if (user) {
                return User.findOne({where : {email: payload.email}})
            } else {
                const username = payload.name
                const email = payload.email
                const address = ""
                const phoneNumber = ""
                const password = process.env.RANDOM_PASSWORD + Date.now()/1000
                return User.create({username,address,phoneNumber,password,email, role : "Customers"})
            }
        })
        .then((data)=>{
            let payload = {
                id : data.id,
                email: data.email,
                role: data.role
            }
            let access_token = jwtSign(payload)
            res.status(200).json({access_token})
        })
        .catch((err)=>{
            next(err)
        })
    }
    static showAll(req,res,next){
        let { name, categoryId, sort, page } = req.query;
        let paramQuerySQL = {};
        let limit, offset;
        
        // filter
        if (name != '' && typeof name !== 'undefined') {
            let query = name.split(',').map(function(name) {
              return {
                [Op.iLike]: '%' + name + '%'
              }
            });
          
            paramQuerySQL.where = {
                ...paramQuerySQL.where,
                name: { [Op.or]: query }, 
            }
        }

        if (categoryId !== "" && typeof categoryId !== "undefined") {
            paramQuerySQL.where = {
                ...paramQuerySQL.where,
                categoryId,
            };
        }

        //sort
        if (sort != '' && typeof sort !== 'undefined') {
            let query = sort.split(',');
            query = query.map(function(item) {
              if (item.charAt(0) !== '-') {
                return [
                  [item, 'ASC']
                ]
              } else {
                return [
                  [item.replace('-', ''), 'DESC']
                ]
              }
            });
          
            paramQuerySQL.order = query;
          }

        // pagination
        if (page != '' && typeof page !== 'undefined') {
            if (page.size != '' && typeof page.size !== 'undefined') {
            limit = page.size;
            paramQuerySQL.limit = +limit;
            } else{
                limit = 10
                paramQuerySQL.limit = +limit;
            }
        
            if (page.number != '' && typeof page.number !== 'undefined') {
            offset = (page.number * limit) - limit;
            paramQuerySQL.offset = offset;
            }
        } else {
            limit = 10; // limit 10 item
            offset = 0;
            paramQuerySQL.limit = +limit;
            paramQuerySQL.offset = offset;
        }
        console.log(paramQuerySQL);
        paramQuerySQL.include=[Category]
        Drug.findAndCountAll(paramQuerySQL)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err)
        });
    }
    static showById(req,res,next){
        const id = +req.params.id
        Drug.findByPk(id,{ include: [ Category ] })
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
            console.log(err);
            next(err)
        })
    }
    static showCategory(req,res,next){
        axios({
            method:"get",
            url:"https://www.halodoc.com/api/v1/buy-medicine/categories"
        })
        .then(({data})=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static showCategoryDetail(req,res,next){
        let category = req.params.name
        axios({
            method:"get",
            url:`https://www.halodoc.com/api/v1/buy-medicine/categories/${category}/products?page=1&size=20`
        })
        .then(({data})=>{
            res.status(200).json(data.result)
        })
        .catch(err=>{
            next(err)
        })
    }
    static showProductDetail(req,res,next){
        let product = req.params.name
        axios({
            method:"get",
            url:`https://www.halodoc.com/api/v1/buy-medicine/products/detail/${product}`
        })
        .then(({data})=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static showProductSimilar(req,res,next){
        let product = req.params.name
        axios({
            method:"get",
            url:`https://www.halodoc.com/api/v1/buy-medicine/products/search/${product}`
        })
        .then(({data})=>{
            res.status(200).json(data.result)
        })
        .catch(err=>{
            next(err)
        })
    }
    static showFavorites(req,res,next){
        Favorite.findAll({
            where : {UserId:req.user.id},
            include: [ User ]
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static addFavorite(req,res,next){
        let newfavorite = {
            UserId:req.user.id,
            image_url:req.body.image_url,
            nameDrug:req.body.nameDrug,
            sellingUnitDrug: req.body.sellingUnitDrug,
            minPriceDrug: req.body.minPriceDrug,
            BasePriceDrug: req.body.BasePriceDrug
        }
        console.log(newfavorite);
        Favorite.create(newfavorite)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static deleteFavorite(req,res,next){
        const id = +req.params.id
        Favorite.destroy({
            where : {id:id}
        })
        .then(data=>{
            if(data){
                res.status(200).json({message:"Favorite success Delete"})
            } else{
                next({
                    name : "Not Found",
                    message:`Favorite with id ${id} not found` 
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}
module.exports=CustomerController