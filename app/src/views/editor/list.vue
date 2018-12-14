<template>
    <div class="editor-container">

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column ref="selection" align="center" type="selection" width="55"></el-table-column>
            <el-table-column prop="id" align="center" sortable fixed show-overflow-tooltip label="编号" width="80"></el-table-column>
            <el-table-column align="center" prop="title" label="文章标题" width="260" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="author" sortable show-overflow-tooltip label="文章作者" width="120"></el-table-column>
            <el-table-column align="center" prop="createTime" sortable label="创建时间" width="170"></el-table-column>
            <el-table-column align="center" prop="editTime" sortable label="最后编辑时间" width="170"></el-table-column>
            <el-table-column align="center" prop="publishTime" sortable label="发布时间" width="170"></el-table-column>
            <el-table-column align="center" prop="category" show-overflow-tooltip label="文章分类" width="130"></el-table-column>
            <el-table-column align="center" prop="state" sortable label="状态" width="120">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.state == '1' ? '已发布':'存入草稿'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button icon="el-icon-delete" size="mini" type="danger">删除</el-button>
                    <el-button size="mini" icon="el-icon-edit" type="warning">编辑</el-button>
                    <el-button size="mini" icon="el-icon-view" type="primary">预览</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageCode" :limit.sync="listQuery.pageSize"
                    @pagination="getList"/>

    </div>
</template>

<script>
    import {findAll,findByPage} from '@/api/article'
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
                }
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
