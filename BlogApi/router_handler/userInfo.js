/*
 * @Descripttion: 用户信息路由处理
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-26 16:14:35
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-04 17:39:44
 */
const db = require('../db/index')
let async = require('async')
//加盐加密
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {
  const sql = `select * from user where user.id = ${req.query.userId}; select count(*) total from article where article.user_id = ${req.query.userId}; select guest_id id from follow where follow.host_id =${req.query.userId}`
  db.query(sql, (err, results) => {
    if (err) {
      return res.send(err)
    }
    if (results[0].length != 0) {
      delete results[0][0].password
      delete results[0][0].is_admin
      delete results[0][0].is_disable
      results[0][0].createTime = results[0][0].create_time
      delete results[0][0].create_time
    }

    async.map(results[2], (item, callback) => {
      const sqlFollow = `select * from user where user.id = ${item.id}; select count(*) total from article where article.user_id = ${item.id};`
      db.query(sqlFollow, (err, msg) => {
        if (err) return res.send(err)
        //msg[0]判断用户是否存在
        if (msg[0].length != 0) {
          delete msg[0][0].password
          delete msg[0][0].is_admin
          delete msg[0][0].is_disable
          item = { ...msg[0][0] }
        }
        callback(null, item)
      })
    }, function (err, end) {
      return res.send({ code: 1, data: { ...results[0][0], articleNum: results[1][0].total, followedUser: end } })
    }
    )
  })
}
exports.updateUserInfo = (req,res) =>{
  console.log(req.session.userInfo);
  let pwd = bcrypt.hashSync(req.body.password, 10)
  const sql = `update user set ? where user.id = ${req.session.userInfo.id}`
  db.query(sql,[{username:req.body.username,password:pwd,icon:req.body.icon}],(err,results) =>{
    if(err) return res.send(err)
    return res.send({"code":1,"msg":"修改成功，请重新登录！"})
  })
}