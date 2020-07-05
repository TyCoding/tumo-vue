<template>
  <el-card>
    <div style="margin-bottom: 10px;">
      <el-button type="success" size="mini" icon="el-icon-plus" @click="handleAdd" />
    </div>
    <el-alert title="由于七牛云官方API不支持分页查询，只能查询所有" type="warning" show-icon :closable="false" />
    <br>
    <div class="table-responsive">
      <el-table :data="list" size="small">
        <el-table-column align="center" label="对象KEY" width="270" prop="key" />
        <el-table-column align="center" label="对象名称" width="260" prop="name" />
        <el-table-column align="center" label="对象类型" width="150" prop="type" />
        <el-table-column align="center" label="对象大小(kb)" width="150">
          <template slot-scope="scope">
            {{ scope.row.size / 1024 }} kb
          </template>
        </el-table-column>
        <el-table-column align="center" property="url" width="100" label="预览图">
          <template slot-scope="scope">
            <a :href="scope.row.url" target="_blank" style="color:#409EFF;">
              <el-image :src="scope.row.url" width="40" lazy />
            </a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="链接地址" prop="url" />
        <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="text" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.name)" />
            <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDel(scope.row.name)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <upload :dialog-visible="dialogVisible" :file-list="fileList" />
  </el-card>
</template>

<script>
import { getQiniuList, qiniuFindByName, qiniuDel } from '@/api/qiniu.js'
import Upload from './components/upload'
export default {
  name: 'Index',
  components: { Upload },
  data() {
    return {
      list: [],
      form: {},
      dialogVisible: false,
      fileList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getQiniuList().then(res => {
        if (res.code === 200) {
          this.list = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleEdit(name) {
      qiniuFindByName(name).then(res => {
        if (res.code === 200) {
          this.form = res.data
          this.dialogVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleAdd() {
      this.dialogVisible = true
    },
    handleDel(name) {
      this.$confirm('你确定永久删除此数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        qiniuDel(name).then(res => {
          if (res.code === 200) {
            this.fetchData()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style scoped>

</style>
