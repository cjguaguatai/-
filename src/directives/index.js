export const imgError = {
  inserted: function (el, options) {
    // console.log(el);
    el.onerror = () => {
      el.src = options.value
    }
  },
}
