<template>
    <div class="links-container">
        <!-- 列表 -->
        <el-table :data="list" border tooltip-effect="dark" style="width: 100%">
            <el-table-column ref="selection" align="center" type="selection" width="55"></el-table-column>
            <el-table-column prop="id" align="center" sortable fixed label="编号" show-overflow-tooltip width="200"></el-table-column>
            <el-table-column align="center" prop="lName" label="友链名称" width="400" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="url" label="链接地址" width="400" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                    <el-button size="mini" icon="el-icon-edit" type="warning">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {findByPage} from "@/api/links";

    export default {
        name: "index",
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
    .links-container{
        padding: 32px;
    }
</style>
