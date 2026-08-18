/*
 * @Descripttion: multer(multipart/form-data格式数据处理中间件)配置
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-28 19:37:01
 * @LastEditors: likeorange
 * @LastEditTime: 2022-07-28 21:40:52
 */
const multer = require('multer')
const md5 = require('md5')
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname+'/../public/img')
  },
  filename: (req, file, callback) => {
    let fileFormat = (file.originalname).split(".");
    callback(null, md5(+new Date()) + "." + fileFormat[fileFormat.length - 1]);
  }
})
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500000
  }
});
module.exports = upload.single('file')