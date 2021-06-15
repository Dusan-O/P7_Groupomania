import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Inscription.vue'
import Connect from '../views/Connexion.vue'
import Appli from '../views/Application.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/inscription',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/connexion',
    name: 'Connect',
    component: Connect
  },
  {
    path: '/app/:id',
    name: 'Application',
    component: Appli
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router