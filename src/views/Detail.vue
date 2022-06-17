<template>
    <div class="detail-container">
      <!-- 通用header -->
      <header-comp></header-comp>

      <div class="detail" v-if="detail">
        <swiper height="7.5rem" :list="pirUrls"></swiper>

        <!-- product info -->
        <div class="detail-info">
          <div class="name">{{detail.name}}</div>
          <div class="desc">{{detail.simpleDesc}}</div>
          <div class="price">
            <span class="activity">￥{{detail.activityPrice || detail.retailPrice}}</span>
          </div>
        </div>

        <!-- 商品参数 -->
        <div class="attrList" v-if="detail['attrList'] && detail['attrList'].length > 0">
          <p class="title">商品参数</p>
          <div class="attr-item" v-for="(item, index) in detail.attrList" :key="index">
            <span class="attr-name">{{item.attrName}}</span>
            <span class="attr-value">{{item.attrValue}}</span>
          </div>
        </div>

        <!-- 当前商品详情信息 后端渲染的html -->
        <div
          v-html="detail.itemDetail && detail.itemDetail.detailHtml"
        ></div>
      </div>

      <footer class="footer">
        <button
          class="btn-cart"
          @click="addCart"
        >加入购物车</button>
      </footer>

      <div class="loading-wrapper" v-show="visibleLoding"  >
        <loading></loading>
      </div>
    </div>
</template>

<script>
import {
  API_PRODUCT_DETAIL,
  API_USER_VERIFY,
  API_CART_ADD
}
from './api.config'
import HeaderComp from '../components/Header.vue'
import Swiper from '../components/Swiper.vue'
import Loading from '../components/Loading.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'Detail',
  components: { HeaderComp, Swiper, Loading },
  data () {
    return {
      pirUrls: [],
      detail: [],
      visibleLoding: false
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      // console.log(this.$route.params.id)
      try {
        this.visibleLoding = true
        const res = await this.$axios.get(
          API_PRODUCT_DETAIL,
          {
            params: { id: this.$route.params.id }
          }
        )
        this.detail = res
        // 过滤图片
        for (const key in res.itemDetail) {
          if (key.startsWith('picUrl')) {
            this.pirUrls.push(res.itemDetail[key])
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.visibleLoding = false
      }
    },
    ...mapMutations(['setCartNum']),
    async addCart () {
      const user = await this.$axios.get(API_USER_VERIFY)
      if (!user) {
        this.$toast({
          msg: '请先登录',
          btnShow: true,
          callback: () => {
            this.$router.push('/profile/login')
          }
        })
      } else {
        await this.$axios.post(API_CART_ADD, {
          id: this.detail.id,
          name: this.detail.name,
          price: this.detail.activityPrice || this.detail.retailPrice,
          pic: this.detail.itemDetail.picUrl1
        })
        // console.log(res)
        this.setCartNum(1)
        this.$toast('加入成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  margin-top: 1rem;
  margin-bottom: .78rem;
  background-color: $colorA;
  &-info {
    background-color: $colorA;
    padding: 0.1rem;
    .name {
      font-size: $fontD;
      color: $colorC;
      font-weight: 700;
    }
    .desc {
      color: $colorD;
    }
    .price {
      color: $colorB;
      font-size: $fontC;
    }
  }
  .attrList {
    margin: 0.2rem 0;
    .title { text-align: center;}
    .attr-item {
      display: flex;
      border-top: 1px dotted #ccc;
      padding: 0.1rem;
      .attr-name {
        // 占一份
        flex: 1;
        color: $colorD;
      }
      .attr-value {
        // 占3份
        flex: 3;
        margin-left: 1.12rem;
      }
    }
  }
}
.footer {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;

  // background-color: orange;
  border-top: 1px solid $colorD;
  .btn-cart {
    width: 100%;
    height: 100%;
    padding: 10px 0;
    background-color: $colorB;
    color: $colorA;
    border: none;
    outline: none;
  }
}
.loading-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(153, 153, 153, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
