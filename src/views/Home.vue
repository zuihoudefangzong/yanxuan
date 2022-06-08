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

    <!-- home开始 -->
    <!-- 最外层固定height scroll加载 -->
    <div class="scroll-container" ref="scroll-container">
      <!-- 子元素溢出 -->
      <div class="scroll-inner" ref="scroll-inner">
        <!-- 轮播图 -->
        <swiper :list="bannerList" class="swiper" @click="swiperClick"></swiper>

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
              v-for="(item,index) in rcmdItemList.slice(5)"
              :key="index"
              :item="item.categoryItem"
            >
            </product>
          </div>
        </div>
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
      rcmdItemList: [], // 推荐商品列表
      scrollContainerHeight: null, // dom高度
      scrollInnerHeight: null,
      recommendHasMore: true
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
      this.bannerList = res.focus.map(item => item.img)
    },
    async getRecommendInfo (lastItem = 0, size = 20) {
      const { rcmdItemList, hasMore } = await this.$axios.post(
        API_HOME_RCMD,
        {
          lastItem,
          size
        }
      )
      this.recommendHasMore = hasMore
      // 合并数组
      this.rcmdItemList = this.rcmdItemList.concat(rcmdItemList)
    },

    // 触底加载
    initScroll () {
      const scrollTop = this.$refs['scroll-container'].scrollTop
      // 元素内容高度的度量，包括由于溢出导致的视图中不可见内容
      this.scrollInnerHeight = this.$refs['scroll-inner'].scrollHeight
      console.log(scrollTop + this.scrollContainerHeight, this.scrollInnerHeight)
      // 滚动了多少 +scrollContainerHeight 避免clientHeight四舍五入
      if (scrollTop + this.scrollContainerHeight + 1 >= this.scrollInnerHeight) {
        // console.log('触底了')
        if (this.recommendHasMore) {
          this.getRecommendInfo(this.rcmdItemList.length - 1)
        }
      }
    },

    // 防抖debouce应用 只执行最后一次
    // 用户停止后 才执行
    debounce (fn, delay) {
      // 该timer变量永远存在debounce函数中
      let timer = null
      return () => {
        // timer只有当前函数能访问到 闭包
        if (timer) {
          // 先取消上次的定时器
          clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
      }
    },
    // 节流 到达指定时间才执行复杂函数
    // 第一次马上执行 然后有冷却时间
    // 就是技能时间没到 不执行该复杂函数
    throttle (fn, delay) {
      let startTime = 0
      return () => {
        // startTime只有当前函数能访问到 闭包
        const nowTime = Date.now()
        if (nowTime - startTime > delay) {
          startTime = nowTime
          fn()
        }
      }
    }
  },
  created () {
    this.getTotalNuns()
    this.getHomeInfo()
    this.getRecommendInfo()
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollContainerHeight = this.$refs['scroll-container'].clientHeight
      // 防抖debounce已经调用执行 返回了一个匿名箭头函数
      this.$refs['scroll-container'].addEventListener('scroll', this.debounce(this.initScroll, 300))
      //  节流throttle已经调用执行 返回了一个匿名箭头函数
      // this.$refs['scroll-container'].addEventListener('scroll', this.throttle(this.initScroll, 5000))
    })
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
// better-scroll大致原理
.scroll{
  &-container {
    position: absolute;
    top: 0.88rem;
    left: 0;
    right: 0;
    bottom: 0.97rem;
    // 显示垂直方向的滚动条
    overflow-y: scroll;
    // overflow: hidden;
  }
}

.recommend{
  background: $colorA;
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
