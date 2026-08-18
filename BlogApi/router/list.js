/*
 * @Descripttion: 文章分页请求
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-29 22:18:26
 * @LastEditors: likeorange
 * @LastEditTime: 2022-07-29 22:27:44
 */
const express = require('express')
const router = express.Router()
const listHandler = require('../router_handler/list.js')

router.get('/list',listHandler.getList)

module.exports = router