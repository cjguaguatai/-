import router from '@/router'
import store from '@/store'
const writeList = ['/404', '/login']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  // console.log(to);
  if (token) {
    if (!store.state.user.userInfo.userId) {
      const { roles } = await store.dispatch('user/getUserInfo')
      // console.log(roles)
      await store.dispatch('permission/filterRoutes', roles)
      // console.log(roles.menus)
      // console.log(asyncRoutes)
      // const routes = asyncRoutes.filter((ele) =>
      //   roles.menus.includes(ele.meta.id),
      // )
      // // console.log(routes)
      // router.addRoutes([
      //   ...routes,
      //   { path: '*', redirect: '/404', hidden: true },
      // ])
      next(to.path)
    }
    if (to.path === '/login') return next('/')
    next()
  } else {
    if (writeList.includes(to.path)) return next()
    next('/login')
  }
})
