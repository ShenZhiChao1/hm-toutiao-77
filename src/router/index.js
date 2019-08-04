import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Articles from '@/views/article'
import NOTFOUND from '@/views/404'
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
// 导出router
export default router
