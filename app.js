const express = require('express')
const cors = require('cors');
const router = require('./routers');
const errorHandler = require('./middlewares/errorHandler');
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})