"use strict"
// if (process.env.NODE_ENV === "development") {
// }
require('dotenv').config()
const express = require('express')
const routers = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.get('/', (req,res)=>{
    res.status(200).json({msg:"server running"})
})
app.use('/',routers)
app.use(errorHandler)

module.exports=app