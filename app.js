const express = require("express");
const cors = require("cors");

const router = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log("🚀 ~ file: app.js ~ line 7 ~ app.listen ~ PORT", PORT);
});
