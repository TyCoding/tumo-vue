<template>
    <div>
        <el-card class="card-tags">
            <div slot="header">
                <span>标签列表</span>
                <el-button type="info" style="float: right;padding: 7px 1pc 6px 17px;color:#fff;" @click="dialogVisible = true">添加</el-button>
            </div>
            <!-- 列表 -->
            <el-table ref="tags" :data="list" border tooltip-effect="dark" style="width: 100%">
                <el-table-column prop="id" align="center" sortable label="编号" show-overflow-tooltip width="80"></el-table-column>
                <el-table-column min-width="300px" label="标签名称">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.name" class="edit-input" size="mini"/>
                            <el-button class="cancel-btn" size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
                        </template>
                        <span v-else>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" type="success" size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">Ok</el-button>
                        <el-button v-else type="primary" size="mini" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">Edit</el-button>
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageCode" :limit.sync="listQuery.pageSize"
                        @pagination="getList"/>
        </el-card>

        <!-- 标签添加 -->
        <el-dialog title="新增标签" :visible.sync="dialogVisible" width="30%" :append-to-body='true'
            :before-close="handleClose">
        <span>
            <el-input placeholder="请输入标签名称" v-model="editor.name">
                <template slot="prepend">标签名称</template>
            </el-input>
        </span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
        </span>
        </el-dialog>

    </div>
</template>

<script>
    import { findByPage,deleteById,save,update } from '@/api/tags'
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    export default {
        name: "Tags",
        components: {Pagination},
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                }
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
                    pageSize: 6
                },
                editor: {
                    id: '',
                    name: ''
                },
                dialogVisible: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                findByPage(this.listQuery.pageCode, this.listQuery.pageSize).then(response => {
                    this.total = response.data.total;
                    const items = response.data

                    this.list = items.rows.map(v => {
                        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
                        return v
                    })
                    this.listLoading = false
                })
            },
            cancelEdit(row) {
                row.edit = false
                this.$message({
                    message: 'The name has been restored to the original value',
                    type: 'warning'
                })
            },
            confirmEdit(row) {
                row.edit = false
                this.editor = row
                update(this.editor).then(response => {
                    var flag = 'success';
                    if (response.code != 20000) {
                        flag = 'error'
                    }
                    this.$message({
                        type: flag,
                        message: response.data,
                        duration: 6000
                    });
                    this.getList();
                    this.editor = {}
                });
            },
            /*getList() {
                this.listLoading = true;
                findByPage(this.listQuery.pageCode, this.listQuery.pageSize).then(response => {
                    if (response.code == 20000) {
                        this.list = response.data.rows;
                        this.total = response.data.total;
                        this.listLoading = false
                    }
                })
            },*/

            handleDelete(id){
                this.$confirm('你确定永久删除此分类信息？', '提示', {
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
                        this.getList();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration: 6000
                    });
                });
            },
            handleSave() {
                this.dialogVisible = false;
                save(this.editor).then(response => {
                    if (response.code == 20000) {
                        this.$notify({
                            title: '成功',
                            message: response.data,
                            type: 'success',
                            duration: 2000
                        });
                        this.editor = {};
                        this.getList();
                    } else {
                        this.$notify({
                            title: '失败',
                            message: response.data,
                            type: 'warning',
                            duration: 2000
                        });
                    }
                })
            },
            handleClose() {
                this.dialogVisible = false;
            }
        }
    }
</script>

<style scoped>
    .edit-input {
        padding-right: 100px;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }
</style>
