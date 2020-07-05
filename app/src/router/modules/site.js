/**
 * 博客前台路由
 */

import Layout from '@/views/site/Layout'

const SiteRouter = [
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    children: [{
      path: '',
      name: 'siteIndex',
      component: () => import('@/views/site/index/index')
    }]
  },
  {
    path: '/archives/:id(\\d+)',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    children: [{
      path: '',
      name: 'siteArchives',
      component: () => import('@/views/site/archives/index')
    }]
  },
  {
    path: '/links',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    children: [{
      path: '',
      name: 'siteLinks',
      component: () => import('@/views/site/links/index')
    }]
  },
  {
    path: '/about',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    children: [{
      path: '',
      name: 'siteAbout',
      component: () => import('@/views/site/about/index')
    }]
  }
]

export default SiteRouter
