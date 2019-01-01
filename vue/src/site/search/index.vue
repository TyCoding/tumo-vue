<template>
    <div class="search-container">
        <div class="main-content archive-page clearfix">
            <div class="categorys-item">
                <div class="categorys-title">
                    搜索： {{qu}}
                </div>
                <div class="post-lists" v-if="list > 0">
                    <div class="post-lists-body">
                        <div class="post-list-item" v-for="item in list">
                            <div class="post-list-item-container">
                                <div class="item-label">
                                    <div class="item-title">
                                        <router-link to="'/article/' + item.id" v-text="item.title"></router-link>
                                    </div>
                                    <div class="item-meta clearfix">
                                        <div class="item-meta-date">发布于 {{item.publishTime}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div v-else>
                    <p>抱歉，没有搜索到相关文章.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {search} from '@/api/article'
    export default {
        name: "index",
        data() {
            return {
                list: [],
                qu: this.$route.params.qu
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true;
                search(this.qu).then(response => {
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
    .search-container{
        background-color: #f7f7f7;
    }
</style>
