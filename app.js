if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3333;
const json = express.json();

app.use(cors());
app.use(json);
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`server listen to port ${port}`);
});
