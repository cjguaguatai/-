import PageTools from '@/components/pageTools'
const components = [PageTools]
export default {
  install(Vue) {
    components.forEach((components) => {
      Vue.component(components.name, components)
    })
  },
}
