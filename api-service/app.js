const express = require('express')
require('dotenv').config({path: (process.env.ENV = 'local' ? './.local.env' : '.env')})
const bodyParser = require('body-parser')

const router = require('./router')
const middleware = require('./common/middleware')

const app = express()

app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))