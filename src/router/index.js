import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sorpresa',
    name: 'sorpresa',
    component: () =>  import('../views/Sorpresa.vue'),
  },
  {
    path: '/tienda',
    name: 'tienda',
    component: () =>  import('../views/Tienda.vue'),
  },
  {
    path: '/coleccion',
    name: 'coleccion',
    component: () =>  import('../views/Coleccion.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
