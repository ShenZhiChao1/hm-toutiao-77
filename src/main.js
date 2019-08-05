import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'
// 把router组件挂在到main.js中
import router from '@/router'
// 把axios挂载到main.js中
import axios from '@/api'
import myCom from '@/components/my-bread'
Vue.prototype.$http = axios
Vue.use(myCom)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router, // 记得在Vue.use中一定要加逗号
  render: h => h(App)
}).$mount('#app')
