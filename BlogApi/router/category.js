/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-31 17:02:33
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-02 17:10:09
 */
const express = require('express')

const router = express.Router()

const getCategoryHandler = require('../router_handler/category.js')

router.get('/list',getCategoryHandler.getCategory)

module.exports = router