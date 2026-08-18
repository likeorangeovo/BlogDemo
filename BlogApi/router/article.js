/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-08-03 17:47:53
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-04 17:54:43
 */

const express = require('express')

const router = express.Router()

const articleHandler = require('../router_handler/article.js')

router.post('/add',articleHandler.addArticle)

router.post('/update',articleHandler.updateArticle)

router.get('/delete',articleHandler.removeArticle)

router.get('/search',articleHandler.searchArticle)

module.exports = router