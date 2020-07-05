<template>
  <el-dialog title="上传" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-upload
      :action="qiNiuUploadApi"
      :on-success="uploadSuccess"
      :file-list="fileList"
      :headers="headers"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Upload',
  computed: {
    ...mapGetters([
      'token',
      'qiNiuUploadApi'
    ])
  },
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: {
        Authorization: this.$store.getters.token
      }
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    uploadSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.$message.success('上传成功')
        this.handleClose()
      }
    }
  }
}
</script>

<style scoped>

</style>
