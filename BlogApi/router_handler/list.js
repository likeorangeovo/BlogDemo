/*
 * @Descripttion: 文章分页请求的操作
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-29 22:19:15
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-02 00:40:24
 */

var async = require('async')
const db = require('../db/index.js')
exports.getList = (req, res) => {
  // console.log(req.query);
  let total = 0
  let sql = `select article.id,user_id,username,content,category_id,name,create_time,update_time,article_hot from article limit ?,?`
  if (req.query.userId) {
    sql = `select article.id,user_id,username,content,category_id,name,create_time,update_time,article_hot from article where article.user_id = ${req.query.userId} limit ?,?`
  }
  db.query(sql, [parseInt((req.query.page - 1) * req.query.pageSize), parseInt(req.query.pageSize)], (err, rows) => {
    if (err) {
      return res.send({ code: 0, msg: '服务器端错误' })
    }
    async.map(rows, (item, callback) => {
      let sqlTag = "select * from tags where `id` in (select tag_id from article_tags where article_id=?)"
      if (req.query.userId) {
        sqlTag += `;select count(*) total from article where article.user_id=${req.query.userId}`
      }
      else {
        sqlTag += `;select count(*) total from article`
      }
      db.query(sqlTag, item.id, (err, tags) => {
        if (err) return res.send({ code: 0, msg: '服务器端错误' });
        const json = JSON.parse(JSON.stringify(tags[0]).replace(/tag_name/g,"tagName"))
        item.tags = json
        total = tags[1][0].total
        callback(null, item)
      });
    }, function (err, results) {
      for (let data of results) {
        delete data.is_delete
        data.articleHot = data.article_hot
        delete data.article_hot
        data.userId = data.user_id
        delete data.user_id
        data.categoryId = data.category_id
        delete data.category_id
        data.createTime = data.create_time
        delete data.create_time
        data.updateTime = data.update_time
        delete data.update_time
      }
      return res.send({ code: 1, data: { records: results, total: total } })
    });
  })

}