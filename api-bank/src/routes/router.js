const express = require('express')

const router = express.Router()

const accounts = require('./accounts')

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../config/swaggerDoc")

router.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.use(accounts)

module.exports = router