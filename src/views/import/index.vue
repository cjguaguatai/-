<template>
  <upload-excel :beforeUpload="excelSuccess" :onSuccess="onSuccess" />
</template>

<script>
import employees from '@/constant/employees'
import { batchAddEmployee } from '@/api/employees'
import { formatTime } from '@/filters'
const { mapKeyPath } = employees
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      // console.log(header);
      // console.log(results)
      console.log(Object.keys(mapKeyPath))
      const arr = results.map((ele) => {
        let obj = {}
        for (let key in mapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const time = ele[key]
            const date = new Date((time - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[mapKeyPath[key]] = formatTime(date)
            // obj[mapKeyPath[key]] = formatTime(
            //   ((time - 1) - (365 * 70 ))* 24 * 60 * 60 * 10000,
            // )
          } else {
            obj[mapKeyPath[key]] = ele[key]
          }
        }
        return obj
      })
      await batchAddEmployee(arr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="less"></style>
