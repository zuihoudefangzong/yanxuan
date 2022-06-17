import Main from './main.vue'
import Vue from 'vue'

// 构造1个vue组件
const ToastConstructor = Vue.extend(Main)

// 要构造vue组件 必要vue构造函数传过来
function createToast () {
  // 实例化
  const toast = new ToastConstructor()
  // 内部插槽可以放任何html或者vue组件
  // 可以去看container组件isVertical()
  // toast.$slots.default = [message]
  // Vue将toast组件挂载mount到browser内存中
  toast.$mount()
  // 最后才插入该dom
  // toast.$on('close',onClick)
  document.body.appendChild(toast.$el)
  return toast
}

// 页面只能有一个toast
let currentToast

const toast = () => {
  Vue.prototype.$toast = (options) => {
    options = options || {}
    // 假如已经有toast了 调用里面方法 销毁组件
    if (currentToast) {
      currentToast.cancel()
      currentToast = null
    }

    currentToast = createToast()

    if (typeof options === 'string') {
      currentToast.msg = options
      currentToast.visible = true
    } else {
      currentToast.msg = options.msg
      currentToast.btnShow = options.btnShow
      currentToast.visible = true
      currentToast.callback = options.callback
    }
    return currentToast
  }
}

export default toast
