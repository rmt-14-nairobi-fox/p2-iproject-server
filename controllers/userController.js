const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController{
    static register(req,res,next){
        let newUser = {
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            role : "admin",
            phoneNumber : req.body.phoneNumber
        }
        User.create(newUser)
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
}
module.exports=UserController