import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/ordercheck',
      name: 'Ordercheck',
      component: () => import('../views/ordercheck.vue'),

    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/test.vue')
    },
    {
      path: '/loginpage',
      name: 'LoginPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/order',
      name: 'order',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/order.vue')
    },
    {
      path: '/overview',
      name: 'Overview',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GoodsOverview.vue')
    },
    {
      path: '/',
      name: 'wechatLogin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/wechatLogin.vue')
    },
    {
      path: '/selectconfigure/:id/:configure',
      name: 'SelectConfigure',
      component: () => import('../views/SelectConfigure.vue'),
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('../views/pay.vue'),
    },
  ]
})

export default router
