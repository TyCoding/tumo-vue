<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="query.name" size="mini" placeholder="名称" style="width: 200px;" class="filter-item"/>
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
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="操作人" width="100">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="操作描述" width="120">
        <template slot-scope="scope">
          {{ scope.row.operation }}
        </template>
      </el-table-column>
      <el-table-column label="耗时（毫秒）" width="100">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column label="操作方法" width="250">
        <template slot-scope="scope">
          {{ scope.row.method }}
        </template>
      </el-table-column>
      <el-table-column label="操作参数">
        <template slot-scope="scope">
          {{ scope.row.method }}
        </template>
      </el-table-column>
      <el-table-column label="IP" width="150">
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="操作地点" width="240">
        <template slot-scope="scope">
          {{ scope.row.location }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
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
  import { getList, del } from '@/api/log'
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
        getList(this.query, this.listQuery).then(response => {
          this.list = response.data.rows
          this.listLoading = false
          this.total = response.data.total
        })
      },

      handleClose() {
        this.form = {}
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
