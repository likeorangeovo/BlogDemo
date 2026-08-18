/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-08-03 16:47:06
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-03 17:32:12
 */

const express = require('express')

const router = express.Router()

const commentHandler = require('../router_handler/comment.js')

router.get('/list',commentHandler.getCommentList)
router.post('/add',commentHandler.addComment)

module.exports = router