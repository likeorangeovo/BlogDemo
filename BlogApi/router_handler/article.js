/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-08-03 17:48:02
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-04 18:15:13
 */
const async = require('async')
const SnowflakeID = require('../utils/SnowflakeID.js')
const moment = require('moment')
const db = require('../db/index.js')

exports.addArticle = (req, res) => {
  const snid = new SnowflakeID({
    mid: +new Date()
  });
  const id = snid.generate();
  const date = moment(new Date()).format("YYYY-MM-DD HH:ss:mm")
  const sqlInsert = 'insert into article set ?;select * from tags'
  db.query(sqlInsert, { id: id, user_id: req.session.userInfo.id, username: req.session.userInfo.username, category_id: req.body.categoryId, name: req.body.name, content: req.body.content, create_time: date, update_time: date }, function (err, rows) {
    if (err) {
      return res.send(err)
    }
    async.map(req.body.tagsName, (tag, callback) => {
      let judge = rows[1].find(row => {
        return row.tag_name == tag
      })
      console.log(judge);
      if (judge == undefined) {
        const sqltag = `insert into tags set ?;insert into article_tags set ?`
        let tagid0 = new SnowflakeID({
          mid: +new Date()
        });
        let tagid = tagid0.generate();
        let connectId0 = new SnowflakeID({
          mid: +new Date()
        });
        let connectId = connectId0.generate();
        console.log('1111');
        db.query(sqltag, [{ id: tagid, tag_name: tag }, { id: connectId, article_id: id, tag_id: tagid }], (err, end) => {
          if (err) return err
          console.log('cheak11111');
          callback(null, tag)
        })
      }
      else {
        console.log('2222');
        let sqltag = `insert into article_tags set ?`
        let connectId0 = new SnowflakeID({
          mid: +new Date()
        });
        let connectId = connectId0.generate();
        db.query(sqltag, [{ id: connectId, article_id: id, tag_id: judge.id }], (err, end) => {
          if (err) return err
          console.log('cheak22222');
          callback(null, tag)
        })
      }
    }, function (err, results) {
      return res.send({ code: 1, msg: '发布成功' })
    })
  })
}
exports.updateArticle = (req, res) => {
  const date = moment(new Date()).format("YYYY-MM-DD HH:ss:mm")
  const sqlInsert = `update article set ? where article.id = ${req.body.id};select * from tags;delete from article_tags where article_tags.article_id =${req.body.id};`
  db.query(sqlInsert, { category_id: req.body.categoryId, name: req.body.name, content: req.body.content, update_time: date }, function (err, rows) {
    if (err) {
      return res.send(err)
    }
    async.map(req.body.tagsName, (tag, callback) => {
      let judge = rows[1].find(row => {
        return row.tag_name == tag
      })
      console.log(judge);
      if (judge == undefined) {
        const sqltag = `insert into tags set ?;insert into article_tags set ?`
        let tagid0 = new SnowflakeID({
          mid: +new Date()
        });
        let tagid = tagid0.generate();
        let connectId0 = new SnowflakeID({
          mid: +new Date()
        });
        let connectId = connectId0.generate();
        console.log('1111');
        db.query(sqltag, [{ id: tagid, tag_name: tag }, { id: connectId, article_id: req.body.id, tag_id: tagid }], (err, end) => {
          if (err) return err
          console.log('cheak11111');
          callback(null, tag)
        })
      }
      else {
        console.log('2222');
        let sqltag = `insert into article_tags set ?`
        let connectId0 = new SnowflakeID({
          mid: +new Date()
        });
        let connectId = connectId0.generate();
        db.query(sqltag, [{ id: connectId, article_id: req.body.id, tag_id: judge.id }], (err, end) => {
          if (err) return err
          console.log('cheak22222');
          callback(null, tag)
        })
      }
    }, function (err, results) {
      return res.send({ code: 1, msg: '修改成功' })
    })
  })
}
exports.removeArticle = (req, res) => {
  const sql = `delete from article_tags where article_tags.article_id =${req.query.articleId};delete from article where article.id =${req.query.articleId}`
  db.query(sql, function (err, results) {
    if (err) {
      return res.send(err)
    }
    return res.send({ code: 1, msg: '删除成功' })
  })
}

exports.searchArticle = (req, res) => {
  let keys = req.query.keywords.split(' ')
  let search = ''
  for(let i in keys){
    if(i == 0){
      search += `article.content like "%${keys[i]}%"`
    }
    else{
      search += ` or article.content like "%${keys[i]}%"`
    }
  }
  console.log(search);
  let sql = `SELECT * FROM article WHERE ${search};`
  db.query(sql,(err,results) =>{
    if(err) return res.send(err)
    for (let data of results) {
      delete data.is_delete
      delete data.available
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
    return res.send({code:1,msg:'搜索成功',data:results})
  })
}