<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="dialogVisible = true"
            >新增角色</el-button
          >
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="success" size="small">权限分配</el-button>
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="sizes,prev, pager, next"
            :page-size="pagesize"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-sizes="[3, 5, 8, 10]"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second"
          ><el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item> </el-form
        ></el-tab-pane>
      </el-tabs>

      <el-dialog
        title="提示"
        @close="closeDialog"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-form
          ref="form"
          :model="addRoleForm"
          label-width="80px"
          :rules="addRoleFormRules"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="addRoleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="addRoleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onAddRole">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi } from '@/api/role'
import { getCompanyInfo } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      pagesize: 10,
      total: null,
      page: 1,
      dialogVisible: false,
      form: {},
      addRoleForm: {
        name: '',
        description: '',
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
      },
      companyInfo: {},
    }
  },

  created() {
    this.getRolesApi()
    this.getCompanyInfo()
  },

  methods: {
    //获取角色列表
    async getRolesApi() {
      const res = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize,
      })
      // console.log(res)
      this.tableData = res.rows
      this.total = res.total
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.page = val
      this.getRolesApi()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRolesApi()
    },
    async onAddRole() {
      await this.$refs.form.validate()
      const res = await addRolesApi(this.addRoleForm)
      this.getRolesApi()
      this.closeDialog()
    },
    closeDialog() {
      this.$refs.form.resetFields(),
        (this.addRoleForm.description = ''),
        (this.dialogVisible = false)
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId,
      )
      // console.log(res)
      this.companyInfo = res
    },
  },
}
</script>

<style scoped lang="less"></style>
