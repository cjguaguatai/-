import router from '@/router'
import store from '@/store'
const writeList = ['/404', '/login']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  // console.log(to);
  if (token) {
    if (!store.state.user.userInfo.userId) {
      store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') return next('/')
    next()
  } else {
    if (writeList.includes(to.path)) return next()
    next('/login')
  }
})
