import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    name:'toolbar',
    component: () => import('../views/ToolbarView.vue'),
    children: [
      {
        path:'/login',
        name:'login',
        component: () => import('../views/LoginView.vue')
      },
      {
        path: '/',
        name: 'home',
        component: () => import('../views/ProductView.vue'),
      },
      {
        path:'/chart',
        name:'chart',
        component: () => import('../views/CartView.vue')
      },
      {
        path:'/product',
        name:'product',
        component: () => import('../views/ProductManage.vue')
      },
      {
        path:'/order',
        name:'order',
        component: () => import('../views/OrderManage.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
