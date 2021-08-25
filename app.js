require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");
const server = http.createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

io.on("connection", (socket) => {
  console.log("user connected");
});

app.use(routes);

app.use(errorHandler);

server.listen(port, () => {
  console.log(`Rockin at ${port}`);
});
