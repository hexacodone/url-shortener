// src/models/url.js
const db = require('../config/db')
const crypto = require('crypto')

const generateShortCode = () => {
  return crypto.randomBytes(4).toString('hex')
}

const UrlModel = {
  async create(url) {
    const shortCode = generateShortCode()
    return db.one(
      'INSERT INTO urls (original_url, short_code) VALUES ($1, $2) RETURNING *',
      [url, shortCode]
    )
  },

  async findByShortCode(shortCode) {
    return db.oneOrNone('SELECT * FROM urls WHERE short_code = $1', shortCode)
  },

  async incrementAccessCount(shortCode) {
    return db.none(
      'UPDATE urls SET access_count = access_count + 1, last_accessed = CURRENT_TIMESTAMP WHERE short_code = $1',
      shortCode
    )
  }
}

module.exports = UrlModel
