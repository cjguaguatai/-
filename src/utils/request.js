// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}) 
// 请求拦截器
service.interceptors.request.use((config) => {
  console.log(config)
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}) 
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const { data, message, success } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  function (error) {
    Message.error('登陆失败')
    return Promise.reject(error)
  },
) 
export default service // 导出axios实例
