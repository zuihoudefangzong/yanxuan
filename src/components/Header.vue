<template>
  <div class="header">
    <div class="home" @click="$router.push('/')">
      <i class="iconfont icon-shouye"></i>
    </div>
    <img class="logo" src="../assets/img/logo.png" alt />
    <div class="search">
      <i class="iconfont icon-icon-test" @click="$router.push('/search')"></i>
      <i class="iconfont icon-gouwuchekong" @click="$router.push('/cart')"></i>
      <span class="cart-num" v-if="cartNum > 0">{{cartNum}}</span>
    </div>
  </div>
</template>

<script>
// cookie该接口能获取购物车数量和userinfo
import { API_CART_NUM } from '../views/api.config'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'NavHeader',
  computed: {
    // cartNum () {
    //   return this.$store.state.cartNum
    // },
    ...mapState(['cartNum'])
  },
  methods: {
    ...mapMutations(['initCartNum', 'setUserinfo']),
    async getCartNum () {
      const res = await this.$axios.get(API_CART_NUM)
      if (res) {
        this.setUserinfo(res.user)
        this.initCartNum(res.num)
      } else {
        this.initCartNum(0)
        this.setUserinfo(null)
      }
    }
  },
  created () {
    this.getCartNum()
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  width: 100%;
  padding: 0 0.3rem;
  height: 1rem;
  box-sizing: border-box;
  background-color: $colorA;
  .logo {width: 2rem;  padding: .2rem 0;}
  .iconfont {
    font-size: 0.56rem;
  }
  .icon-icon-test {
    margin-right: 0.1rem;
  }
  .cart-num {
    position: absolute;
    width: .36rem;
    height: .36rem;
    line-height: 0.36rem;
    top: .1rem;
    right: .1rem;
    text-align: center;
    background-color: $colorB;
    color: $colorA;
    border-radius: 50%;
  }
}
</style>
