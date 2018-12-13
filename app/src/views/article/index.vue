<template>
    <div class="app-container">
        <el-table
            :data="list"
            border
            style="width: 100%">
            <el-table-column
                ref="selection"
                align="center"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="id"
                align="center"
                sortable
                fixed
                show-overflow-tooltip
                label="编号"
                width="80">
            </el-table-column>
            <el-table-column
                align="center"
                prop="title"
                label="文章标题"
                width="260"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                align="center"
                prop="author"
                sortable
                show-overflow-tooltip
                label="文章作者"
                width="120">
            </el-table-column>
            <el-table-column
                align="center"
                prop="createTime"
                sortable
                label="创建时间"
                width="170">
            </el-table-column>
            <el-table-column
                align="center"
                prop="editTime"
                sortable
                label="最后编辑时间"
                width="170">
            </el-table-column>
            <el-table-column
                align="center"
                prop="publishTime"
                sortable
                label="发布时间"
                width="170">
            </el-table-column>
            <el-table-column
                align="center"
                prop="category"
                show-overflow-tooltip
                label="文章分类"
                width="130">
            </el-table-column>
            <el-table-column
                align="center"
                prop="state"
                sortable
                label="状态"
                width="120">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.state == '1' ? '已发布':'存入草稿'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        icon="el-icon-delete"
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)">删除
                    </el-button>
                    <el-button size="mini" icon="el-icon-edit" type="warning">编辑</el-button>
                    <el-button size="mini" icon="el-icon-view" type="primary">预览</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {findAll} from '@/api/article'

    export default {
        name: "index",
        data() {
            return {
                list: null,
                loading: false
            }
        },
        created() {
            this.findAll();
        },
        methods: {
            findAll() {
                this.loading = true;
                findAll().then(result => {
                    if (result.code == 20000) {
                        this.list = result.data;
                    }
                    this.loading = false;
                })
            },

            handleDelete(id) {

            }
        },
    }
</script>

<style scoped>

</style>
