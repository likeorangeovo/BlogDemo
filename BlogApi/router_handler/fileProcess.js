/*
 * @Descripttion: 图片文件上传处理
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-28 19:59:27
 * @LastEditors: likeorange
 * @LastEditTime: 2022-07-30 22:32:28
 */
const db = require('../db/index.js')

exports.upload = (req, res) => {
  // console.log(req.file);
  if (req.file == null) {
    return res.send("不能为空")
  }
  console.log(req.session);
  const sql = 'update user set icon=? where id=?'
  db.query(sql, [req.file.filename, req.session.userInfo.id], function (err, results) {
    if (err) {
      return res.send({ code: 1, msg: err.msg })
    }
    req.session.userInfo.icon = req.file.filename
    // console.log(req.session);
    return res.send({code:0,msg:req.file.filename})
  })

}
exports.download = (req, res) => {
  if(req.query.name){
    return res.download(__dirname +'../../public/img/'+req.query.name)
  }
  if(req.session.isLogin){
    return res.download(__dirname +'../../public/img/'+req.session.userInfo.icon)
  }
  else{
    return res.download(__dirname +'../../public/img/'+'default_img.jpg')
  }
}