const baseUrl = process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 上传文件到七牛云
    qiNiuUploadApi: baseUrl + '/api/storage/qiniu/upload',
    // swagger
    swaggerApi: baseUrl + '/swagger-ui.html'
  }
}

export default api
