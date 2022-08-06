<template>
  <el-row type="flex" style="width: 100%">
    <el-col
      ><div class="grid-content bg-purple">{{ treeNode.name }}</div></el-col
    >
    <el-col :span="5"
      ><div class="grid-content bg-purple-light">
        <el-row type="flex">
          <el-col
            ><div class="grid-content bg-purple">
              {{ treeNode.manager }}
            </div></el-col
          >
          <el-col
            ><el-dropdown>
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$emit('add', treeNode)"
                  >添加部门</el-dropdown-item
                >
                <template v-if="!isRoot">
                  <el-dropdown-item @click.native="$emit('edit',treeNode)"
                    >编辑部门</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="onRemove"
                    >删除部门</el-dropdown-item
                  >
                </template>
              </el-dropdown-menu>
            </el-dropdown></el-col
          >
        </el-row>
      </div></el-col
    >
  </el-row>
</template>

<script>
import { delDeptsApi } from '@/api/departments'
export default {
  data() {
    return {}
  },

  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },

  created() {},

  methods: {
    async onRemove() {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await delDeptsApi(this.treeNode.id)
        this.$message.success('删除成功')
        this.$emit('remove')
      } catch (error) {}
    },
  },
}
</script>

<style scoped lang="less"></style>
