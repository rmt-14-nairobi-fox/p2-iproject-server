const {User,Drug} = require('../models')
const {jwtVerify} = require('../helpers/jwt')

function authentication(req,res,next){
    const {access_token} = req.headers
    if (access_token) {
        const payload = jwtVerify(access_token)
        User.findByPk(payload.id)
        .then((data)=>{
            if (data) {
                req.user = {id:data.id,role:data.role,email:data.email}
                next()
            } else{
                next({
                    name : "invalid JWT",
                    message:"invalid JWT" 
                })
            }
        })
        .catch(err=>{
            console.log(err);
            next(err)
        })
    } else{
        next({
            name : "Not Login",
            message:"You Must Login First" 
        })
    }
}
function authorization(req,res,next){
    const {id} = req.params
    Drug.findByPk(Number(id))
    .then((data)=>{
        if (data) {
            if(req.user.role === "admin"){
                next()
            }else{
                next({
                    name : "Forbidden",
                    message:"forbidden to access" 
                })
            }
        } else{
            next({
                name : "Not Found",
                message:"data not found" 
            })
        }
    })
    .catch(err=>{
        next(err)
    })
}
function isAdmin(req,res,next){
    const {role} = req.user
    if(role === "admin"){
        next()
    } else {
        next({
            name:"Not Authorized",
            message: "User is Not Authorized"
        })
    }
}
function isCustomer(req,res,next){
    const {role} = req.user
    if(role === "Customers"){
        next()
    } else {
        next({
            name:"Not Authorized",
            message: "User is Not Customers"
        })
    }
}
module.exports={authentication,authorization,isAdmin,isCustomer}