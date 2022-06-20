import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Categroy',
    component: () => import('../views/Category.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/Login.vue')
      },
      {
        path: 'regist',
        name: 'Regist',
        component: () => import('../views/Regist.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/cateDetail/:cateId/:subId',
    name: 'CategoryDetail',
    component: () => import('../views/CategoryDetail.vue')
  },
  {
    path: '/order/:orderNo',
    name: 'Order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/myOrder',
    name: 'MyOrder',
    component: () => import('../views/MyOrder.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
