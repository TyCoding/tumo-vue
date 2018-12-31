<template>
    <div class="app-container">

        <!-- 查询和其他操作 -->
        <div class="filter-container">
            <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入对象名称"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
            <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                       @click="handleDownload">导出
            </el-button>
        </div>

        <!-- 查询结果 -->
        <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit
                  highlight-current-row>
            <el-table-column align="center" label="对象KEY" prop="key"/>
            <el-table-column align="center" label="对象名称" prop="name"/>
            <el-table-column align="center" label="对象类型" prop="type"/>
            <el-table-column align="center" label="对象大小" prop="size"/>
            <el-table-column align="center" property="url" label="预览图">
                <template slot-scope="scope">
                    <img :src="scope.row.url" width="40">
                </template>
            </el-table-column>
            <el-table-column align="center" label="链接地址" prop="url"/>
            <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="download(scope.row)">下载</el-button>
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加对话框 -->
        <el-dialog :visible.sync="createDialogVisible" title="上传对象">
            <el-upload :show-file-list="false" :limit="1" :http-request="handleUpload" action="#" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-dialog>

        <!-- 修改对话框 -->
        <el-dialog :visible.sync="updateDialogVisible" title="修改对象名称">
            <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left"
                     label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="对象名称" prop="newname">
                    <el-input v-model="dataForm.newname"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateData">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {list, updateOne, deleteOne, findOne, download, upload} from '@/api/storage'

    export default {
        name: 'Storage',
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    name: undefined,
                },
                createDialogVisible: false,
                dataForm: {
                    oldname: '',
                    newname: '',
                },
                updateDialogVisible: false,
                rules: {
                    newname: [{required: true, message: '对象名称不能为空', trigger: 'blur'}]
                },
                downloadLoading: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                list().then(response => {
                    this.list = response.data.rows
                    this.total = response.data.total
                    this.listLoading = false
                }).catch(() => {
                    this.list = []
                    this.total = 0
                    this.listLoading = false
                })
            },
            handleFilter() {
                this.listLoading = true;
                findOne(this.listQuery.name).then(response => {
                    this.list = response.data
                    this.listLoading = false;
                }).catch(() => {
                    this.list = []
                    this.total = 0
                    this.listLoading = false
                })
            },
            resetForm() {
                this.dataForm = {
                    oldname: '',
                    newname: ''
                }
            },
            handleCreate() {
                this.createDialogVisible = true
            },
            handleUpload(item) {
                const formData = new FormData()
                formData.append('file', item.file)
                upload(formData).then(response => {
                    // this.list.unshift(response.data.data)
                    this.createDialogVisible = false
                    this.$notify.success({
                        title: '成功',
                        message: '上传成功'
                    })
                    this.getList();
                }).catch(() => {
                    this.$message.error('上传失败，请重新上传')
                })
            },
            handleUpdate(row) {
                this.dataForm.oldname = row.name;
                this.dataForm.newname = row.name;
                this.updateDialogVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.dataForm);
                        updateOne(this.dataForm.oldname, this.dataForm.newname).then(() => {
                            for (const v of this.list) {
                                if (v.id === this.dataForm.id) {
                                    const index = this.list.indexOf(v)
                                    this.list.splice(index, 1, this.dataForm)
                                    break
                                }
                            }
                            this.updateDialogVisible = false
                            this.$notify.success({
                                title: '成功',
                                message: '更新成功'
                            })
                        }).catch(response => {
                            this.$notify.error({
                                title: '失败',
                                message: response.data
                            })
                        })
                    }
                })
            },
            handleDelete(row) {
                this.$confirm('你确定永久删除此分类信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    deleteOne(row.name).then(response => {
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
            handleDownload() {
                this.downloadLoading = true
                /*import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['ID', '对象KEY', '对象名称', '对象类型', '对象大小', '访问链接']
                    const filterVal = ['id', 'key', 'name', 'type', 'size', 'url']
                    excel.export_json_to_excel2(tHeader, this.list, filterVal, '对象存储信息')
                    this.downloadLoading = false
                })*/
            },

            download(row) {
                window.location.href = "http://127.0.0.1:8084/qiniu/download?name=" + row.name
            }
        }
    }
</script>
