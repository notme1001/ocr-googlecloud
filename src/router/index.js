const express = require('express')
const router = express.Router()
const controller = require('../controller')
const {upload} = require('../models')

router.get('/', controller.index)

router.post('/', upload.single('ocr'), controller.ocr)

module.exports = router