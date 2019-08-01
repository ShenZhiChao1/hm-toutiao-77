import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'

Vue.use(VueRouter)
const router = new VueRouter({
  // name的作用给当前路由取名字。
  routes: [
    {

      path: '/login', name: 'login', component: Login
    }
  ]
})
// 导出router
export default router
