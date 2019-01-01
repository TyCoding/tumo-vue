<template>
    <el-table :data="list" style="width: 100%;padding-top: 15px;">
        <el-table-column label="标题" min-width="200">
            <template slot-scope="scope">
                <router-link :to="'/article/' + (scope.row.id)" target="_blank">{{scope.row.title}}</router-link>
            </template>
        </el-table-column>
        <el-table-column label="分类" width="195" align="center">
            <template slot-scope="scope">
                {{ scope.row.category }}
            </template>
        </el-table-column>
        <el-table-column label="浏览量" width="100" align="center">
            <template slot-scope="scope">
                <el-tag> {{ scope.row.eyeCount }}</el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {findAllArticle} from '@/api/article'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    success: 'success',
                    pending: 'danger'
                }
                return statusMap[status]
            },
            orderNoFilter(str) {
                return str.substring(0, 30)
            }
        },
        data() {
            return {
                list: null
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                findAllArticle().then(response => {
                    this.list = response.data
                })
            }
        }
    }
</script>
