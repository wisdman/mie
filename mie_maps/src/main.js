import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import VueRouter from 'vue-router'
//import { VueHammer } from 'vue2-hammer'
import 'pinch-zoom-element/dist/pinch-zoom.js'

import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'

import Modal from './components/Modal.vue'

Vue.config.productionTip = false

Vue.use(Element)
Vue.use(VueRouter)
//Vue.use(VueHammer)


const routes = [
  { path: '/detail/:id', component: Modal, props: { dialogVisible: true }  },
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
