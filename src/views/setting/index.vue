<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button
            type="primary"
            @click="dialogVisible = true"
            v-isHas="point.roles.add"
            >新增角色</el-button
          >
          <!-- v-if="isHas(point.roles.add)" -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button
                  type="success"
                  size="small"
                  @click="rightsBtn(row.id)"
                  >权限分配</el-button
                >
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
      <!-- 权限分配 -->
      <el-dialog
        title="权限分配"
        :visible.sync="setRightsDialog"
        width="50%"
        @close="onCloseRole"
        :destroy-on-close="true"
      >
        <el-tree
          :data="permissions"
          :props="{ label: 'name' }"
          default-expand-all
          show-checkbox
          node-key="id"
          :default-checked-keys="defaultCheckedKeys"
          ref="roleTree"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCloseRole">取 消</el-button>
          <el-button type="primary" @click="onSave">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getRolesApi,
  addRolesApi,
  getRoleInfo,
  updateRoleInfo,
} from '@/api/role'
import { getCompanyInfo } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
import permissionMixin from '@/mixins/permission'
export default {
  name: 'setting',
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
      setRightsDialog: false,
      permissions: [], // 权限树形数据
      defaultCheckedKeys: [], //分配权限
      roleId: '',
    }
  },
  mixins: [permissionMixin],

  created() {
    this.getRolesApi()
    this.getCompanyInfo()
    this.getPermissionList()
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
    // 根据id获取角色详情
    async rightsBtn(id) {
      const res = await getRoleInfo(id)
      this.setRightsDialog = true
      this.roleId = id
      this.defaultCheckedKeys = res.permIds
    },
    // 获取所有权限点
    async getPermissionList() {
      const res = await getPermissionList()
      // console.log(res);
      const treePermission = transListToTree(res, '0')
      this.permissions = treePermission
    },
    // 关闭权限弹窗
    onCloseRole() {
      // console.log('close')
      this.setRightsDialog = false
      this.defaultCheckedKeys = []
    },
    // 确认提交
    async onSave() {
      const res = await updateRoleInfo({
        id: this.roleId,
        permIds: this.$refs.roleTree.getCheckedKeys(),
      })
      this.onCloseRole()
    },
  },
}
</script>

<style scoped lang="less"></style>
