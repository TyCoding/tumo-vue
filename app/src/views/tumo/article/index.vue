<template>
  <div class="app-container">
    <el-card>
      <el-form size="mini" :inline="true">
        <el-form-item>
          <el-input v-model="query.title" placeholder="请输入文章标题查询" style="width: 300px" />
        </el-form-item>
        <el-form-item style="padding: 0;margin: 0">
          <el-button type="success" icon="el-icon-search" @click="fetchData" />
        </el-form-item>
      </el-form>
      <div class="table-responsive">
        <el-table
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          size="mini"
        >
          <el-table-column prop="id" label="ID" width="55" />
          <el-table-column prop="title" label="名称" />
          <el-table-column prop="author" label="作者" />
          <el-table-column label="链接">
            <template slot-scope="scope">
              <a :href="baseUrl + '/p/' + scope.row.id" target="_blank">{{ baseUrl }}/p/{{ scope.row.id }}</a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <router-link :to="'/tumo/article/edit/'+scope.row.id" style="padding-right: 10px;">
                <el-button type="text" icon="el-icon-edit" />
              </router-link>
              <el-button type="text" icon="el-icon-delete" @click="handleDel(scope.row.id)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination v-show="pageConf.total>0" :total="pageConf.total" :page.sync="pageConf.page" :limit.sync="pageConf.limit" @pagination="fetchData" />
    </el-card>
  </div>
</template>

<script>
import { getArticleList, getArticleById, articleDel } from '@/api/article'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      pageConf: {
        page: 1,
        limit: 8,
        total: 0
      },
      baseUrl: window.location.origin,
      query: {},
      categoryList: [],
      tagList: [],
      dialogVisible: false
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
      getArticleList(this.query, this.pageConf).then(res => {
        if (res.code === 200) {
          this.list = res.data.rows
          this.pageConf.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    handleEdit(id) {
      getArticleById(id).then(res => {
        if (res.code === 200) {
          this.form = res.data
          this.dialogVisible = true
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
        articleDel(id).then(res => {
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
