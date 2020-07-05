<template>
  <div class="app-container">
    <el-card>
      <el-form size="mini" :inline="true">
        <el-form-item>
          <el-input v-model="query.username" placeholder="请输入操作用户查询" style="width: 300px" />
        </el-form-item>
        <el-form-item style="padding: 0;margin: 0">
          <el-button type="success" icon="el-icon-search" @click="fetchData" />
        </el-form-item>
      </el-form>
      <el-table ref="table" :data="list" size="mini" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="username" label="操作用户" width="150" align="center" />
        <el-table-column prop="operation" label="操作描述" width="180" align="center" />
        <el-table-column prop="time" label="耗时(毫秒)" width="140" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.time }} ms</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="method" label="操作方法" show-overflow-tooltip align="center" />
        <el-table-column prop="params" label="操作参数" width="180" show-overflow-tooltip align="center" />
        <el-table-column prop="ip" label="IP地址" width="160" align="center" />
        <el-table-column prop="location" label="操作地点" width="200" align="center" />
        <el-table-column prop="createTime" label="操作时间" width="160" align="center" />
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-delete" type="text" @click="handleDel(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="pageConf.total>0" :total="pageConf.total" :page.sync="pageConf.page" :limit.sync="pageConf.limit" @pagination="fetchData" />
    </el-card>
  </div>
</template>

<script>
import { getLogList, logDel } from '@/api/log'
import Pagination from '@/components/Pagination'
export default {
  name: 'Index',
  components: { Pagination },
  data() {
    return {
      list: [],
      form: {},
      pageConf: {
        page: 1,
        limit: 8,
        total: 0
      },
      query: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getLogList(this.query, this.pageConf).then(res => {
        if (res.code === 200) {
          this.list = res.data.rows
          this.pageConf.total = res.data.total
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
        logDel(id).then(res => {
          if (res.code == 200) {
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
