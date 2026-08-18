/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-28 19:57:50
 * @LastEditors: likeorange
 * @LastEditTime: 2022-07-29 20:08:48
 */

const express = require('express')

const router = express.Router()

const fileHandler = require('../router_handler/fileProcess.js')

const multerConfig = require('../utils/multerConfig.js')

router.post('/upload',multerConfig,fileHandler.upload)

router.get('/download',fileHandler.download)

module.exports = router