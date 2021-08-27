const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const indexRoutes = require('./routes/index');

app.use('/api/v1', indexRoutes)


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

module.exports = app