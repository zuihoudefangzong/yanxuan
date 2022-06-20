// 封装ajax
import axios from 'axios'
// element-ui的消息提示
import Message from '../components/message'

// new一个axios的实例(
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 15000 // 定义5秒超时
})

// axios响应response拦截器
service.interceptors.response.use(
  response => {
    // axios对响应response包装了一层data
    const { data: res } = response
    if (res.status === 1) {
      // 后端定义的成功是1
      return res.data
    } else if (res.status === 0) {
      // 后端定义的失败是10
      Message.error(res)
      return Promise.reject(res.message)
    } else {
      // 其他报错 但是服务器响应
      Message.warning(res.msg)
    }
  },
  // 服务器500/404或者超时
  error => {
    const { response: { data } } = error
    Message.error(data)
    return Promise.reject(error)
  }
)

// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
export default service
