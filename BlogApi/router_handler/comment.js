/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-08-03 16:47:14
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-03 17:35:50
 */

const db = require('../db/index.js')
const async = require('async')
const SnowflakeID = require('../utils/SnowflakeID.js')
const moment = require('moment')

exports.getCommentList = (req, res) => {
  console.log(req.query);

  const sql = `select user_id,article_id,comment,create_time from comment where comment.article_id = ${req.query.articleId}`

  db.query(sql, (err, rows) => {
    if (err) return res.send(err)

    async.map(rows, (item, callback) => {

      const sqlUser = `select username,icon from user where user.id = ${item.user_id}`
      db.query(sqlUser, (err, user) => {
        if (err) return res.send(err)
        item = { ...item, ...user[0] }
        console.log(item);
        callback(null, item)
      })
    }, function (err, results) {
      for (let data of results) {
        data.userId = data.user_id
        delete data.user_id
        data.articleId = data.article_id
        delete data.article_id
        data.createTime = data.create_time
        delete data.create_time
      }
      return res.send({ code:1,data:results })
    })

  })
}

exports.addComment = (req, res) => {
  console.log(req.body);
  const snid = new SnowflakeID({
    mid: +new Date()
  });
  const id = snid.generate();
  const date = moment(new Date()).format("YYYY-MM-DD HH:ss:mm")
  const sqlInsert = 'insert into comment set ?'
    db.query(sqlInsert, {id: id, user_id: req.session.userInfo.id, article_id: req.body.articleId,comment:req.body.comment,create_time:date}, function (err, results) {
      if (err) {
        console.log(err);
        return res.send({ code: 0, msg: '评论失败' })
      }
      if (results.affectedRows !== 1) {
        console.log(results);
        return res.send({ code: 0, msg: '评论文章失败，请稍后再试！' })
      }
      
      res.send({code:1, msg:'发表成功'})
  })
}