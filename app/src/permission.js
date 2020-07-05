import router from './router'
import store from './store'
import { Message, MessageBox } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

/**
 * 全局页面路由的封装
 * 和Request的封装有一个共同点：对页面拦截。
 * 主要实现的功能：如果Token，或者没有权限不允许访问某些页面
 */

const whiteList = ['/', '/links', '/about', '/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/tumo' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 如果有Token，但是vuex中没有用户信息，那么先获取用户信息再跳转页面
          // 注意：/login, /user/getInfo 接口具体请求都是定义在vuex store action中，/store/modules/user.js
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1 || to.path.startsWith('/archives')) {
      // start progress bar
      NProgress.start()
      // in the free login whitelist, go directly
      next()
    } else {
      MessageBox.confirm('你的登录状态已失效，你可以选择重新登录或留在此页面，是否继续?', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next(`/login?redirect=${to.path}`)
      }).catch(() => {
        next()
      })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
