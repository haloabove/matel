import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import TableView from '@/views/TableView.vue'
import Statistics from '@/views/Statistics.vue'
import AboutView from '@/views/AboutView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: TableView
  },
  {
    path: '/statistics-view',
    name: 'statistics-view',
    component: Statistics
  },
  {
    path: '/about',
    name: 'about',

    component: AboutView
  },

]

const router = new VueRouter({
  routes
})

export default router
