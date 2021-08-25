const express = require("express");
const cors = require("cors");
const router = require("./routes");

require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Your app is listening to the port ${PORT}`);
});
