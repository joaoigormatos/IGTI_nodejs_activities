//Config
const express = require('express')
const router = express.Router()

//Routes
const GradesRoutes = require('./GradesRoutes')

router.use('/grades', GradesRoutes)

module.exports = router