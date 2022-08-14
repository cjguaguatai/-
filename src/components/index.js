import PageTools from '@/components/pageTools'
import UploadExcel from './UploadExcel'
const components = [PageTools,UploadExcel]
export default {
  install(Vue) {
    components.forEach((components) => {
      Vue.component(components.name, components)
    })
  },
}
