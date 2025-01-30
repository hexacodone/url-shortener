// src/app.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const urlRoutes = require('./routes/urlRoutes')
const redirectRoutes = require('./routes/redirectRoutes')
const { requestLogger } = require('./middleware/requestLogger')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

// Routes
app.use('/api', urlRoutes)
app.use('/', redirectRoutes)

// Error handling
app.use(errorHandler)

module.exports = app