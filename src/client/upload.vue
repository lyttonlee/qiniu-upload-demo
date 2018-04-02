<template>
  <!-- upload -->
  <div class="upload">
    <el-upload
      class="avatar-uploader"
      :action= domain
      :http-request = upqiniu
      :show-file-list="false"
      :before-upload="beforeUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imageUrl: '',
      token: {},
      domain: 'https://upload-z2.qiniup.com',
      qiniuaddr: 'p3z6q1uw1.bkt.clouddn.com'
    }
  },
  methods: {
    upqiniu (req) {
      console.log(req)
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      const keyname = 'lytton' + new Date() + Math.floor(Math.random() * 100) + '.' + filetype
      // console.log(keyname)
      this.axios.get('/up/token').then(res => {
        console.log(res)
        // this.token = res.data
        const formdata = new FormData()
        formdata.append('file', req.file)
        formdata.append('token', res.data)
        formdata.append('key', keyname)
        // console.log(formdata)
        this.axios.post(this.domain, formdata, config).then(res => {
          // console.log(res)
          this.imageUrl = 'http://' + this.qiniuaddr + '/' + res.data.key
          // console.log(this.imageUrl)
        })
      })
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>
.upload {
  width: 600px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 5px dashed #ca1717 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
