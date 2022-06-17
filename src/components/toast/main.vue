<template>
  <transition @after-leave="handleAfterLeave">
    <!-- 遮罩层 -->
    <div class="container" v-show="visible">
      <div class="toast">
        <div class="msg">{{msg}}</div>
        <div class="btn" v-show="btnShow">
          <div class="btn-cancel" @click="cancel">取消</div>
          <div class="btn-confirm" @click="confirm">确认</div>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      // 是否显示toast
      visible: false,
      // 是否显示按钮group
      btnShow: false,
      // 回调函数
      callback: undefined
    }
  },
  watch: {
    visible () {
      // 一秒后自动关闭条件
      if (this.visible && !this.btnShow) {
        setTimeout(() => {
          this.visible = false
        }, 1000)
      }
    }
  },
  methods: {
    cancel () {
      this.visible = false
    },
    confirm () {
      this.cancel()
      // 正在关闭
      if (this.callback && this.callback === 'function') {
        this.callback(this)
      }
    },
    // transition离开时候钩子函数afterleave的回调
    handleAfterLeave () {
      // this.$el.remove()
      this.$destroy(true)
      // 从浏览器删除改dom元素
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  .toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(7, 17, 27, 0.8);
    border-radius: 0.1rem;
    color: $colorA;
    padding: 0.2rem 0.6rem;
    text-align: center;
    .btn {
      height: .8rem;
      display: flex;
      align-items: center;
      color: $colorA;
      margin-top: .4rem;
      border-top: 1px solid $colorA;
      div {
        flex: 1;
        width: 2rem;
      }
      &-cancel {
        border-right: 1px solid $colorA;
      }
    }
  }
}
</style>
