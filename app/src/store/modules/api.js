const BASE_URL = process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 上传文件到七牛云
    qiNiuUploadApi: BASE_URL + '/qiniu/upload',
    // swagger
    swaggerApi: BASE_URL + 'swagger-ui.html'
  }
}

export default api
