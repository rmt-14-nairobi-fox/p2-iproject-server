"use strict"
// if (process.env.NODE_ENV === "development") {
// }
require('dotenv').config()
const express = require('express')
const routers = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const saveMessage = require("./helpers/saveMessage")
const port = process.env.PORT || 3000

const users = [];

io.on("connection",(socket)=>{
    console.log("user connected");
    socket.on('sendMessage', (data)=>{
        console.log(data);
        // io.emit("broadcastMessage", data);
        saveMessage(data)
        socket.broadcast.emit("broadcastMessage", data);
    })
    socket.on("loginUser", (user)=>{
        users.push(user)
        console.log(users);
        io.emit("sendUser", users);
        
    })
})

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.get('/', (req,res)=>{
    res.status(200).json({msg:"server running"})
})
app.use('/',routers)
app.use(errorHandler)

httpServer.listen(port, function(){
    console.log('running '+ port);
}) 
