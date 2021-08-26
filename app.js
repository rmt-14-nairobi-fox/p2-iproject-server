if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const router = require("./router/index");
const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

io.on("connection", (socket) => {
  console.log("user Connected");
  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("broadcastMessage", data);
  });
});

httpServer.listen(PORT, () => {
  console.log("runing" + PORT);
});

// app.listen(port, () => {
//   console.log("run", port);
// });

module.exports = app;
