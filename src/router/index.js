import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/:id',
    name: 'article',
    props: true,
    component: () => import('@/views/Article.vue')
  },
  {
    path: '*',
    name: 'page404',
    component: () => import('@/views/PageNotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
