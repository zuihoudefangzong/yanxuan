import Vue from 'vue'
import Main from './main.vue'
const MessageConstructor = Vue.extend(Main)
// 存放新构造出来的message组件
let instance
// 存放所有message组件的数组
const instances = []
// 当message组件的标识'message_' + seed
let seed = 1

// Vue.use类静态方法 当传的是对象会调用install方法function
// Vue和options 是Vue.use给我的
// 为了能import Message from '' 和Vue.use全局同时使用
const Message = function (MessageOptions) {
  // 全局注册组件li-toast
  // Vue.component(Message.name, Message)
  // vue实例挂了一个function 可传string或者对象
  // 不考虑服务器渲染SSR的Nuxt.js
  if (Vue.prototype.$isServer) return
  // 若用户没传MessageOptions给MessageOptions默认值为空对象
  MessageOptions = MessageOptions || {}
  // 假如传进来是string 就是只传message
  if (typeof MessageOptions === 'string') {
    MessageOptions = {
      message: MessageOptions
    }
  }
  //  拿到用户传的回调函数 拿到引用
  const userOnClose = MessageOptions.onClose
  const id = 'message_' + seed++

  MessageOptions.onClose = function () {
    // 同时这里产生了闭包 id和userOnClose
    Message.onClose(id, userOnClose)
  }

  // 复杂逻辑抽离成1个function
  createMessage({
    Vue,
    MessageOptions
  })
  // id 标识'message_' + seed++
  instance.id = id

  return instance
}

function createMessage ({ Vue, MessageOptions }) {
  // 使用基础 Vue 构造器返回一个构造函数
  // 构造1个vue组件Message
  instance = new MessageConstructor({ data: MessageOptions })
  // 内部插槽可以放任何html或者vue组件
  // 可以去看container组件isVertical()
  // toast.$slots.default = [message]

  // 先判断传过data里面的message是否为 vue节点
  // 假如不是节点就是直接显示了
  // if (isVNode(instance.message)) {
  //   instance.$slots.default = [instance.message]
  //   instance.message = null
  // }

  // Vue将toast组件挂载mount到browser内存中
  instance.$mount()

  document.body.appendChild(instance.$el)
  let verticalOffset = MessageOptions.offset || 20

  // 多个message的时候 计算top高度icalOffset
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  instance.verticalOffset = verticalOffset
  // 页面每挂载一个都加入到数组中
  instances.push(instance)
}

// 每个message的data都会有这个onclose函数
// id = 'message_' + seed++
// 找到要删除的message组件
Message.onClose = function (id, userOnClose) {
  // 拿到instances数组的长度
  const length = instances.length
  // 记录要删除的message的vue组件在数组的位置
  let index = -1
  // 记录要销毁的message的vue组件在数组的位置
  let removedHeight
  for (let i = 0; i < length; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight
      // 这里才是真实调用用户的函数
      if (typeof userOnClose === 'function') {
        // 把找到的vue实例传过去
        userOnClose.call(instances[i])
      }
      // 找到对应的index
      index = i
      // 从数组中删除
      instances.splice(i, 1)
      break
    }
  }
  // 同时判断数组长度只有2 已经删除了一个 就剩一个 length <= 1
  // 还有找不到的情况 index === -1
  // 还有删除的是最后一个的情况  重新获取数组的length-1与index比较
  // 就是不用重新计算高度top赋值三种情况
  if (length <= 1 || index === -1 || index > instances.length - 1) return
  for (let i = index; i < length - 1; i++) {
    const instance = instances[i]
    instance.verticalOffset = instance.verticalOffset - removedHeight - 16
    // let dom = instances[i].$el;
    // 获取dom的top值 转为10进制Int整数 减去上一个top
    // dom.style.top =
    //   parseInt(dom.style.top, 10) - removedHeight - 16 + 'px'
  }
}

// 关闭所有message组件
Message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
};
// Message.'success' = function
['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    // 调用Message函数
    return Message(options)
  }
})

export default Message

// closeAll = function() {
//   for (let i = instances.length - 1; i >= 0; i--) {
//     instances[i].close();
//   }
// };

// const hasOwnProperty = Object.prototype.hasOwnProperty
// 判断对象上私有属性是否纯在
// function hasOwn (obj, key) {
//   return hasOwnProperty.call(obj, key)
// };

// 判断是是否为vue组件
// function isVNode (node) {
//   return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions')
// };
