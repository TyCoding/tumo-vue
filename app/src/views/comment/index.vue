<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="query.name" size="mini" placeholder="昵称" style="width: 200px;" class="filter-item"/>
      <el-input v-model="query.url" size="mini" placeholder="网址" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="fetchData">
        查询
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      size="mini"
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="留言人" width="100">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="留言内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="130">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="网址" width="150">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" style="color: #409EFF">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column label="IP" width="120">
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="登录设备" width="150">
        <template slot-scope="scope">
          {{ scope.row.device }}
        </template>
      </el-table-column>
      <el-table-column label="地址" width="180">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="所属板块" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sort == '0'" effect="dark">Article</el-tag>
          <el-tag v-if="scope.row.sort == '1'" effect="dark">Link</el-tag>
          <el-tag v-if="scope.row.sort == '2'" effect="dark">About</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="130" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="danger" @click="handleDel(row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

  </div>
</template>

<script>
  import { getCommentList, del} from '@/api/comment'
  import Pagination from '@/components/Pagination'

  export default {
    components: { Pagination },
    data() {
      return {
        list: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        total: 0,
        query: {},
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getCommentList(this.query, this.listQuery).then(response => {
          this.list = response.data.rows
          this.listLoading = false
          this.total = response.data.total
        })
      },

      handleDel(id) {
        this.$confirm('你确定永久删除此条记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          del(id).then(response => {
            this.$message.success(response.msg)
            this.fetchData();
          });
        }).catch(() => {
          this.$message.info('已取消删除')
        });
      }
    }
  }
</script>
