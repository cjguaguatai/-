<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :isShowLeft="false">
        <el-button type="primary" slot="right" @click="showAddDialog('0', 1)"
          >添加权限</el-button
        >
      </page-tools>
      <el-card>
        <el-table border :data="tableList" row-key="id" ref="permissionTable">
          <el-table-column label="名称">
            <template slot-scope="{ row }">
              <i
                class="el-icon-folder-opened"
                v-if="row.children"
                style="margin-right: 5px"
                @click="expend(row)"
              ></i>
              <i
                class="el-icon-folder"
                v-if="row.type === 2"
                style="margin-right: 5px"
              ></i>
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template v-slot="{ row }">
              <el-button
                type="text"
                @click="showAddDialog(row.id, 2)"
              >操作</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog
        title="新增权限点"
        :visible.sync="showDialog"
        @close="btnCancel"
      >
        <!-- 表单 -->
        <el-form
          ref="perForm"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width: 90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK"
              >确定</el-button
            >
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/pageTools'
import { getPermissionList, addPermission } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      tableList: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0', // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' },
        ],
      },
      showDialog: false,
    }
  },

  created() {
    this.getList()
  },

  methods: {
    async getList() {
      const res = await getPermissionList()
      this.tableList = transListToTree(res, '0')
    },
    expend(row) {
      // console.log(111)
      row.isExpend = !row.isExpend
      this.$refs.permissionTable.toggleRowExpansion(row, row.isExpend)
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0', // 开启
      }
      this.$refs.perForm.resetFields()
      this.showDialog = false
    },
    btnOK() {
      this.$refs.perForm.validate(async (valid) => {
        if (!valid) return
        await addPermission(this.formData)
        this.$message.success('添加成功')
        this.btnCancel()
        this.getList()
      })
    },
    showAddDialog(id, type) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
  },
  components: { PageTools },
}
</script>

<style scoped lang="scss"></style>
