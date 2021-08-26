if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require("cors")
const router = require('./routes/index')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)

const httpServer = require('http').createServer(app);
const io = require("socket.io")(httpServer)
const users = []

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('sendMessage', (data) => {
    console.log(data, "ini di server");

    // io.emit("broadcastMessage", data) // broadcast ke chatbox seharusnya
    socket.broadcast.emit("broadcastMessage", data)
  })

  socket.on("userLogin", (user) => {
    users.push(user);
    // console.log(users);
    io.emit("sendUser", users) //buat nampilin yang online di chatbox nya(jika sempat)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
// app.listen(PORT, () => {
//   console.log(`return SEMANGAT!!`);
// })

module.exports = app