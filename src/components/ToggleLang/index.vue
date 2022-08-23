<template>
  <el-dropdown @command="onCommand">
    <span class="el-dropdown-link">
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :command="key"
        v-for="(obj, key) in messages"
        :key="key"
        :disabled="key === $i18n.locale"
        >{{ obj.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return { messages }
  },

  created() {},

  methods: {
    onCommand(val) {
    //   console.log(val)
    this.$router.go(0)
      this.$i18n.locale = val
      Cookie.set('lang', val)
    },
  },
}
</script>

<style scoped lang="less"></style>
