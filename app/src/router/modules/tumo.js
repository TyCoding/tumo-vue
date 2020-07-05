/**
 * 博客后台路由
 */

import Layout from '@/layout'
const API_BASE = process.env.VUE_APP_API_BASE

const tumoRouter = [
  {
    path: '/tumo',
    component: Layout,
    redirect: '/tumo/index',
    children: [{
      path: 'index',
      name: 'tumoIndex',
      component: () => import('@/views/tumo/index/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/tumo/profile',
    component: Layout,
    redirect: '/tumo/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tumo/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: '', noCache: true }
      }
    ]
  },

  {
    path: '/tumo/article',
    component: Layout,
    name: 'tumoArticle',
    redirect: '/tumo/article/list',
    meta: {
      title: '文章管理',
      icon: 'form'
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/tumo/article/add'),
        name: 'tumoArticleAdd',
        meta: { title: '撰写文章', icon: '' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/tumo/article/edit'),
        name: 'tumoArticleEdit',
        meta: { title: '文章编辑', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/tumo/article/index'),
        name: 'tumoArticleList',
        meta: { title: '文章列表', icon: '' }
      }
    ]
  },

  {
    path: '/tumo/blog',
    component: Layout,
    name: 'tumoBlog',
    meta: {
      title: '博客管理',
      icon: 'filter'
    },
    children: [
      {
        path: 'category',
        component: () => import('@/views/tumo/blog/category/index'),
        name: 'tumoBlogCategory',
        meta: { title: '分类管理', icon: '' }
      },
      {
        path: 'tag',
        component: () => import('@/views/tumo/blog/tag/index'),
        name: 'tumoBlogTag',
        meta: { title: '标签管理', icon: '' }
      },
      {
        path: 'link',
        component: () => import('@/views/tumo/blog/link/index'),
        name: 'tumoBlogLink',
        meta: { title: '友链管理', icon: '' }
      },
      {
        path: 'comment',
        component: () => import('@/views/tumo/blog/comment/index'),
        name: 'tumoBlogComment',
        meta: { title: '评论管理', icon: '' }
      }
    ]
  },

  {
    path: '/tumo/setting',
    component: Layout,
    name: 'tumoSetting',
    meta: {
      title: '系统管理',
      icon: 'setting'
    },
    children: [
      {
        path: 'log',
        component: () => import('@/views/tumo/setting/log/index'),
        name: 'tumoSettingLog',
        meta: { title: '操作日志', icon: '' }
      },
      {
        path: 'qiniu',
        component: () => import('@/views/tumo/setting/qiniu/index'),
        name: 'tumoSettingQiniu',
        meta: { title: '七牛云', icon: '' }
      },
      {
        path: API_BASE + '/swagger-ui.html',
        name: 'tumoSettingSwagger',
        meta: { title: 'Swagger', icon: '' }
      }
    ]
  },
  {
    path: 'github',
    component: Layout,
    children: [
      {
        path: 'https://github.com/TyCoding',
        meta: { title: 'Github', icon: 'link' }
      }
    ]
  }
]

export default tumoRouter
