import permissionPoint from '@/constant/permission'
export default {
  data() {
    return {
      point: permissionPoint,
    }
  },
  methods: {
    isHas(point) {
      // console.log(this.$store.state.permission.points.includes(point))
      return this.$store.state.permission.points.includes(point)
    },
  },
}
