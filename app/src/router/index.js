import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    {path: '/404', component: () => import('@/views/404'), hidden: true},

    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },

    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
            }
        ]
    },

    {
        path: '/article',
        component: Layout,
        redirect: '/article/list',
        name: 'Article',
        meta: {
            title: 'Article',
            icon: 'list'
        },
        children: [
            {
                path: 'create',
                component: () => import('@/views/editor/create'),
                name: 'CreateArticle',
                meta: {title: '撰写文章', icon: 'edit'}
            },
            {
                path: 'edit/:id(\\d+)',
                component: () => import('@/views/editor/edit'),
                name: 'EditArticle',
                meta: {title: '修改文章', noCache: true},
                hidden: true
            },
            {
                path: 'list',
                component: () => import('@/views/editor/list'),
                name: 'ArticleList',
                meta: {title: '文章列表', icon: 'list'}
            }
        ]
    },

    {
        path: '/comments',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'comments',
                component: () => import('@/views/comments/index'),
                meta: {title: '评论管理', icon: 'message'}
            }
        ]
    },

    {
        path: '/cover',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'cover',
                component: () => import('@/views/cover/index'),
                meta: {title: '封面管理', icon: 'img'}
            }
        ]
    },

    {
        path: '/links',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'links',
                component: () => import('@/views/links/index'),
                meta: {title: '友链管理', icon: 'links'}
            }
        ]
    },

    {
        path: '/upload',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'upload',
                component: () => import('@/views/upload/index'),
                meta: {title: '文件管理', icon: 'upload'}
            }
        ]
    },


    {
        path: 'external-link',
        component: Layout,
        children: [
            {
                path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
                meta: {title: 'External Link', icon: 'link'}
            }
        ]
    },

    {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})
