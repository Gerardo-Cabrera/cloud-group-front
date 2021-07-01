import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/site/Dashboard.vue')
  },
  {
    path: '/registro-trabajador',
    name: 'registro-trabajador',
    component: () => import('@/views/trabajadores/Registro.vue')
  },
  {
    path: '/registro-puesto-laboral',
    name: 'registro-puesto-laboral',
    component: () => import('@/views/puestos-laborales/Registro.vue')
  },
  {
    path: '/perfil-trabajador',
    name: 'perfil-trabajador',
    component: () => import('@/views/trabajadores/Perfil.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
