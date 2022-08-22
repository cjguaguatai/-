<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共{{ page.total }}条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            v-if="isHas(point.employees.import)"
            >导入</el-button
          >

          <el-button size="small" type="danger" @click="exportExcel" autofocus
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="showAddEmployee = true"
            v-if="isHas(point.employees.add)"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeeList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工头像">
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                v-imgError="require('@/assets/zjl.jpg')"
                style="
                  border-radius: 50%;
                  width: 60px;
                  hight: 60px padding=10px;
                "
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="roleBtn(row.id)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="onRemove(row.id)"
                v-if="isHas(point.employees.del)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 二维码显示框 -->
    <el-dialog title="头像二维码" :visible.sync="erCodeDialog">
      <canvas id="canvas"></canvas>
    </el-dialog>
    <!-- 新增员工弹框 -->
    <add-employee :visible.sync="showAddEmployee"></add-employee>
    <!-- 权限框 -->
    <assign-role :visible.sync="showDialog" :id="roleId"></assign-role>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import AddEmployee from './components/add-employee.vue'
import AssignRole from './components/assign-role.vue'
import employees from '@/constant/employees'
import QRcode from 'qrcode'
import permissionMixin from '@/mixins/permission'
const { exportExcelMapPath, hireType } = employees
export default {
  name: 'employees',
  data() {
    return {
      employeeList: [],
      page: {
        page: 1,
        size: 10,
        total: 0,
      },
      showAddEmployee: false,
      erCodeDialog: false,
      showDialog: false,
      roleId: '',
    }
  },

  mixins: [permissionMixin],
  
  components: { AddEmployee, AssignRole },

  created() {
    this.getEmployeeList(this.page)
  },

  methods: {
    async getEmployeeList(data) {
      const { rows, total } = await getEmployeeList(data)
      this.employeeList = rows
      this.page.total = total
    },
    changePage(val) {
      this.page.page = val
      this.getEmployeeList(this.page)
    },
    formOfEmployment(row, column, cellValue, index) {
      const findItem = hireType.find((item) => {
        item.id === cellValue
      })
      return findItem ? findItem.value : '未知'
      // if (cellValue === 1) return '正式'
      // if (cellValue === 2) return '非正式'
      // return '未知'
    },
    async onRemove(id) {
      try {
        await this.$confirm('确定删除该用户？')
        await delEmployee(id)
        this.getEmployeeList(this.page)
      } catch (error) {}
    },
    async exportExcel() {
      // 由于js-xlsx体积还是很大的，导出功能也不是一个非常常用的功能，所以使用的时候建议使用懒加载
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.page.total,
      })
      const header = Object.keys(exportExcelMapPath)
      // const data = rows.map((item) => {
      //   return header.map((ele) => {
      //     if(ele==='聘用形式'){
      //       hireType.find(ele=>ele.id===)
      //     }
      //     return item[exportExcelMapPath[ele]]
      //   })
      // })
      // console.log(data)
      // debugger
      const data = rows.map((item) => {
        return header.map((ele) => {
          if (ele === '聘用形式') {
            const findItem = hireType.find(
              (hire) => hire.id === item[exportExcelMapPath[ele]],
            )
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[ele]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: '呱呱太', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
      })
    },
    // 点击显示二维码弹层
    showErCodeDialog(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户未设置头像')
      this.erCodeDialog = true
      this.$nextTick(() => {
        QRcode.toCanvas(canvas, staffPhoto)
      })
    },
    roleBtn(id) {
      this.roleId = id
      this.showDialog = true
    },
  },
}
</script>

<style scoped lang="less"></style>
