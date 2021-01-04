import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
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
        component: Home,
        meta: {
          title: '黑马头条管理系统'
        }
      },
      {
        path: '/article',
        name: 'article',
        component: Article,
        meta: {
          title: '文章管理-黑马头条管理系统'
        }
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish,
        meta: {
          title: '发布文章-黑马头条管理系统'
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
