import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import SiteLayout from '../site/layout/Layout'

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

    //====================index======================
    {
        path: '/',
        component: SiteLayout,
        name: 'index',
        hidden: true,
        redirect: '/index',
        children: [{
            path: '/',
            component: () => import('@/site/index')
        }]
    },

    {
        path: '/page/:cp',
        component: SiteLayout,
        name: 'page',
        hidden: true,
        children: [{
            path: '/page/:cp',
            component: () => import('@/site/index')
        }]
    },

    {
        path: '/article/:id',
        component: SiteLayout,
        name: 'detail',
        hidden: true,
        children: [{
            path: '/article/:id',
            component: () => import('@/site/detail/index')
        }]
    },

    {
        path: '/archives',
        component: SiteLayout,
        name: 'archives',
        hidden: true,
        children: [{
            path: '/archives',
            component: () => import('@/site/archives/index')
        }]
    },

    {
        path: '/links',
        component: SiteLayout,
        name: 'links',
        hidden: true,
        children: [{
            path: '/links',
            component: () => import('@/site/links/index')
        }]
    },

    {
        path: '/about',
        component: SiteLayout,
        name: 'about',
        hidden: true,
        children: [{
            path: '/about',
            component: () => import('@/site/about/index')
        }]
    },




    //====================admin======================
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
        path: '/admin',
        component: Layout,
        redirect: '/admin/dashboard',
        name: 'Dashboard',
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
        path: '/admin/article',
        component: Layout,
        redirect: '/admin/article/list',
        name: 'Article',
        meta: {
            title: 'article',
            icon: 'menu'
        },
        children: [
            {
                path: 'create',
                component: () => import('@/views/article/create'),
                name: 'CreateArticle',
                meta: {title: 'createArticle', icon: 'edit'}
            },
            {
                path: 'edit/:id(\\d+)',
                component: () => import('@/views/article/edit'),
                name: 'EditArticle',
                meta: {title: 'editArticle', noCache: true},
                hidden: true
            },
            {
                path: 'list',
                component: () => import('@/views/article/list'),
                name: 'ArticleList',
                meta: {title: 'articleList', icon: 'list'}
            }
        ]
    },

    {
        path: '/admin/comments',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'comments',
                component: () => import('@/views/comments/index'),
                meta: {title: 'comments', icon: 'message'}
            }
        ]
    },

    {
        path: '/admin/cover',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'cover',
                component: () => import('@/views/cover/index'),
                meta: {title: 'cover', icon: 'img'}
            }
        ]
    },

    {
        path: '/admin/links',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'links',
                component: () => import('@/views/links/index'),
                meta: {title: 'links', icon: 'links'}
            }
        ]
    },

    {
        path: '/file',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'file',
                component: () => import('@/views/file/index'),
                meta: {title: 'file', icon: 'upload'}
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

    {path: '*', redirect: '/404', hidden: true},


]

export default new Router({
    mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap,
})
