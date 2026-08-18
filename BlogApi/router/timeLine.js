const express = require('express')
const router = express.Router()
const timeLineHandler = require('../router_handler/timeLine.js')

router.get('/blogTime',timeLineHandler.getTimeLine)

module.exports = router