const express = require('express')
const router = require('./routes/router')
const logger = require('./config/logger')
const app = express()

const cors = require("cors")

global.fileName = "account.json"
global.logger = logger


app.use(express.json())
app.use(cors())
app.use(router)

module.exports = app