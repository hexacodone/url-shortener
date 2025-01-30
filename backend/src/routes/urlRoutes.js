// src/routes/urlRoutes.js
const express = require('express')
const urlController = require('../controllers/urlController')
const router = express.Router()

router.post('/urls', urlController.createShortUrl)
router.get('/urls/:shortCode/stats', urlController.getUrlStats)

module.exports = router