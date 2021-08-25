const express = require('express')
const cors = require('cors')
const backgroundJob = require('./helpers/cron')
require('dotenv').config()
const router = require('./routes')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(router)

backgroundJob.start()

app.listen(port, ()=> {
  console.log(`listening @ http://localhost:${port}`);
})