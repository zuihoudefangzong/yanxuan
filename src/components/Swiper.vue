<template>
  <div class="swiper" :style="{height:height}">
    <!-- 图片内容 -->
    <ul class="swiper-slide" :style="slideStyle">
      <li
        class="swiper-item"
        v-for="(item, index) in list"
        :key="index"
        :style="{width: itemWidth + 'px'}"
      >
        <img :src="item">
      </li>
    </ul>
    <!-- 分页器内容 -->
    <ul class="swiper-dots" v-if="options.showDots">
      <li
        class="dots-item"
        v-for="(item, index) in list"
        :key="index"
        :class="{active: nowIndex === index}"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    // 轮播图的高度height
    height: {
      type: String,
      default: '3rem'
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    // 其他选项
    options: {
      type: Object,
      default () {
        return {
          showDots: true, // 是否显示分页器
          interval: 3000, // 轮播间隔时间
          autoplay: true // 是否自动播放
        }
      }
    }

  },
  data () {
    return {
      slideStyle: { width: '7.5rem' },
      itemWidth: 375, // 单张图片的宽度
      nowIndex: 3

    }
  },
  methods: {
    // 计算slide宽度
    calcWidth () {
      this.$nextTick(() => {
        // 一张图片的宽度
        this.itemWidth = document.body.clientWidth
        const length = this.list.length
        this.slideStyle.width = this.itemWidth * length + 'px'
      })
    }
  },
  mounted () {
    this.calcWidth()
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  overflow: hidden;
  position: relative;
  &-slide{
    height: 100%;
    transition: transform 1s ease;
    .swiper-item {
      list-style: none;
      height: 100%;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  &-dots{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.16rem;
    .dots-item {
      background: $colorA;
      width: .4rem;
      height: .04rem;
      margin: 0 .04rem;
      opacity: .4;
      float: left;
      &.active{ opacity: 1;}
    }
  }
}
</style>
