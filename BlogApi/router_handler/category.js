/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-31 17:02:55
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-02 17:32:56
 */

const db = require('../db/index.js')
const async = require('async')
exports.getCategory = (req,res)=>{
  
  const sql = `select * from category`
  db.query(sql,(err,category)=>{
    if(err) return res.send(err)
    
    async.map(category, (item,callback)=>{
      const sqlArt = `select * from article where article.category_id = ${item.id}`
      db.query(sqlArt,(err,list)=>{
        if(list.length != 0){
          for (let data of list) {
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
            delete data.available
          }
        }
        item.articleList = list
        callback(null,item)
      })

    },function (err,results) {
      if(err) return res.send(err)
      
      return res.send({code:1,data:results})
    })

  })

}