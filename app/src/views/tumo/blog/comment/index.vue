<template>
  <div class="app-container">
    <el-card>
      <el-form size="mini" :inline="true">
        <el-form-item>
          <el-input v-model="query.content" placeholder="请输入评论内容查询" style="width: 300px" />
        </el-form-item>
        <el-form-item style="padding: 0;margin: 0">
          <el-button type="success" icon="el-icon-search" @click="fetchData" />
        </el-form-item>
      </el-form>
      <el-table
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
      >
        <el-table-column prop="id" label="ID" width="55" />
        <el-table-column prop="nickname" label="昵称" width="150" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="email" label="邮箱" width="150" />
        <el-table-column prop="ip" label="IP" width="150" />
        <el-table-column prop="device" label="设备" width="150" />
        <el-table-column prop="address" label="地址" width="150" />
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-delete" @click="handleDel(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="pageConf.page" :limit.sync="pageConf.limit" @pagination="fetchData" />
    </el-card>
  </div>
</template>

<script>
import { getCommentList, commentDel } from '@/api/comment'
import Pagination from '@/components/Pagination'
export default {
  name: 'Index',
  components: { Pagination },
  data() {
    return {
      list: [],
      pageConf: {
        page: 1,
        limit: 8
      },
      total: 0,
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
      getCommentList(this.query, this.pageConf).then(res => {
        if (res.code === 200) {
          this.list = res.data.rows
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commentDel(id).then(res => {
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
