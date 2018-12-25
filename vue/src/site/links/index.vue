<template>
    <div class="link-container">
        <article class="main-content page-page">
            <div class="post-header">
                <h1 class="post-title" itemprop="name headline">友情链接</h1>
                <div class="post-data">
                    <time datetime="2017-09-17" itemprop="datePublished">发布于 2018-11-05</time>
                </div>
            </div>
            <div id="post-content" class="post-content">
                <h2>友情链接</h2>
                <ul>
                    <li v-for="link in list"><a :href="link.url" target="_blank" v-text="link.name"></a></li>
                </ul>
                <h2>链接须知</h2>
                <blockquote>
                    <p>请确定贵站可以稳定运营
                        原创博客优先，技术类博客优先，设计、视觉类博客优先
                        经常过来访问和评论，眼熟的</p>
                </blockquote>
                <h2>基本信息</h2>
                <ul>
                    <li>网站名称：Tumo博客</li>
                    <li>网站地址：http://tumo.tycoding.cn</li>
                </ul>
                <p>请在当页通过评论来申请友链，其他地方不予回复</p>
                <p>同时欢迎互换友链，在这个页面留言即可。 ^_^</p>
            </div>
        </article>

        <!-- 评论 -->
        <Comments></Comments>
    </div>
</template>

<script>
    import {findAll} from '@/api/links'
    import Comments from './components/Comments.vue'
    export default {
        name: "index",
        components: { Comments },
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
                findAll().then(response => {
                    if (response.code == 20000) {
                        this.list = response.data;
                        this.listLoading = false
                    }
                })
            },
        }
    }
</script>

<style src="../../styles/site.css"></style>
<style scoped>
    .link-container{
        background-color: #f7f7f7;
    }

</style>
