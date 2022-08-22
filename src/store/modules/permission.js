import router, { asyncRoutes, constantRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [],
    points: [],
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, payload) {
      state.points = payload
    },
  },
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRoutes.filter((ele) =>
        roles.menus.includes(ele.meta.id),
      )
      // console.log(routes)
      context.commit('setRoutes', routes)
      context.commit('setPoints', roles.points)
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true },
      ])
    },
  },
}
