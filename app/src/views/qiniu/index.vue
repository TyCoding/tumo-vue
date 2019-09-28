<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" size="mini" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="dialogAddVisible = true">
        新增
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
      <el-table-column align="center" label="Key" width="280">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="120">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="大小" width="120">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column label="外链地址">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDel(row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogVisible" width="30%" :append-to-body='true'
               :before-close="handleClose">
        <span>
            <el-input placeholder="请输入名称" v-model="form.name" style="margin-bottom: 12px">
                <template slot="prepend">名称</template>
            </el-input>
        </span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitAction">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog title="文件上传" :visible.sync="dialogAddVisible" width="30%" :append-to-body='true'
               :before-close="handleClose">
        <span>
            <el-upload
              :headers="tokenHeader"
              :action="qiNiuUploadApi"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitAction">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getList, del, update } from '@/api/qiniu'

  export default {
    computed: {
      ...mapGetters([
        'qiNiuUploadApi',
        'token'
      ])
    },
    data() {
      return {
        list: null,
        listLoading: true,
        form: {},
        fileList: [],
        tokenHeader: {},
        dialogVisible: false,
        dialogAddVisible: false
      }
    },
    created() {
      this.tokenHeader = {'Authorization': this.token}
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.rows
          this.listLoading = false
        })
      },

      handleUpdate(row) {
        this.form = row
        this.dialogVisible = true
      },

      submitAction() {
        update(this.form).then(res => {
          this.$message.success(res.msg)
          this.fetchData()
        })
        this.handleClose()
      },

      handleClose() {
        this.form = {}
        this.dialogVisible = false
        this.dialogAddVisible = false
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
      },
    }
  }
</script>
<style lang="scss" scoped>
a {
  color: #20a0ff;
}
</style>
