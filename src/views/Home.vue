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
    <swiper :list="bannerList" class="swiper" @click="swiperClick"></swiper>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '../components/NavFooter.vue'
import Swiper from '../components/Swiper.vue'
import { API_HOME, API_HOME_TOTAL_NUM } from './api.config'
export default {
  name: 'Home',
  components: { NavFooter, Swiper },
  data () {
    return {
      total: 0, // 当前商品总数
      bannerList: [
        // 'https://yanxuan.nosdn.127.net/e48cc1f908b359c891bb0152feb9e50e.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        // 'https://yanxuan.nosdn.127.net/9f40ca5a83a06ded9587124432471b67.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        // 'https://yanxuan.nosdn.127.net/7f762f223c3e320df8260c4b54879124.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        // 'https://yanxuan.nosdn.127.net/ef739c5f6ba97afbf201ee9d9b3eb16d.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        // 'https://yanxuan.nosdn.127.net/7d38ac617e6175f468140d326b7ebcda.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        // 'https://yanxuan.nosdn.127.net/e52ad10cfd0f24691c987006ef82a814.jpg?type=webp&imageView&quality=75&thumbnail=750x0'
      ],
      info: {}// 首页信息
    }
  },
  methods: {
    swiperClick (data) {
      console.log(data)
    },
    async getTotalNuns () {
      const total = await this.$axios.get(API_HOME_TOTAL_NUM)
      console.log(total)
    },
    async getHomeInfo () {
      const res = await this.$axios.get(API_HOME)
      this.info = res
      this.bannerList = res.focus.map(item => item.img)
    }
  },
  created () {
    this.getTotalNuns()
    this.getHomeInfo()
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
  background-color: $colorA;
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
.swiper {margin-top: 0.88rem;}
</style>
