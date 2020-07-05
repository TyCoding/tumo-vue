import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

/**
 * 全局Request的封装
 * 作用：和Shiro、Security类似：在登录时做身份认证、鉴权
 * 本项目中：主要用于对全局请求进行封装，在每次请求前都从Vuex中获取Token信息并绑定到Header中
 * request{Authorization: token} -> 后端API，后端从Header中拿到Token值进行比对，以此实现HTTP有状态请求
 */

// create an axios instance
const service = axios.create({
  // Base URL, 按照vue-cli的要求，在系统根目录下`.env.xx`文件中定义
  /**
   * Base Url, 定义在项目根目录 .env.xx（不同的xx代表不同的开发环境）
   * 前端发送Server请求到后端
   * 因为前后端分离，存在跨域，前后端都需要解决跨域请求
   * 前端处理跨域是在`vue.config.js`目录下，利用proxy将请求代理到实际的服务端地址
   */
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 请求前拦截，从vuex中拿Token并设置到Header上
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 请求响应后拦截
   * 主要用于实现全局判断请求是否成功，自定义判断响应code
   * 如果请求成功，就将请求结果返回；
   * 如果请求失败，就在此直接弹出错误msg信息；
   *
   * 以下为自定义状态和错误响应信息，根据后端情况修改
   */
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm('登录状态已失效，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return res
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg || '连接异常，请稍后再试~',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
