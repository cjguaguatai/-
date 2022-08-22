<template>
  <el-dialog
    title="分配角色"
    @open="onOpen"
    :visible="visible"
    @close="close"
    center
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="item.id" v-for="item in roles" :key="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="assignRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  data() {
    return {
      checkList: [],
      roles: [],
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    // 获取角色列表
    async getRolesApiList() {
      const { rows } = await getRolesApi()
      this.roles = rows
    },
    // 获取用户详情，返回信息中的角色
    async getUserDetail() {
      const { roleIds } = await getUserDetail(this.id)
      this.checkList = roleIds
    },
    onOpen() {
      this.getRolesApiList()
      this.getUserDetail()
    },
    // 分配角色
    async assignRoles() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignRoles({
        id: this.id,
        roleIds: this.checkList,
      })
      this.$message.success('添加成功')
      this.close()
    },
    
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
