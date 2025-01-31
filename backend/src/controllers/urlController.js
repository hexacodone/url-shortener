
// src/controllers/urlController.js
const UrlModel = require('../models/url')
const logger = require('../config/logger')

const urlController = {
  async createShortUrl(req, res) {
    try {
      const { url } = req.body
      if (!url) {
        return res.status(400).json({ error: 'URL is required' })
      }

      // Basic URL validation
      try {
        new URL(url)
      } catch (err) {
        return res.status(400).json({ error: 'Invalid URL' })
      }

      const urlEntry = await UrlModel.create(url)
      res.json({
        shortCode: urlEntry.short_code,
        originalUrl: urlEntry.original_url
      })
    } catch (error) {
      logger.error('Error creating short URL:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  async redirectToUrl(req, res) {
    try {
      const { shortCode } = req.params
      const urlEntry = await UrlModel.findByShortCode(shortCode)

      if (!urlEntry) {
        return res.status(404).json({ error: 'Short URL not found' })
      }

      await UrlModel.incrementAccessCount(shortCode)
      res.redirect(urlEntry.original_url)
    } catch (error) {
      logger.error('Error redirecting:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  async getUrlStats(req, res) {
    try {
      const { shortCode } = req.params
      const urlEntry = await UrlModel.findByShortCode(shortCode)

      if (!urlEntry) {
        return res.status(404).json({ error: 'Short URL not found' })
      }

      res.json({
        shortCode: urlEntry.short_code,
        originalUrl: urlEntry.original_url,
        created: urlEntry.created_at,
        lastAccessed: urlEntry.last_accessed,
        accessCount: urlEntry.access_count
      })
    } catch (error) {
      logger.error('Error getting URL stats:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = urlController