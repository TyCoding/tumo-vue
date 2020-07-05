<template>
  <div class="app-container">
    <el-card>
      <el-form size="mini" :inline="true">
        <el-form-item>
          <el-input v-model="query.content" placeholder="请输入评论内容查询" style="width: 300px" />
        </el-form-item>
        <el-form-item style="padding: 0;margin: 0">
          <el-button type="success" icon="el-icon-search" @click="fetchData" />
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd" />
        </el-form-item>
      </el-form>
      <el-table
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
      >
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="名称" />
        <el-table-column label="URL">
          <template slot-scope="scope">
            <el-link :href="scope.row.url" type="primary" target="_blank">{{ scope.row.url }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row.id)" />
            <el-button type="text" icon="el-icon-delete" @click="handleDel(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="pageConf.total>0" :total="pageConf.total" :page.sync="pageConf.page" :limit.sync="pageConf.limit" @pagination="fetchData" />
    </el-card>

    <!-- 添加修改框 -->
    <model :form="form" :dialogVisible="dialogVisible" @modelOpen="handleSubmit" />
  </div>
</template>

<script>
import { getLinkList, getLinkById, linkAdd, linkUpdate, linkDel } from '@/api/link'
import Pagination from '@/components/Pagination'
import Model from './components/model'
export default {
  name: 'Index',
  components: { Pagination, Model },
  data() {
    return {
      list: [],
      pageConf: {
        page: 1,
        limit: 8,
        total: 0
      },
      form: {},
      dialogVisible: false,
      query: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.form = {}
    },
    fetchData() {
      getLinkList(this.query, this.pageConf).then(res => {
        if (res.code === 200) {
          this.list = res.data.rows
          this.pageConf.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleEdit(id) {
      getLinkById(id).then(res => {
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
    handleSubmit() {
      if (this.form.id === undefined) {
        linkAdd(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('添加成功')
            this.fetchData()
            this.handleClose()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        linkUpdate(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.fetchData()
            this.handleClose()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        linkDel(id).then(res => {
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
