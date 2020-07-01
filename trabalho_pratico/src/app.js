const express = require('express')
const app = express()
const router = require('./routes/routes')

//setting global variables

global.fileName = "grades.json"

app.use(express.json())
app.use(router)

module.exports = app;