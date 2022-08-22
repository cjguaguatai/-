import { login, getUserInfo, getUserDetail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, data) {
      state.token = data
    },
    setUserInfo(state, data) {
      state.userInfo = data
    },
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      // console.log(res)
      setTokenTime()
      context.commit('setToken', res)
      // localStorage
    },
    async getUserInfo(context, payload) {
      const userBaseInfo = await getUserInfo()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userInfo })
      return userBaseInfo
    },
    logout(context) {
      context.commit('setUserInfo', {})
      context.commit('setToken', '')
      resetRouter()
      context.commit('permission/setRoutes', [], { root: true })
    },
  },
}
