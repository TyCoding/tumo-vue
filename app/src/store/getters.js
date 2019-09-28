const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  qiNiuUploadApi: state => state.api.qiNiuUploadApi,
  swaggerApi: state => state.api.swaggerApi
}
export default getters
