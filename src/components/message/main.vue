<template>
  <!-- transition离开时候钩子函数afterleave的回调 -->
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div
      class="message"
      :class="{[`message--${ type }`]: true} "
      v-show="visible"
      :style="positionStyle"
      @mouseleave="startTimer"
      @mouseenter="clearTimer"
    >
    <!-- 由于message内容是通过slot形式从过来的 -->
    <slot v-if="message">
      <p v-if="!dangerouslyUseHTMLString" class="message__content">{{ message }}</p>
      <p v-else v-html="message" class="message__content"></p>
    </slot>
    <span
        class="close"
        v-if="showClose"
        @click="close"
      >
        <li-icon name="close"></li-icon>
    </span>
    </div>
  </transition>
</template>

<script>
import liIcon from '../icon/icon'
export default {
  name: 'LiMessage',
  components: { liIcon },
  // 这里为什么没用到props
  // 要经常在修改  不符合单向数据流
  data () {
    return {
      // 默认message显示
      visible: true,
      // 消息文本
      message: '',
      // 默认不渲染html
      dangerouslyUseHTMLString: false,
      // 距离视口top的高度
      verticalOffset: 20,
      // 是否显示关闭按钮 default false
      showClose: true,
      // 判断是否正在关闭了 点击关闭按钮会触发为true
      closed: false,
      // default 自动close time 3s
      duration: 3000,
      // timer定时器的关闭id
      timer: null,
      type: 'info'
    }
  },
  computed: {
    positionStyle () { return `top: ${this.verticalOffset}px` }
  },
  watch: {
    closed (newVal) {
      if (newVal) { this.visible = false }
    }
  },
  methods: {
    // 关闭message
    close () {
      this.closed = true
      // 先判断一下onclose是不是一个函数
      // if (typeof this.onClose === 'function') {
      //   // this 当前message实例
      //   this.onClose()
      // }
      // 换种方式结合也行
      if (this.onClose && typeof this.onClose === 'function') {
        this.onClose()
      }
      // 至于组件的销毁 用transition离开时候钩子函数afterleave
    },

    // 真实销毁组件的函数
    // transition离开时候钩子函数afterleave的回调
    handleAfterLeave () {
      // this.$el.remove()
      // 当然调用$destroy()
      // 也触发 beforeDestroy 和 destroyed 的钩子。
      this.$destroy(true)
      // 从浏览器删除改dom元素
      this.$el.parentNode.removeChild(this.$el)
    },

    // 开始倒计时
    startTimer () {
      if (this.duration > 0) {
        if (!this.closed) {
          this.timer = setTimeout(() => {
            this.close()
          }, this.duration)
        }
      }
    },

    // 鼠标进来的时候
    clearTimer () {
      this.timer && clearTimeout(this.timer)
    }
  },
  mounted () {
    this.startTimer()
  }

}
</script>

<style lang="scss" scoped>
$border-info:#ebeef5;
$info-bg-color:#edf2fc;
// 过渡时间
.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

// 进来和离开的动画效果
.message-fade-enter,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.message{
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  border: 1px solid $border-info;
  background-color: $info-bg-color;
  border-radius: 4px;
  min-width: 380px;
  padding: 15px 15px 15px 20px;
  p {
    margin: 0;
  }
  .close {
    position: absolute;
    right: 10px;
    top:50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}

.message--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}

.message--success .message__content {
  color: #67c23a;
}

.message--warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
}

.message--warning .r-message__content {
  color: #e6a23c;
}

.message--error {
  background-color: #fef0f0;
  border-color: #fde2e2;
}

.message--error .message__content {
  color: #f56c6c;
}

.message--info .message__content {
  color: #909399;
}

</style>
