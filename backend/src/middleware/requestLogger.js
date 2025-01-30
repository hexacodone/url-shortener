/ src/middleware/requestLogger.js
const logger = require('../config/logger')

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`)
  next()
}