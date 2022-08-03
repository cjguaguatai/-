// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTokenTime } from './auth'

const isTimeOut = () => {
  const current = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return current - tokenTime > timeout
}
// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})
// 请求拦截器
service.interceptors.request.use(async (config) => {
  // console.log(config)
  if (store.state.user.token) {
    if (isTimeOut()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时'))
    } else {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
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
  async function (error) {
    if (error?.response?.status === 401) {
      Message.error('登陆过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
      return Promise.reject(error)
    }
  },
)
export default service // 导出axios实例
