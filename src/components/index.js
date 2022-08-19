import PageTools from '@/components/pageTools'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'
const components = [PageTools,UploadExcel,UploadImg]
export default {
  install(Vue) {
    components.forEach((components) => {
      Vue.component(components.name, components)
    })
  },
}
