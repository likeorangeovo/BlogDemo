/*
 * @Descripttion: mysql远程连接
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-25 20:50:01
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-03 23:05:55
 */


const mysql = require('mysql')
const config = require('../config')
const db = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  dateStrings: true,//<-  强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回
  connectionLimit:20,
  multipleStatements: true
})

module.exports = db