/*
 * @Author: kasuie
 * @Date: 2024-05-06 14:27:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-12 20:00:58
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { storage } from '@kasuie/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/status',
      name: 'status',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/status')
    },
    {
      path: '/log',
      name: 'log',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/log')
    },
    {
      path: '/signin',
      name: 'signin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/signin')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const login = storage.l.get('login')
  if (login || to.name == 'signin') {
    next()
  } else {
    next('/signin')
  }
})

export default router
