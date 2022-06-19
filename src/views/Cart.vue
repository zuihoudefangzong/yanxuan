<template>
  <div class="container">
    <header>
      <h2>购物车</h2>
    </header>

    <div v-if="cartLength === 0" class="empty">
      <img src="../assets/img/cart-empty.webp" alt />
      <div>去添加点什么吧</div>
    </div>

    <div v-else>
      <div
        v-for="item in cartDetail"
        :key="item.productId"
        class="item"
      >
        <input type="checkbox">
        <img class="pic" :src="item.pic">
        <div class="detail">
          <div class="name">{{item.name}}</div>
          <div class="info">
            <div class="price">￥{{item.price}}</div>
            <div class="select-num">
              <span class="label less">-</span>
              <input
                type="text"
                class="label num"
                v-model="item.num">
              <span class="label more">+</span>
            </div>
          </div>
        </div>
         <i class="iconfont icon-shanchu1"></i>
      </div>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import {
  API_USER_VERIFY, API_CART_DETAIL
} from './api.config'
import NavFooter from '../components/NavFooter.vue'
export default {
  name: 'Cart',
  components: { NavFooter },
  data () {
    return {
      cartDetail: []
    }
  },
  computed: {
    cartLength () {
      return this.cartDetail.length
    }
  },
  methods: {
    async userVerify () {
      try {
        const user = await this.$axios.get(API_USER_VERIFY)
        if (!user) {
          this.$toast(
            {
              btnShow: true,
              msg: '请登录',
              callback: () => {
                this.$router.pusg('/profile/login')
              }
            }
          )
        }
      } catch (error) {

      } finally {

      }
    },
    async _getCartDetail () {
      try {
        const res = await this.$axios.get(API_CART_DETAIL)
        this.cartDetail = res
      } finally {

      }
    }
  },
  created () {
    this.userVerify()
    this._getCartDetail()
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 1.94rem;
  left: 0;
  right: 0;
  background-color: $colorE;
  overflow-y: scroll;
}

header {
  h2 {
    font-size: $fontD;
    background-color: $colorA;
    color: $colorC;
  }
}

.empty {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  img {
    width: 2.2rem;
    height: 2.2rem;
  }
}
.item {
  display: flex;
  margin-top: .2rem;
  background-color: $colorA;
  align-items: center;
  padding: 0.2rem;
  // .item下面只有4个子元素
  // pic图片定宽
  .pic {
    width: 1.56rem;
    height: 1.56rem;
    margin: 0 0.2rem;
    border-radius: 0.06rem;
  }
  // .detail占完剩余部分
  .detail {
    flex: 1;
    .name {
      font-size: $fontB;
      color: $colorC;
      font-weight: 700;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        flex: 1;
        color: $colorB;
        font-size: $fontC;
      }
      .select-num {
        width: 1.5rem;
        height: 0.46rem;
        line-height: 0.46rem;
        border: 1px solid $colorD;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: .2rem;
        .label {
          width: 0.5rem;
          text-align: center;
        }
        .num { border: none; outline: none;}
        .less { border-right: 1px solid $colorD;}
        .more {border-left: 1px solid $colorD; }
      }
    }
  }
  .icon-shanchu1 {
    padding: 0.2rem;
  }
}
</style>
