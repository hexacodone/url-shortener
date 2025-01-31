// src/middleware/errorHandler.js
const logger = require('../config/logger')

const errorHandler = (err, req, res, next) => {
  // Log full error for debugging
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  })

  // Custom error handling
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation Error',
      details: err.message 
    })
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ 
      error: 'Authentication required' 
    })
  }

  // Default error
  res.status(err.status || 500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message 
  })
}

module.exports = errorHandler