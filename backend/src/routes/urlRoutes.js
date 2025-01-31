// src/routes/urlRoutes.js
const express = require('express')
const urlController = require('../controllers/urlController')
const router = express.Router()

// URL Erstellung und Stats
router.post('/urls', urlController.createShortUrl)
router.get('/urls/:shortCode/stats', urlController.getUrlStats)

// Redirect Route (wichtig für die Hauptfunktionalität)
router.get('/:shortCode', urlController.redirectToUrl)

module.exports = router