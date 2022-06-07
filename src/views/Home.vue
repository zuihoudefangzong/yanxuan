<template>
  <div class="home">
    <header class="header">
      <div class="logo"></div>
      <div class="search" @click="$router.push('/search')">
        <i class="iconfont icon-icon-test"></i>
        <span class="placeholoder">搜索商品，共{{total}}款好物</span>
      </div>
      <div class="login">登录</div>
    </header>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '../components/NavFooter.vue'
export default {
  name: 'Home',
  components: { NavFooter },
  data () {
    return {
      total: 0// 当前商品总数
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.88rem;
  padding:  0 .33rem;
  box-sizing: border-box;
  .logo {
    // width: 1.38rem;
    width: 1.38rem;
    height: .4rem;
    background: url('../assets/img/logo.png') no-repeat;
    background-size: cover;
  }
  .search {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ededed;
    margin: 0 0.2rem;
    border-radius: .08rem;
    .iconfont {
      font-size: $fontB;
      color: $colorC;
      margin-right: .1rem;
    }
    .placeholoder {
      color: $colorF;
      font-size: $fontB;
    }
  }
  .login {
    width: 0.72rem;
    height: 0.38rem;
    line-height: 0.38rem;
    border: 1px solid $colorB;
    border-radius: 0.08rem;
    color: $colorB;
    font-size: $fontB;
    text-align: center;
  }
}
</style>
