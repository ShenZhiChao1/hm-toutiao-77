import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Articles from '@/views/article'
import NOTFOUND from '@/views/404'
import store from '@/store'
Vue.use(VueRouter)
const router = new VueRouter({
  // name的作用给当前路由取名字。
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // { path: '/home', name: 'home', component: Home },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/home', name: 'welcome', component: Welcome },
        {
          path: '/article',
          name: 'article',
          component: Articles
        }
      ]
    },

    {
      path: '*',
      name: '404',
      component: NOTFOUND
    }
  ]
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // // 1.判断是不是登录路由
  // if (to.path === '/login') return next()
  // // 2.判断是否登录
  // if (!store.getUser().token) return next('/login')
  // // 3.放行
  // next()
  // if (!store.getUser()) {
  //   var tok = null
  // } else {
  //   tok =store.getUser().token
  // }
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
// 导出router
export default router
