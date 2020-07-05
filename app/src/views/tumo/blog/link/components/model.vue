<template>
  <el-dialog title="新增/修改" :before-close="handleClose" :visible="dialogVisible" width="40%">
    <el-form :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-input v-model="form.url" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Model',
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入URL', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    handleSubmit() {
      this.$emit('modelOpen')
    }

  }
}
</script>

<style scoped>

</style>
