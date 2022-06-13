<template>
  <div class="item" v-if="item" @click="goDetail(item.id)">
    <img class="pic" :src="item.listPicUrl">
    <p class="desc">{{item.simpleDesc}}</p>
    <p class="name">{{item.name}}</p>
    <p class="price">￥{{item.activityPrice || 19.9}}</p>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    item: {
      type: Object,
      default () { return {} }
    }
  },
  methods: {
    goDetail (id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  width: 3.2rem;
  font-size: $fontA;
  padding-bottom: .4rem;
  .pic {background-color: $colorE; }
  .name {font-size: $fontB; padding: .1rem 0;}
  .desc {
    height: .7rem;
    line-height: .7rem;
    padding: 0 .1rem;
    background: #f0ebe2;
    color: #9e8962;
    // 单行文本溢出隐藏不换行显示...
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
  }
  .price {
    color: $colorB;
    font-size: $fontC;
  }
}
</style>
