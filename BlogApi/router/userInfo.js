/*
 * @Descripttion: 用户信息路由
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-26 15:38:28
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-04 17:23:58
 */

const express = require('express')

const router = express.Router()

const userInfoHandler = require('../router_handler/userInfo.js')

router.get('/show',userInfoHandler.getUserInfo)

router.post('/update',userInfoHandler.updateUserInfo)

module.exports = router