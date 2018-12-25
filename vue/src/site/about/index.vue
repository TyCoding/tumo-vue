<template>
    <div class="about-container">
        <article role="pge-title-content" class="main-content page-page" itemscope itemtype="http://schema.org/Article">
            <div class="post-header">
                <h1 class="post-title" itemprop="name headline">关于</h1>
                <div class="post-data">
                    <time datetime="2017-09-17" itemprop="datePublished">发布于 2018-11-05</time>
                </div>
            </div>
            <div id="post-content" class="post-content">
                <header>
                    <div class="hello"><span>Hi! </span> My name is TyCoding.</div>
                </header>
                <label>I’m a Java Developer with an enduring interest in Coding and Write Blog.</label>
                <br/>
                <br/>
                <h1>About</h1>
                <p style="margin-bottom: 10px;">Hi! 你好，我是TyCoding, 专注Java开发， 喜欢代码艺术， 关注新技术</p>
                <p>喜欢运动， 音乐</p>
                <br/>
                <br/>
                <h1>Works</h1>
                <ul>
                    <li><a href="https://github.com/TyCoding/tumo">Tumo Blog:</a> 炒鸡漂亮的Java博客系统，基于SpringBoot-2.x实现</li>
                    <li><a href="https://github.com/TyCoding/springboot-seckill">springboot-seckill:</a>基于SpringBoot-2.x的Java高并发Seckill秒杀系统实现</li>
                    <li><a href="https://github.com/TyCoding/spring-boot">spring-boot:</a> SpringBoot-2.x入门开发</li>
                    <li><a href="https://github.com/TyCoding/ssm-redis-solr">ssm-redis-solr:</a>基于SSM、Shiro、Redis、Solr框架简单实现电商项目中搜索功能</li>
                    <li><a href="https://github.com/TyCoding/ssm">ssm:</a> Spring、SpringMVC、Mybatis框架整合开发</li>
                </ul>
                <br/>
                <br/>
                <h1>Concat</h1>
                <img src="http://cdn.tycoding.cn/qq.png">
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
    article[role="pge-title-content"] {
        padding-left: 41px;
    }

    article[role="pge-title-content"] header, article[role="pge-title-content"] header {
        padding-bottom: 19px;
        /*padding-top: 83px;*/
    }

    article[role="pge-title-content"] header h2, main[role="main-inner-wrapper"] article[role="pge-title-content"] header h2 {
        font-size: 46px;
        line-height: 53px;
        color: #404040;
        font-weight: 800;
    }

    article[role="pge-title-content"] header .hello{
        font-size: 46px;
        line-height: 53px;
        color: #404040;
        font-weight: 800;
        margin-top: 30px;
    }

    article[role="pge-title-content"] header .hello span{
        display: block;
        font-size: 80px;
        color: #fb5353;
        padding-bottom: 15px;
    }

    article[role="pge-title-content"] header h2 span, article[role="pge-title-content"] header h2 span {
        display: block;
        font-size: 80px;
        color: #fb5353;
        padding-bottom: 15px;
    }

    article[role="pge-title-content"] label, article[role="pge-title-content"] label {
        font-size: 20px;
        line-height: 30px;
        color: #454545;
    }

    article[role="pge-title-content"] ul li {
        font-size: 16px;
        line-height: 30px;
        color: #454545;
        margin-left: 18px;
    }

    article[role="pge-title-content"] ul li a {
        color: #00a8c6;
    }

    article[role="pge-title-content"] img {
        margin-left: -21px;
    }

    .el-menu--horizontal .el-menu [role="8-2"] a {
        color: #409EFF;
    }

    .el-submenu[role="8"] .el-submenu__title {
        color: #409EFF;
    }
    .el-submenu[role="8"] .el-submenu__title:hover {
        color: #409EFF;
    }
</style>
