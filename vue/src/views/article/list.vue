<template>
    <div class="editor-container">

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column prop="id" align="center" sortable show-overflow-tooltip label="编号" width="80"></el-table-column>
            <el-table-column align="center" prop="author" show-overflow-tooltip label="作者" width="120"></el-table-column>
            <el-table-column prop="title" label="文章标题"></el-table-column>
            <el-table-column align="center" prop="origin" label="来源" width="170"></el-table-column>
            <el-table-column align="center" prop="editTime" label="最后编辑时间" width="170"></el-table-column>
            <el-table-column align="center" prop="publishTime" label="发布时间" width="170"></el-table-column>
            <el-table-column align="center" prop="category" show-overflow-tooltip label="分类" width="130"></el-table-column>
            <el-table-column align="center" prop="state" label="状态" width="120">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.state == '1' ? '已发布':'存入草稿'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <router-link :to="'/article/edit/' + scope.row.id">
                        <el-button size="mini" icon="el-icon-edit" type="warning"></el-button>
                    </router-link>
                    <el-button size="mini" icon="el-icon-view" type="primary"></el-button>
                    <el-button @click="handleDelete(scope.row.id)" icon="el-icon-delete" size="mini" type="danger"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageCode" :limit.sync="listQuery.pageSize"
                    @pagination="getList"/>

    </div>
</template>

<script>
    import {findAll,findByPage,deleteById} from '@/api/article'
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

    export default {
        name: 'ArticleList',
        components: {Pagination},
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                };
                return statusMap[status]
            }
        },
        data() {
            return {
                list: null,
                listLoading: true,
                total: 0,
                listQuery: {
                    pageCode: 1,
                    pageSize: 10
                },
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                findByPage(this.listQuery.pageCode, this.listQuery.pageSize).then(response => {
                    if (response.code == 20000) {
                        this.list = response.data.rows;
                        this.total = response.data.total;
                        this.listLoading = false
                    }
                })
            },
            handleSizeChange(val) {
                this.listQuery.limit = val;
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getList()
            },
            handleDelete(id){
                this.$confirm('你确定永久删除此用户信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    var ids = [];
                    ids.push(id);
                    deleteById(ids).then(response => {
                        var flag = 'success';
                        if (response.code != 20000) {
                            flag = 'error'
                        }
                        this.$message({
                            type: flag,
                            message: response.data,
                            duration: 6000
                        });
                    });
                    this.getList();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration: 6000
                    });
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .editor-container{
        padding: 32px;
    }
    .edit-input {
        padding-right: 100px;
    }

    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }
</style>
