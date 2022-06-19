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
        <input
          type="checkbox"
          v-model="item.checked"
          @change="toggleCheckOne(item)">
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

    <!-- 全选按钮 -->
    <div class="footer">
      <div class="checkall">
        <input
          type="checkbox"
          class="check-all">
          <span class="checked">已选({{checkNum}})</span>
      </div>
      <div class="total">合计: ￥{{total}}</div>
      <div class="confirm">下单</div>
    </div>

    <nav-footer></nav-footer>

    <div class="loading-wrapper" v-show="visibleLoding"  >
      <loading></loading>
    </div>
  </div>
</template>

<script>
import {
  API_USER_VERIFY,
  API_CART_DETAIL,
  API_CART_UPDATE
} from './api.config'
import NavFooter from '../components/NavFooter.vue'
import Loading from '../components/Loading'
export default {
  name: 'Cart',
  components: { NavFooter, Loading },
  data () {
    return {
      cartDetail: [],
      visibleLoding: false,
      // checkNum: 0, // 已选商品数量
      total: 5 // 合计总价
    }
  },
  computed: {
    cartLength () {
      return this.cartDetail.length
    },
    checkNum () {
      return this.cartDetail.reduce((sum, product) => {
        if (product.checked) {
          sum += product.num
        }
        return sum
      }, 0)
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
        this.visibleLoding = true
        const res = await this.$axios.get(API_CART_DETAIL)
        this.cartDetail = res
      } finally {
        this.visibleLoding = false
      }
    },
    async updateCart (item) {
      await this.$axios.post(API_CART_UPDATE, item)
    },
    toggleCheckOne (item) {
      this.updateCart(item)
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

.footer {
  position: fixed;
  bottom: .97rem;
  left: 0;
  width: 100%;
  display: flex;
  align-content: center;
  height: 1rem;
  background-color: $colorA;
  align-items: center;
  .check-all {
    margin: 0 .2rem;
  }
  .checked {
    padding: 0 0.2rem;
  }
  .total {
    flex: 1;
    margin-right: 0.2rem;
    text-align: right;
    color: $colorB;
  }
  .confirm {
    background-color: $colorB;
    height: 100%;
    width: 2.4rem;
    color: $colorA;
    text-align: center;
    line-height: 1rem;
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
