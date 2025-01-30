// src/middleware/errorHandler.js
const logger = require('../config/logger')

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).json({ error: 'Something broke!' })
}