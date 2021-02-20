import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录-黑马头条管理系统'
    }
  },
  {
    path: '/',
    // name: 'home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
          title: '黑马头条管理系统'
        }
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article'),
        meta: {
          title: '文章管理-黑马头条管理系统'
        }
      },
      {
        path: '/publish',
        name: 'publish',
        component: () => import('@/views/publish'),
        meta: {
          title: '发布文章-黑马头条管理系统'
        }
      },
      {
        path: '/image',
        name: 'image',
        component: () => import('@/views/image'),
        meta: {
          title: '素材管理-黑马头条管理系统'
        }
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/comment'),
        meta: {
          title: '评论管理-黑马头条系统'
        }
      },
      {
        path: '/fans',
        name: 'fans',
        component: () => import('@/views/fans'),
        meta: {
          title: '粉丝管理-黑马头条系统'
        }
      },
      {
        path: '/settings',
        name: 'setting',
        component: () => import('@/views/setting'),
        meta: {
          title: '个人设置-黑马头条系统'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
const whiteList = ['/login'] // 路由白名单
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  if (user) {
    // 判断是否登录
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 判断是否在白名单
      next()
    } else {
      next('/login')
    }
  }
})
export default router
