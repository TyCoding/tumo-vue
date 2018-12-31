<template>
    <div class="cover-container">
        <pic-card :list="list" @refushFlag="refushFlag"></pic-card>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageCode" :limit.sync="listQuery.pageSize"
                    @pagination="getList"/>
    </div>
</template>

<script>
    import {findByPage} from '@/api/article'
    import PicCard from './components/PicCard'
    import Pagination from '@/components/Pagination'

    export default {
        name: "index",
        components: {PicCard,Pagination},
        data() {
            return {
                list: null,
                listLoading: true,
                total: 0,
                listQuery: {
                    pageCode: 1,
                    pageSize: 12
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
            refushFlag(val) {
                console.log('父组件中接收到的值：' + val);
                if (val) {
                    this.getList();
                }
            }
        },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .cover-container{
        padding: 32px;
    }
</style>
