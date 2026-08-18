/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-25 20:50:01
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-03 21:34:37
 */
const express = require('express')
const app = express()

// 跨域处理
const cors = require('cors')
app.use(cors())

//数据格式处理
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//导入session
const session = require('express-session')
app.use(session({
  secret:'passwordlikeorange',
  resave:false,
  saveUninitialized:false,
  cookie: {maxAge: 604800000},
}))


// 用户登录注册路由
const userRouter = require('./router/user')
app.use('/user',userRouter)

// 用户个人信息路由
const userInfoRouter = require('./router/userInfo.js')
app.use('/user',userInfoRouter)

//图片(文件)处理路由
const fileProcessRouter = require('./router/fileProcess.js')
app.use('/file',fileProcessRouter)

//文章分页请求路由
const getListRouter = require('./router/list.js')
app.use('/blog',getListRouter)

//时间轴路由
const getTimeLine = require('./router/timeLine.js')
app.use('/blog',getTimeLine)

//分类路由
const getCategory = require('./router/category.js')
app.use('/category',getCategory)

//关注路由
const follow = require('./router/follow.js')
app.use('/follow',follow)

//评论路由
const comment = require('./router/comment.js')
app.use('/comment',comment)

//文章路由
const article= require('./router/article.js')
app.use('/blog',article)

//数据验证
const joi = require('joi')
// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.send(err)
  // 未知错误
  // console.log(req.body);
  // console.log(err);
  return res.send({code:0,msg:err.message})
})


app.listen(8001, function () {
  console.log('api serve')
})

