import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import print from 'vue-print-nb'
Vue.use(print)
// 注册自定义指令
import * as directives from '@/directives'
for (let k in directives) {
  Vue.directive(k, directives[k])
}
// 注册过滤器
import * as filters from '@/filters'
for (let k in filters) {
  Vue.filter(k, filters[k])
}
import components from '@/components'
Vue.use(components)
// mock假数据
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// 注册element ui
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// dev: development 开发
// test: 测试
// production 生产
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
