import Vue from 'vue'
import VueRouter from 'vue-router'
import VistualView from '../views/VistualView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/vistualView',
    name: 'vistualView',
    component: VistualView
  },
  {
    path: '/',
    name: 'tabView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "TabView" */ '../views/TabView.vue')
  },
  {
    path: '/dialogView',
    name: 'dialogView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "DialogView" */ '../views/DialogView.vue')
  },
  {
    path: '/reView',
    name: 'reView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ReView" */ '../views/ReView.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
