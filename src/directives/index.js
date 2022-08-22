import store from '@/store/index'
export const imgError = {
  inserted(el, options) {
    // 当被绑定元素插入到DOM中时 触发
    // 当绑定的元素插入到DOM的时候，图片数据还没请求回来
    // console.log(el)
    if (!el.src) {
      el.src = options.value
    } else {
      el.onerror = () => {
        el.src = options.value
      }
    }
  },

  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  },
  //   update(el, { value }) {
  //     // 当被绑定元素插入到DOM中时 触发
  //     // 当绑定的元素插入到DOM的时候，图片数据还没请求回来
  //     // console.log(el)
  //     if (!el.src) {
  //       el.src = value
  //     } else {
  //       el.onerror = function () {
  //         el.src = value
  //       }
  //     }
  //   },
}
export const isHas = {
  inserted(el, binding) {
    console.log(binding);
    const has = store.state.permission.points.includes(binding.value)
    if (!has) {
      el.remove()
    }
  },
}
