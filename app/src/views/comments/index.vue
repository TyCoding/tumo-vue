<template>
    <div class="comments-container">
        <el-table :data="list" border style="width: 100%">
            <el-table-column ref="selection" align="center" type="selection" width="55"></el-table-column>
            <el-table-column prop="id" align="center" sortable fixed label="编号" show-overflow-tooltip width="80"></el-table-column>
            <el-table-column align="center" prop="content" label="留言内容" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="articleTitle" label="文章标题" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="author" show-overflow-tooltip label="留言人" width="100"></el-table-column>
            <el-table-column align="center" prop="authorId" show-overflow-tooltip label="给谁留言" width="100"></el-table-column>
            <el-table-column align="center" prop="time" sortable show-overflow-tooltip label="留言时间" width="170"></el-table-column>
            <el-table-column align="center" prop="email" sortable show-overflow-tooltip label="留言人邮箱" width="150"></el-table-column>
            <el-table-column align="center" prop="url" sortable label="留言人URL" show-overflow-tooltip width="150"></el-table-column>
            <el-table-column align="center" prop="state" sortable label="状态" width="100">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.state}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
    import {findByPage} from '@/api/comments'
    import Pagination from '@/components/Pagination'

    export default {
        name: "index",
        components: {Pagination},
        data() {
            return {
                list: null,
                loading: false,
                total: 0,
                listQuery: {
                    pageCode: 1,
                    pageSize: 10
                }
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.loading = true;
                findByPage(this.listQuery.pageCode, this.listQuery.pageSize).then(response => {
                    if (response.code == 20000) {
                        this.list = response.data.rows;
                        this.total = response.data.total;
                        this.loading = false;
                    }
                })
            },

            handleDelete(id) {

            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .comments-container {
        padding: 32px;
    }
</style>
