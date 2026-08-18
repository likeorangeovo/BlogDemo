/*
 * @Descripttion: 登录注册路由处理
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-25 20:50:01
 * @LastEditors: likeorange
 * @LastEditTime: 2022-07-30 20:49:24
 */

const db = require('../db/index.js')

//加盐加密
const bcrypt = require('bcryptjs')
//雪花算法生成ID
const SnowflakeID = require('../utils/SnowflakeID.js')
//格式化时间戳
const moment = require('moment')

/**
 * @name: regiter
 * @msg: 
 * @param {*} req
 * @param {*} res
 * @return {*} 是否注册成功
 */
exports.register = (req, res) => {
  const userInfo = req.body
  // console.log(userInfo);
  if (!userInfo.username || !userInfo.password) {
    return res.send({ code: 0, msg: '用户名或密码不合法' })
  }
  const sql = `select * from user where username=?`
  db.query(sql, [userInfo.username], function (err, results) {
    if (err) {
      return res.send({ code: 0, msg: err.msg })
    }
    if (results.length > 0) {
      return res.send({ code: 0, msg: '用户名被占用，请更换其他用户名！' })
    }

    //加盐加密用户密码
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    //雪花算法生成用户ID
    const snid = new SnowflakeID({
      mid: +new Date()	
    });
    const id = snid.generate();
    //格式化注册时间戳
    const date = moment(new Date()).format("YYYY-MM-DD HH:ss:mm")
    const sqlInsert = 'insert into user set ?'
    db.query(sqlInsert, {id: id, username: userInfo.username, password: userInfo.password, create_time:date}, function (err, results) {
      if (err) {
        console.log(err);
        return res.send({ code: 0, msg: '注册失败' })
      }
      if (results.affectedRows !== 1) {
        console.log(results);
        return res.send({ code: 0, msg: '注册用户失败，请稍后再试！' })
      }
      
      res.send({code:1, msg:'注册成功'})
  })
  })

}

/**
 * @name: login
 * @msg: 
 * @param {*} req
 * @param {*} res
 * @return {*} 是否登录成功
 */
exports.login = (req, res) => {
  const userInfo = req.body
  // console.log(req.session);
  const sql = `select * from user where username=?`
  db.query(sql,userInfo.username, function (err,results) {
    if(err){
      return res.send({code:0, msg:err.msg})
    }
    if(results.length > 0){
      //对比加盐加密后password是否一致
      const compareResult = bcrypt.compareSync(userInfo.password,results[0].password)
      if (!compareResult) {
        // console.log(results[0]);
        return res.send({code:0,msg:'用户名或密码不存在'})
      }
      else{
        jsonData = results[0]
        delete jsonData.is_admin
        delete jsonData.is_disable
        delete jsonData.password
        jsonData.createTime = jsonData.create_time
        delete jsonData.create_time
        // const sql1 = 'select * from user where username=?'
        req.session.userInfo = jsonData
        req.session.isLogin = true
        // console.log(req.session.id);
        return res.send({code:1,msg:'登录成功',data:{...jsonData}})
      }
    }
    else{
      return res.send({code:0,msg:'用户名不存在'})
    }
  })
}

/**
 * @name: logout
 * @msg: 
 * @return {*}
 */
exports.logout = (req, res) => {
  req.session.destroy()
  res.send({code: 1, msg: "登出成功！"})
}