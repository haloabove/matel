import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { LayoutPlugin, TablePlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(TablePlugin)
Vue.use(LayoutPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
