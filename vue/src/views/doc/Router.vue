<template>
    <div class="api-container">
        <el-alert title="注意：所有的路由地址都在`/vue/src/router/`下定义。全局拦截器：`/src/permission.js`、`src/utils/request.js`"
                  type="error"></el-alert>
        <br/>
        <el-alert title="为博客前台服务的接口，即根路径下的路由" type="success" show-icon :closable="false"></el-alert>
        <br/>
        <div class="tips-item" v-for="item in doc_site" :key="item.id">
            <div class="tips-item-api">
                <el-row :gutter="32">
                    <el-col :xs="24" :sm="24" :lg="8">
                        {{item.api}}
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                        <span style="float: left">{{item.param}}</span>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                        <span style="float: left">{{item.component}}</span>
                    </el-col>
                </el-row>
            </div>
            <div class="tips-item-note">{{item.note}}</div>
        </div>
        <br/>
        <br/>
        <el-alert title="博客后台，即`/admin`下的路由" type="success" show-icon :closable="false"></el-alert>
        <br/>
        <div class="tips-item" v-for="item in doc_admin" :key="item.id">
            <div class="tips-item-api">
                <el-row :gutter="32">
                    <el-col :xs="24" :sm="24" :lg="8">
                        {{item.api}}
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                        <span style="float: left">{{item.param}}</span>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                        <span style="float: left">{{item.component}}</span>
                    </el-col>
                </el-row>
            </div>
            <div class="tips-item-note">{{item.note}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Router",
        data() {
            return {
                doc_site: [
                    {api: '/', param: 'null', component: '@/site/index', note: '首页'},
                    {api: '/page/:cp', param: 'cp', component: '@/site/index', note: '首页的下一页数据，携带cp页码'},
                    {api: '/article/:id', param: 'id', component: '@/site/detail/index', note: '文章详情页，携带ID值'},
                    {api: '/archives', param: 'null', component: '@/site/archives/index', note: '归档页'},
                    {api: '/links', param: 'null', component: '@/site/links/index', note: '友链页'},
                    {api: '/about', param: 'null', component: '@/site/about/index', note: '关于我页'},
                    {api: '/search/:qu', param: 'qu', component: '@/site/search/index', note: '搜索页，携带qu查询值'},
                ],
                doc_admin: [
                    {api: '/login', param: 'null', component: '@/views/login/index', note: '登录页'},
                    {api: '/redirect', param: '/redirect/:path*', component: '@/views/redirect/index', note: '路由重定向，携带重定向的地址'},
                    {api: '/admin', param: 'redirect: /admin/dashboard', component: '@/views/dashboard/index', note: '后台首页，重定向到dashboard页'},
                    {api: '/admin/doc', param: 'null', component: 'null', note: '下拉菜单'},
                    {api: '/admin/doc/api', param: 'null', component: '@/views/doc/API', note: 'API文档页'},
                    {api: '/admin/doc/router', param: 'null', component: '@/views/doc/Router', note: 'Router路由页'},
                    {api: '/admin/article', param: 'null', component: 'null', note: '下拉菜单'},
                    {api: '/admin/article/create', param: 'null', component: '@/views/article/create', note: '新建文章页'},
                    {api: '/admin/article/edit/:id(\\d+)', param: 'id', component: '@/views/article/edit', note: '编辑文章页'},
                    {api: '/admin/article/list', param: 'null', component: '@/views/article/list', note: '文章列表页'},
                    {api: '/admin/comments', param: 'null', component: '@/views/comments/index', note: '评论管理页'},
                    {api: '/admin/cover', param: 'null', component: '@/views/cover/index', note: '封面管理页'},
                    {api: '/admin/links', param: 'null', component: '@/views/links/index', note: '友链管理页'},
                    {api: '/admin/tags', param: 'null', component: '@/views/tags/index', note: '分类/标签管理页'},
                    {api: '/admin/file', param: 'null', component: 'null', note: '下拉菜单'},
                    {api: '/admin/file/os', param: 'null', component: '@/views/file/OS', note: '对象储存页'},
                    {api: '/admin/file/localOS', param: 'null', component: '@/views/file/LocalOS', note: ''},
                    {api: '/admin/system', param: 'null', component: '@/views/system/index', note: '系统管理页'},
                    {api: '*', param: 'redirect: /404', component: '@/views/404', note: '404页'},
                ]
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .api-container {
        padding: 32px;
        .el-collapse {
            margin-left: 18px;
        }
        .tips-item {
            margin-left: 40px;
            .tips-item-api {
                background-color: #fdf6ec;
                color: #e6a23c;
                padding: 8px 16px;
                display: inline-block;
                width: 50%;
            }
            .tips-item-note {
                display: inline-block;
                margin-left: 15px;
                font-size: 13px;
                display: inline-block;
                position: absolute;
                padding-top: 11px;
            }
        }
    }
</style>
