/*
七牛云配置
*/
const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'YOXpF0XvM_3yVDsz5C-hWwrFE5rtDAUQC3XjBQEG'
const secretKey = 'CmrhUV2xHf1d8nPCsws9wwm7jKypCPA0lRVm-7lS'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'lytton',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}
