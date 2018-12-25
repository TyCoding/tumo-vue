<template>
    <div class="archives-container">
        <div class="main-content archive-page clearfix">
            <div class="categorys-item" v-for="item in list">
                <div class="categorys-title" v-text="item.date"></div>
                <div class="post-lists">
                    <div class="post-lists-body">
                        <div class="post-list-item" v-for="entity in item.articles">
                            <div class="post-list-item-container">
                                <div class="item-label">
                                    <div class="item-title">
                                        <a :href="'/article/' + entity.id" v-text="entity.title"></a>
                                    </div>
                                    <div class="item-meta clearfix">
                                        <div class="item-meta-date">发布于 {{entity.publishTime}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {findArchives} from '@/api/category'
    export default {
        name: "index",
        data() {
            return {
                list: null
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true;
                findArchives().then(response => {
                    if (response.code == 20000) {
                        this.list = response.data;
                        this.listLoading = false
                    }
                })
            },
        }
    }
</script>

<style scoped>
    @import '../../styles/site.css';
    .archives-container{
        background-color: #f7f7f7;
    }
</style>
