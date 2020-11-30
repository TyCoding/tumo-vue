<template>
  <el-dialog title="新增/修改" :before-close="handleClose" :visible="dialogVisible" width="40%">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getTagById, tagAdd, tagUpdate } from '@/api/tag'

export default {
  name: 'Model',
  data() {
    return {
      dialogVisible: false,
      form: {},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.form = {}
      this.dialogVisible = false
    },
    fetchData(id) {
      this.dialogVisible = true
      if (id !== undefined) {
        getTagById(id).then(res => {
          if (res.code === 200) {
            this.form = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.id === undefined) {
            tagAdd(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success('添加成功')
                this.handleClose()
                this.$emit('refresh')
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            tagUpdate(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success('修改成功')
                this.handleClose()
                this.$emit('refresh')
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>

<style scoped>

</style>
