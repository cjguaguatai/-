<template>
  <div>
    <el-dialog :title="title" :visible="visible" @close="onClose">
      <el-form
        ref="form"
        label-width="100px"
        :model="formData"
        :rules="formDataRules"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input placeholder="1-50个字符" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input placeholder="1-50个字符" v-model="formData.code"></el-input>
        </el-form-item>

        <el-form-item label="部门负责人" prop="manager">
          <el-select
            style="width: 100%"
            placeholder="选择负责人"
            v-model="formData.manager"
          >
            <el-option
              v-for="item in employeesList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            type="textarea"
            placeholder="1-300个字符"
            v-model="formData.introduce"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDeptsApi,
  addDeptsApi,
  getDeptsByIdApi,
  changeDeptsByIdApi,
} from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'
export default {
  data() {
    const checkDeptName = async (rule, value, callback) => {
      let flag
      if (this.formData.id) {
        const { depts } = await getDeptsApi()
        flag = depts
          .filter(
            (ele) =>
              ele.pid === this.formData.pid && ele.id !== this.formData.id,
          )
          .some((ele) => ele.name === value)
        // console.log('id', flag)
      } else {
        if (!this.currentNode.children) return callback()
        flag = this.currentNode.children.some((ele) => ele.name === value)
        // console.log('noid', flag)
      }
      flag ? callback(new Error('部门重复')) : callback()
    }
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      let flag
      if (this.formData.id) {
        flag = depts
          .filter((ele) => ele.id !== this.formData.id)
          .some((ele) => ele.code === value)
      } else {
        flag = depts.some((ele) => ele.code === value)
      }
      flag ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      formDataRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur',
          },
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
        ],
      },
      employeesList: [],
    }
  },

  created() {
    this.getEmployeesApi()
  },

  methods: {
    async getEmployeesApi() {
      try {
        const res = await getEmployeesApi()
        this.employeesList = res
      } catch (error) {
        // console.log(error)
      }
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      }
    },
    async onSave() {
      await this.$refs.form.validate()
      if (this.formData.id) {
        try {
          const res = await changeDeptsByIdApi(this.formData)
          this.$emit('update:visible', false)
          this.$emit('addDepts')
        } catch (error) {}
      } else {
        this.formData.pid = this.currentNode.id
        const res = await addDeptsApi(this.formData)
        this.$emit('update:visible', false)
        this.$emit('addDepts')
      }
    },
    async getDeptsById(id) {
      try {
        const res = await getDeptsByIdApi(id)
        this.formData = res
      } catch (error) {
        this.$message.error('获取部门信息失败')
      }
    },
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    },
  },
}
</script>

<style scoped lang="less"></style>
