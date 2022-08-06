<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <tree-tools
          :treeNode="{ name: '呱呱太教育', manager: '负责人' }"
          :isRoot="true"
          @add="dialogFormVisible = true"
        />
        <!-- 树形 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <template v-slot="scope">
            <tree-tools
              :treeNode="scope.data"
              @remove="getDeptsApi()"
              @add="showAddDept"
              @edit="showEdit"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹层 -->
    <add-dept
      @addDepts="getDeptsApi()"
      :visible.sync="dialogFormVisible"
      :currentNode="currentNode"
      ref="addDept"
    />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
export default {
  components: { TreeTools, AddDept },
  data() {
    return {
      departs: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      defaultProps: {
        label: 'name',
      },
      dialogFormVisible: false,
      currentNode: {},
      loading:false
    }
  },

  created() {
    this.getDeptsApi()
  },

  methods: {
    async getDeptsApi() {
      try {
        this.loading=true
        const res = await getDeptsApi()
        this.departs = transListToTree(res.depts, '')
        // console.log(transListToTree(res.depts, ''))
        this.loading=false
      } catch (error) {
        // console.log(error)
      }
    },
    showAddDept(data) {
      this.dialogFormVisible = true
      this.currentNode = data
    },
    showEdit(obj) {
      this.dialogFormVisible = true
      this.$refs.addDept.getDeptsById(obj.id)
    },
  },
}
</script>

<style scoped lang="scss">
.el-dropdown {
  font-size: 16px;
  color: #303133;
}
</style>
