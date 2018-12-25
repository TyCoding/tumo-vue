import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth' // 验权

const whiteList = ['/login','/','/index','/about'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'})
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then(res => { // 拉取用户信息
                    next()
                }).catch((err) => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || 'Verification failed, please login again')
                        next({path: '/'})
                    })
                })
            } else {
                next()
            }
        }
    } else { //若vuex中没有查询到用户登录信息
        //设计：博客前端所有请求都是走的根路径，比如：localhost:8080  localhost:8080/about localhost:8080/article/1
        //     而博客后台管理路径全都是走 localhost:8080/admin/ 路径下，比如 localhost:8080/admin/links  localhost:8080/admin/cover
        if (to.path.substring(1, to.path.indexOf('/', to.path.indexOf('/') + 1)) != 'admin') {
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            NProgress.done()
        }
        /*console.log(to.path.substring(1, to.path.indexOf('/', to.path.indexOf('/') + 1)));
        if (whiteList.indexOf(to.path) !== -1) { //判断访问的path是否包含在白名单中
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            NProgress.done()
        }*/
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
