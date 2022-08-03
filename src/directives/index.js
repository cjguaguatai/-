export const imgError = {
  inserted: function (el, { value }) {
    el.onerror = () => {
      el.src = value
    }
  },
}
