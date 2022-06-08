
<template>
  <div class="v-carousel" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="v-carousel-list" :style="{ height: height }">
      <slot></slot>
    </div>
    <ul class="v-carousel-dots">
      <li
        class="v-carousel-dot"
        :class="{ active: currentIndex === index }"
        v-for="(item, index) in carouselItems"
        :key="index"
        @click="handleDot(index)"
      ></li>
    </ul>
    <button class="v-carousel-arrow arrow-prev" @click="handleArrowPrev"></button>
    <button class="v-carousel-arrow arrow-next" @click="handleArrowNext"></button>
  </div>
</template>

<script>
const reflow = element => element.offsetHeight

export default {
  name: 'VCarousel',
  props: {
    height: String,
    initialIndex: {
      type: Number,
      default: 0
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      carouselItems: [],
      timer: null,
      // 当前轮播图索引 显示哪张和指示器激活
      currentIndex: this.initialIndex,
      isAnimate: false,
      direction: '',
      $fromItem: null,
      $toItem: null
    }
  },
  methods: {
    // 根本不需要去计算每个子元素的序号以及对应的顺序变化
    // 自始至终我们看到的都是两个子元素的移动效果
    // 只需要给这两个移动中的元素添加对应的样式即可
    // getPrevIndex上一张 getNextIndex下一张
    getPrevIndex () {
      return (
        (this.currentIndex - 1 + this.carouselItems.length) %
        this.carouselItems.length
      )
    },
    getNextIndex () {
      return (this.currentIndex + 1) % this.carouselItems.length
    },
    initCarousel () {
      this.carouselItems = this.$children.filter(
        item => item.$options.name === 'VCarouselItem'
      )
      // 找到所有轮播图carousel-list
      // 根据当前要显示的轮播图索引  显示对应的轮播图
      this.carouselItems.forEach((item, index) => {
        if (this.initialIndex === index) {
          item.$el.classList.add('active')
        }
      })
    },
    resetCarousel () {
      const callback = () => {
        this.$fromItem.setAttribute('class', 'v-carousel-item')
        this.$toItem.setAttribute('class', 'v-carousel-item active')
        this.$fromItem.removeEventListener('transitionend', callback, false)
        this.isAnimate = false
      }
      this.$fromItem.addEventListener('transitionend', callback, false)
    },
    moveCarousel () {
      const type = this.direction === 'left' ? 'next' : 'prev'
      this.$toItem.setAttribute('class', `v-carousel-item ${type}`)
      reflow(this.$toItem)
      // 给这两个移动中的元素添加对应的样式
      this.$fromItem.setAttribute('class', `v-carousel-item active ${this.direction}`)
      this.$toItem.setAttribute('class', `v-carousel-item ${type} ${this.direction}`)
      // 动画效果transitionend事件监听 再改变css
      // 这不就是vue的tranisition动画?
      this.resetCarousel()
    },
    setCarousel (toIndex, direction) {
      if (!this.isAnimate) {
        // 轮播开始节流锁isAnimate 正在轮播
        this.isAnimate = true
        // 找到当前显示的轮播图dom
        this.$fromItem = this.carouselItems[this.currentIndex].$el
        // 要准备显示的轮播图的dom
        this.$toItem = this.carouselItems[toIndex].$el
        // 确定轮播方向
        this.direction = direction
        // 显示轮播的索引改变
        this.currentIndex = toIndex
        // 开始移动
        this.moveCarousel()
      }
    },
    playCarousel () {
      if (this.autoplay && !this.timer) {
        this.timer = setInterval(() => {
          this.setCarousel(this.getNextIndex(), 'left')
        }, this.interval)
      }
    },
    pauseCarousel () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    handleDot (index) {
      if (this.currentIndex !== index) {
        const direction = this.currentIndex > index ? 'right' : 'left'
        this.setCarousel(index, direction)
      }
    },
    handleArrowPrev () {
      this.setCarousel(this.getPrevIndex(), 'right')
    },
    handleArrowNext () {
      this.setCarousel(this.getNextIndex(), 'left')
    },
    handleMouseEnter () {
      if (this.autoplay) {
        this.pauseCarousel()
      }
    },
    handleMouseLeave () {
      if (this.autoplay) {
        this.playCarousel()
      }
    }
  },
  mounted () {
    this.initCarousel()
    this.playCarousel()
  }
}
</script>
