<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="visible">
      <span>message</span>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
    
<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {},

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped lang="less"></style>
