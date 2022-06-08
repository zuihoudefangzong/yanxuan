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

    <!-- home开始 -->
    <!-- service信息 policy -->
    <div class="service-policy" v-if="info && info.commonConfigModule">
      <img :src="info.commonConfigModule.brandDescPicUrl" alt="">
    </div>

    <!-- 分类 -->
    <ul class="kingkong" v-if="info && info.kingKongAreaV4">
      <li
        class="kingkong-item"
        v-for="item in info.kingKongAreaV4.slice(0,10)"
        :key="item.title"
      >
        <img :src="item.picUrls[0]">
        <div class="title">{{item.title}}</div>
      </li>
    </ul>

    <!-- banner -->
    <!-- <div class="operation-cfg">
      <img :src="info.operationCfg" alt="">
    </div> -->

    <!-- 推荐商品 -->
    <div class="recommend" v-if="rcmdItemList.length > 0">
      <h2 class="recommend-title">严选推荐</h2>
      <div class="recommend-list">
        <product
          v-for="item in rcmdItemList.slice(5)"
          :key="item.id"
          :item="item.categoryItem"
        >
        </product>
      </div>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '../components/NavFooter.vue'
import Swiper from '../components/Swiper.vue'
import { API_HOME, API_HOME_TOTAL_NUM, API_HOME_RCMD } from './api.config'
import Product from '../components/Product.vue'
export default {
  name: 'Home',
  components: { NavFooter, Swiper, Product },
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
      info: {}, // 首页信息
      rcmdItemList: [] // 推荐商品列表
    }
  },
  methods: {
    swiperClick (data) {
      console.log(data)
    },
    async getTotalNuns () {
      const total = await this.$axios.get(API_HOME_TOTAL_NUM)
      this.total = total
    },
    async getHomeInfo () {
      const res = await this.$axios.get(API_HOME)
      this.info = res
      console.log(this.info)
      this.bannerList = res.focus.map(item => item.img)
    },
    async getRecommendInfo (lastItem = 0, size = 20) {
      const { rcmdItemList } = await this.$axios.post(
        API_HOME_RCMD,
        {
          lastItem,
          size
        }
      )
      this.rcmdItemList = rcmdItemList
    }
  },
  created () {
    this.getTotalNuns()
    this.getHomeInfo()
    this.getRecommendInfo()
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
.kingkong {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  &-item {
    width: 1rem;
    margin: 0.1rem 0.2rem;
    text-align: center;
    height: 1.56rem;
    box-sizing: border-box;
    font-size: $fontA;
    img {
      width: 100%;
    }
  }
}

.recommend{
  background: $colorA;
  margin-bottom: 0.97rem;
  &-title{
    text-align: center;
    padding: .2rem 0;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 .2rem;
  }
}
</style>
