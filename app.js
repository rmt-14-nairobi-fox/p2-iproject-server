

const express = require("express")
const app = express()
const port = 3000
// const router = require("./routes/index")
const cors = require("cors")
const router = require("./routers/index")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)

app.get("/", (req, res) => {
    res.send("Hello Individual Project")
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})