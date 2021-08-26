const express = require('express')
const cors = require('cors')
const backgroundJob = require('./helpers/cron')
const router = require('./routes')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(router)

backgroundJob.start()

app.listen(PORT, ()=> {
  console.log(`listening @ http://localhost:${PORT}`);
})