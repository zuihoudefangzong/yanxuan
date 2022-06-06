import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// project init后 reset css
import './assets/css/reset.css'
// mobile 1px border问题
import './assets/css/border.css'
// rem适配方案
import './assets/js/rem.js'
// 引入字体图标
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
