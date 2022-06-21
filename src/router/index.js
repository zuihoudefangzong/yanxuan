import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/category',
    name: 'Categroy',
    component: () => import('../views/Category.vue'),
    meta: {
      keepAlive: true,
      title: '分类'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: 'regist',
        name: 'Regist',
        component: () => import('../views/Regist.vue'),
        meta: {
          title: '注册'
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/cateDetail/:cateId/:subId',
    name: 'CategoryDetail',
    component: () => import('../views/CategoryDetail.vue'),
    meta: {
      title: '分类详情'
    }
  },
  {
    path: '/order/:orderNo',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    meta: {
      title: '订单页面'
    }
  },
  {
    path: '/myOrder',
    name: 'MyOrder',
    component: () => import('../views/MyOrder.vue'),
    meta: {
      title: '我的订单'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
