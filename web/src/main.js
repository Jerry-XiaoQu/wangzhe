import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// import style
import 'swiper/swiper-bundle.min.css'
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


Vue.config.productionTip = false

import './assets/scss/style.scss'
import router from './router'
import Card from './components/Card.vue'
Vue.component('m-card', Card)
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:3330/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
