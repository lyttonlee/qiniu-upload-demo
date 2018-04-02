// 引入包
const express = require('express')
const bodyparse = require('body-parser')
// 创建服务
const app = express()
// 解析数据
app.use(bodyparse.json())
// 引入七牛云配置
const qnconfig = require('./config.js')
// 处理请求
app.get('/token', (req, res, next) => {
  // console.log(qnconfig.uploadToken)
  res.status(200).send(qnconfig.uploadToken)
})
// 监听3000端口
app.listen(3000, () => {
  console.log('this server are running on localhost:3000!')
})
