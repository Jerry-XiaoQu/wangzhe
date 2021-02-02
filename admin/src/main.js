import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

import './style.css'
Vue.use(ElementUI) //使用elementUI

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
