if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")
const router = require("./routers/index")

app.use(cors())
app.use(express.json({limit: '50mb' }))
app.use(express.urlencoded({extended:true, limit: '50mb' }))
app.use(router)

app.get("/", (req, res) => {
    res.send("Hello Individual Project")
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})