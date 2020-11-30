<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never">
          <el-form size="mini" :inline="true">
            <el-form-item>
              <el-input v-model="query.name" placeholder="请输入分类内容查询" />
            </el-form-item>
            <el-form-item style="padding: 0;margin: 0">
              <el-button type="success" icon="el-icon-search" @click="fetchData" />
              <el-button type="primary" icon="el-icon-plus" @click="$refs.model.fetchData()" />
            </el-form-item>
          </el-form>
          <el-tree
            ref="tree"
            :data="list"
            highlight-current
            node-key="id"
            @node-click="handleNodeChange"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ data.name }}</span>
              <span>
                <el-button type="text" size="mini" icon="el-icon-edit" @click="() => $refs.model.fetchData(data.id)" />
                <el-button type="text" size="mini" icon="el-icon-delete" @click="() => handleDel(node, data)" />
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card shadow="never">
          <el-table
            :data="articleList"
            tooltip-effect="dark"
            style="width: 100%"
            size="mini"
          >
            <el-table-column prop="id" label="ID" width="55" />
            <el-table-column prop="author" label="作者" width="120" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="createTime" label="时间" width="150" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <model ref="model" @refresh="fetchData" />
  </div>
</template>

<script>
import { getCategoryFilterList, categoryDel } from '@/api/category'
import { findByCategory } from '@/api/article'
import Model from './components/model'
export default {
  name: 'Index',
  components: { Model },
  data() {
    return {
      list: [],
      query: {},
      articleList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getCategoryFilterList(this.query).then(res => {
        if (res.code === 200) {
          this.list = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleNodeChange(data, node) {
      findByCategory(data.id).then(res => {
        this.articleList = res.data
      })
    },

    handleDel(node, data) {
      this.$confirm('你确定永久删除此数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        categoryDel(data.id).then(res => {
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
.custom-tree-node{flex:1;display:flex;align-items:center;justify-content:space-between;font-size:14px;padding-right:8px}.el-tree{margin-left:-24px}
</style>
