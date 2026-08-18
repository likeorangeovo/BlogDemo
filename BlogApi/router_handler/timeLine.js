/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-31 15:56:11
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-02 17:39:35
 */

const db = require('../db/index.js')
const async = require('async')
exports.getTimeLine = (req, res) => {
  const sql = `select article.id,username,user_id,content,category_id,name,create_time,update_time,article_hot from article where article.user_id = ${req.query.userId}`
  db.query(sql, (err, rows) => {
    if (err) return res.send(err)
    if(rows.length == 0) return res.send({code:1})
    async.map(rows, (item, callback) => {
      const sqlTag = `select * from tags where id in (select tag_id from article_tags where article_id=?)`
      db.query(sqlTag,item.id,(err,tags)=>{
        if (err) return res.send(err)
        item.tags = JSON.parse(JSON.stringify(tags))
        callback(null, item)
      })
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
      return res.send({ code: 1, data: { ...results } })
    }
    )
  })

}