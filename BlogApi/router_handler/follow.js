/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-08-02 22:10:09
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-04 19:01:02
 */
const db = require('../db/index.js')
const async = require('async')
const SnowflakeID = require('../utils/SnowflakeID.js')
exports.getFollowList = (req, res) => {
  const sql = `select * from follow where follow.guest_id = ${req.session.userInfo.id}`
  db.query(sql, (err, follows) => {
    if (err) return res.send(err)
    async.map(follows, (item, callback) => {
      const sqluser = `select * from user where user.id = ${item.host_id}`
      db.query(sqluser, (err, user) => {
        if (err) return res.send(err)
        item = {...user[0]} 
        callback(null, item)
      })
    }, function (err, results) {
      if (err) return res.send(err)
      console.log(results);
      if (results.length != 0) {
        for (let data of results) {
          delete data.is_admin
          delete data.password
          delete data.is_disable
          data.createTime = data.create_time
          delete data.create_time
        }
      }
      return res.send({ code: 1, data: results })
    })

  })

}

exports.addFollow = (req, res) => {
  const snid = new SnowflakeID({
    mid: +new Date()
  });
  const id = snid.generate();
  const sqlInsert = 'insert into follow set ?'
  db.query(sqlInsert, { id: id, host_id: req.params.hostId, guest_id: req.session.userInfo.id }, function (err, results) {
    if (err) {
      console.log(err);
      return res.send({ code: 0, msg: '关注失败' })
    }
    if (results.affectedRows !== 1) {
      console.log(results);
      return res.send({ code: 0, msg: '关注用户失败，请稍后再试！' })
    }

    res.send({ code: 1, msg: '关注成功' })
  })

}

exports.removeFollow = (req, res) => {
  const sqlInsert = 'delete from follow where follow.host_id=? and follow.guest_id =? '
  db.query(sqlInsert, [req.params.hostId, req.session.userInfo.id], function (err, results) {
    if (err) {

      return res.send({ code: 0, msg: '取关失败' })
    }
    if (results.affectedRows !== 1) {
      console.log(results);
      return res.send({ code: 0, msg: '取关失败，请稍后再试！' })
    }

    res.send({ code: 1, msg: '取关成功' })
  })
}