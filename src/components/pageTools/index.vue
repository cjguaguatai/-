<template>
  <div>
    <el-card>
      <el-row type="flex">
        <el-col>
          <el-tag v-if="isShowLeft">
            <i :class="leftIcon"></i>
            <slot name="left-tag"></slot>
          </el-tag>
        </el-col>
        <el-col>
          <el-row type="flex" justify="end">
            <slot name="right" />
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'pageTools',
  data() {
    return {}
  },

  created() {},

  methods: {
    
  },

  props: {
    isShowLeft: {
      type: Boolean,
      default: true,
    },
    leftIcon: {
      type: String,
      default: 'el-icon-info',
    },
  },
}
</script>

<style lang="scss">
.el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
