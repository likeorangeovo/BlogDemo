/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-08-02 22:09:59
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-03 16:25:10
 */

const express = require('express')
const router = express.Router()
const followHandler = require('../router_handler/follow.js')

router.get('/list',followHandler.getFollowList)

router.get('/add/:hostId',followHandler.addFollow)

router.get('/remove/:hostId',followHandler.removeFollow)

module.exports = router