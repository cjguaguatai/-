import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    setToken(state, data) {
      state.token = data
    },
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      console.log(res)
      context.commit('setToken', res)
      localStorage
    },
  },
}
