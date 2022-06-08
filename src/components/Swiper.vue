<template>
  <div
    class="swiper"
    :style="{height:height}"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- 图片内容 -->
    <ul class="swiper-slide" :style="slideStyle" ref="slide">
      <li
        class="swiper-item"
        v-for="(item, index) in list"
        :key="index"
        :style="{width: itemWidth + 'px'}"
        @click="handleClick(item)"
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
          autoPlayDelay: 4000, // 轮播间隔时间
          autoPlay: true // 是否自动播放
        }
      }
    }

  },
  data () {
    return {
      slideStyle: { width: '7.5rem' },
      itemWidth: 375, // 单张图片的宽度
      // 当前轮播图索引 显示哪张和指示器变化
      nowIndex: 0,
      timer: null, // setTimeout定时器id
      touchStart: {}, // 触摸开始位置
      touchEnd: {} // 触摸结束位置
    }
  },
  methods: {
    // copyslide () {
    //   const { slide } = this.$refs
    //   const children = this.$refs.slide.children
    //   const firstChildren = children[0].cloneNode(true)
    //   const lastChildren = children[children.length - 1].cloneNode(true)
    //   // 最前面追加
    //   slide.prepend(lastChildren)
    //   // 加到最后面
    //   slide.appendChild(firstChildren)
    //   console.log(this.$refs.slide)
    // },
    // 计算slide宽度
    calcWidth () {
      this.$nextTick(() => {
        // 一张图片的宽度
        this.itemWidth = document.body.clientWidth
        const length = this.list.length
        this.slideStyle.width = this.itemWidth * length + 'px'
      })
    },
    // 右边移动
    move () {
      this.slideStyle.transform = `translateX(-${this.itemWidth * this.nowIndex}px)`
      this.slideStyle.transition = 'transform 1s ease'
    },
    // autoMove自动轮播
    autoMove () {
      // seTtimeout模拟setInterval
      const run = () => {
        this.timer = setTimeout(() => {
          // 当前显示的轮播索引
          this.nowIndex++
          // 如果已经播放到最后一张，需要设置成0
          if (this.nowIndex > this.list.length - 1) {
            this.nowIndex = 0
          }
          this.move()
          run()
        }, this.options.autoPlayDelay)
      }
      // 是否自动播放 轮播间隔时间大于0
      if (this.options.autoPlay && this.options.autoPlayDelay > 0) {
        run()
      }
    },

    // 停止自动轮播
    pauseMove () {
      if (this.options.autoPlay) {
        this.timer && clearTimeout(this.timer)
        this.timer = null
      }
    },
    // touchstart事件
    onTouchStart (e) {
      // 开始触摸点信息
      this.touchStart = e.changedTouches[0]
      this.pauseMove()
    },
    onTouchEnd (e) {
      // 结束触摸点信息
      this.touchEnd = e.changedTouches[0]
      // 左滑还是右滑
      if (this.touchEnd.clientX - this.touchStart.clientX > 30) {
        this.nowIndex--
        if (this.nowIndex < 0) {
          this.nowIndex = this.list.length - 1
        }
      } else if (this.touchEnd.clientX - this.touchStart.clientX < -30) {
        this.nowIndex++
        if (this.nowIndex > this.list.length - 1) {
          this.nowIndex = 0
        }
      }
      this.move()
      this.autoMove()
    },
    handleClick (item) {
      this.$emit('click', item)
    }
  },
  mounted () {
    // this.copyslide()
    this.calcWidth()
    this.autoMove()
    window.addEventListener('resize', this.calcWidth)
  },
  destroyed () {
    this.pauseMove()
    window.removeEventListener('resize', this.calcWidth)
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  overflow: hidden;
  position: relative;
  &-slide{
    height: 100%;
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
