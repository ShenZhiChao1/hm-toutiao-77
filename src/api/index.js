import axios from 'axios'
import store from '@/store'

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

export default axios
