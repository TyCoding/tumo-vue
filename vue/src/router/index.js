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

    {
        path: '/search/:qu',
        component: SiteLayout,
        name: 'search',
        hidden: true,
        children: [{
            path: '/search/:qu',
            component: () => import('@/site/search/index')
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
        path: 'github',
        component: Layout,
        children: [
            {
                path: 'https://github.com/TyCoding/tumo-vue',
                meta: {title: 'github', icon: 'github'}
            }
        ]
    },

    {
        path: '/admin/doc',
        component: Layout,
        name: 'doc',
        meta: {
            title: 'doc',
            icon: 'doc'
        },
        children: [
            {
                path: 'api',
                name: 'api',
                component: () => import('@/views/doc/API'),
                meta: {title: 'api', icon: 'api'}
            },
            {
                path: 'router',
                component: () => import('@/views/doc/Router'),
                name: 'router',
                meta: {title: 'router', icon: 'router'}
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
                path: '',
                name: 'comments',
                component: () => import('@/views/comments/index'),
                meta: {title: 'comments', icon: 'wechat'}
            }
        ]
    },

    {
        path: '/admin/cover',
        component: Layout,
        children: [
            {
                path: '',
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
                path: '',
                name: 'links',
                component: () => import('@/views/links/index'),
                meta: {title: 'links', icon: 'link'}
            }
        ]
    },

    {
        path: '/admin/tags',
        component: Layout,
        children: [
            {
                path: '',
                name: 'tags',
                component: () => import('@/views/tags/index'),
                meta: {title: 'tags', icon: 'tags'}
            }
        ]
    },

    {
        path: '/admin/file',
        component: Layout,
        name: 'file',
        meta: {
            title: 'file',
            icon: 'tools'
        },
        children: [
            {
                path: 'os',
                component: () => import('@/views/file/OS'),
                name: 'os',
                meta: {title: 'os', icon: 'cloud'}
            },
            {
                path: 'localOS',
                component: () => import('@/views/file/LocalOS'),
                name: 'localOS',
                meta: {title: 'localOS', icon: 'localyun'}
            }
        ]
    },

    {
        path: '/admin/system',
        component: Layout,
        children: [
            {
                path: '',
                name: 'system',
                component: () => import('@/views/system/index'),
                meta: {title: 'system', icon: 'system'}
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
