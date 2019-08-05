import axios from 'axios'
import store from '@/store'
import router from '@/router'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 如果有 user 就去 加载没有就不携带token了
// if (store.getUser()) {}
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
axios.interceptors.request.use(
  config => {
    config.headers = {
      Authorization: `Bearer ${store.getUser().token}`
    }
    return config
  },
  error => {
    return Promise.rejeect(error)
  }
)
// 响应拦截器：在每次响应后 做某一些事情
axios.interceptors.response.use(
  res => {
    // 成功的时候做一些事情
    return res
  },
  err => {
    // 失败的时候做一些事情
    // 获取响应状态码 err对象包含响应对象  err.response
    // 响应对象中包含状态码  err.response.status
    if (err.response.status === 401) {
      // 跳转到登录页面 this.$router.push('/login')
      // 方式1：
      // $router.push('/login') 其实 地址栏改成  #/login
      // location.hash = '#/login'
      // 方式2：
      // 此时没有vue实例，$router对象获取不到，通过router实例直接使用
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default axios
