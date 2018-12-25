<template>
    <div class="index-container">
        <div class="main-content index-page clearfix">
            <div class="post-lists">
                <div class="post-lists-body">
                    <div class="post-list-item" v-for="item in list">
                        <div class="post-list-item-container">
                            <div class="item-thumb bg-deepgrey" :style="'background-image:url(' + item.titlePic + ');'"></div>
                            <router-link :to="'/article/' + item.id">
                                <div class="item-desc">
                                    <p v-text="delHtmlTag(item.content)"></p>
                                </div>
                            </router-link>
                            <div class="item-slant reverse-slant bg-deepgrey"></div>
                            <div class="item-slant"></div>
                            <div class="item-label">
                                <div class="item-title">
                                    <router-link :to="'/article/' + item.id" v-text="item.title"></router-link>
                                </div>
                                <div class="item-meta clearfix">
                                    <div class="item-meta-ico bg-ico-note" style="background: url(http://cdn.tycoding.cn/tumo-bg-ico.png) no-repeat;background-size: 40px auto;"></div>
                                    <div class="item-meta-cat">
                                        <router-link :to="'/category/' + item.category" v-text="item.category"></router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lists-navigator clearfix">
                <ol class="page-navigator">
                    <li class="prev" v-if="listQuery.pageCode != '1'">
                        <router-link :to="'/page/' + ((listQuery.pageCode < 1) ? listQuery.pageCode : (listQuery.pageCode-1))">←</router-link>
                    </li>
                    <li v-for="i in total">
                        <router-link :style="i == listQuery.pageCode ? 'color: #eb5055;' : ''" :to="'/page/' + i" v-text="i"></router-link>
                    </li>
                    <li class="next" v-if="listQuery.pageCode < total">
                        <router-link :to="'/page/' + ((listQuery.pageCode < total) ? (listQuery.pageCode+1) : total)">→</router-link>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    import {findByPageForSite} from '@/api/article'
    export default {
        name: "index",
        data() {
            return {
                cp: this.$route.params.cp,
                list: null,
                listLoading: true,
                total: 0,
                listQuery: {
                    pageCode: 1,
                    pageSize: 6
                },
            }
        },
        created() {
            this.getList();
        },
        watch: {
            $route(to, from) {
                this.listQuery.pageCode = parseInt(to.params.cp);
                this.getList();
            }
        },
        methods: {
            getList() {
                this.listLoading = true;
                findByPageForSite(this.listQuery.pageCode, this.listQuery.pageSize).then(response => {
                    if (response.code == 20000) {
                        this.list = response.data.rows;
                        this.total = response.data.total;
                        this.listLoading = false
                    }
                })
            },
            //去掉所有的html标记
            delHtmlTag(str) {
                if (str != null && str != "") {
                    return str.replace(/<[^>]+>/g, "").substring(0, 49) + ' ...';
                }
            }
        }
    }
</script>

<style scoped>
    @import '../styles/site.css';
    .index-container {
        background-color: #f7f7f7;
    }
</style>
