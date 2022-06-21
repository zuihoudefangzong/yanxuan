<template>
  <div class="my-order">
    <header class="header" @click="goBack">返回</header>

    <div v-if="orderList.length === 0" class="empty">
      <img src="../assets/img/cart-empty.webp" alt />
      <div>去添加点什么吧</div>
    </div>
    <div v-else class="order-container">
      <div
        v-for="order in orderList"
        :key="order._id"
        class="order-list"
      >
        <div>订单编号：{{order.orderNo}}</div>
        <ul>
          <li
            v-for="product in order.list"
            :key="product._id"
            class="item"
          >
            <img :src="product.pic" class="pic">
            <div class="detail">
              <div class="name">{{product.name}}</div>
              <div class="info">
                <div class="price">￥{{product.price}}</div>
                <div class="num">&times;{{product.num}}</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="total">总价：￥{{order.total}}</div>
      </div>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import { API_ORDER_GET } from './api.config.js'
import NavFooter from '../components/NavFooter.vue'
export default {
  components: { NavFooter },
  data () {
    return {
      orderList: []
    }
  },
  methods: {
    _getOrderList () {
      this.$axios(API_ORDER_GET)
        .then(res => {
          // console.log(res)
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
.empty {
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  img {
    width: 2.2rem;
    height: 2.2rem;
  }
}

.order-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  .order-list {
    background-color: $colorA;
    margin-top: .2rem;
    padding: .2rem;
    .item {
      // .item左右布局
      display: flex;
      align-items: center;
      padding: 0.2rem 0;
      border-top: 1px solid $colorE;
      .pic {
        width: 1.56rem;
        height: 1.56rem;
        margin: 0 0.2rem;
        border-radius: 0.06rem;
      }
      .detail {
        flex: 1;
        .name {
          font-size: $fontB;
          color: $colorC;
          font-weight: 700;
        }
        .info {
          // .info左右布局
          display: flex;
          align-items: center;
          .price {
            flex: 1;
          }
          .num {
            flex: 3;
          }
        }
      }
    }
  }
}

.total{
  text-align: right;
  border-top: 1px solid $colorE;
  color: $colorB;
  padding: .1rem .1rem 0 0;
}
</style>
