<template>
  <div class="my-order">
    <header class="header" @click="goBack">返回</header>

    <div v-if="orderList.length === 0" class="empty">
      <img src="../assets/img/cart-empty.webp" alt />
      <div>去添加点什么吧</div>
    </div>
  </div>
</template>

<script>
import { API_ORDER_GET } from './api.config.js'
export default {
  data () {
    return {
      orderList: []
    }
  },
  methods: {
    _getOrderList () {
      this.$axios(API_ORDER_GET)
        .then(res => {
          console.log(res)
          this.orderList = res
        })
    },
    goBack () { this.$router.go(-1) }
  },
  created () {
    this._getOrderList()
  }
}
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $colorA;
  padding: 0 0.2rem;
  height: .88rem;
  line-height: 0.88rem;
}
</style>
