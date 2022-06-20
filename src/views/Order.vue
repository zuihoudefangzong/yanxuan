<template>
  <div>
    <header-comp></header-comp>
    <div class="order-detail" v-if="orderDetail && orderDetail.list">
      <div
        class="item"
        v-for="item in orderDetail.list"
        :key="item.productId"
      >
        <img :src="item.pic" class="pic">
        <div class="detail">
          <div class="name">{{item.name}}</div>
          <div class="price">￥{{item.price}}</div>
        </div>
      </div>

      <div class="footer">
        <div class="total">应付：￥{{orderDetail.total}}</div>
        <div class="confirm" @click="pay">去付款</div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  API_ORDER_DETAIL
} from './api.config'
import HeaderComp from '../components/Header'
export default {
  components: { HeaderComp },
  data () {
    return {
      orderDetail: null
    }
  },
  methods: {
    _getOrderDetail () {
      const { orderNo } = this.$route.params
      // 202206201459113909
      // console.log(orderNo)
      this.$axios.get(
        API_ORDER_DETAIL,
        { params: { orderNo } }
      ).then((res) => {
        console.log(res)
        this.orderDetail = res
      })
    },
    pay () {
      this.$toast({
        btnShow: true,
        msg: `请支付${this.orderDetail.total}元`,
        callback: () => {
          this.$toast({
            msg: '支付成功'
          })
        }
      })
    }
  },
  created () {
    this._getOrderDetail()
  }
}
</script>

<style lang="scss" scoped>
.order-detail {
  padding: 1rem 0 1.2rem 0;
  background-color: $colorE;
  box-sizing: border-box;
  height: 100vh;
  overflow: scroll;
  .item {
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    background-color: $colorA;
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
      .price {
        color: $colorB;
        font-size: $fontC;
      }
    }
  }
}

.footer {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: $colorA;
  height: 1.2rem;
  align-items: center;
  .total {
    flex: 1;
    text-align: right;
    color: $colorB;
    padding-right: .2rem;
  }
  .confirm {
    background-color: $colorB;
    height: 100%;
    color: $colorA;
    line-height: 1.2rem;
    width: 2.4rem;
    text-align: center;
  }
}
</style>
