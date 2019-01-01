<template>
    <div class="api-container">
        <el-alert title="注意：目前博客登录、用户接口不够规范，后期会再完善。前端所有的请求接口都在`/src/vue/api/`中定义。所有的后端接口都只返回JSON格式数据，可用postman等工具查询接口返回数据格式" type="error"></el-alert>
        <br/>
        <el-alert title="为博客前台服务的接口，即根路径下的路由" type="success" show-icon :closable="false"></el-alert>
        <el-collapse>
            <el-collapse-item v-for="list in doc_site" :key="list.id">
                <template slot="title">
                    <i class="header-icon el-icon-info"></i>
                    {{list.title}}
                </template>
                <div class="tips-item" v-for="item in list.data" :key="item.id">
                    <div class="tips-item-api">{{item.api}}<span style="float: right">{{item.method}}</span></div>
                    <div class="tips-item-note">{{item.note}}</div>
                </div>
            </el-collapse-item>
        </el-collapse>
        <br/>
        <el-alert title="博客后端，即`/admin`下的路由" type="success" show-icon :closable="false"></el-alert>
        <el-collapse>
            <el-collapse-item v-for="list in doc_admin" :key="list.id">
                <template slot="title">
                    <i class="header-icon el-icon-info"></i>
                    {{list.title}}
                </template>
                <div class="tips-item" v-for="item in list.data" :key="item.id">
                    <div class="tips-item-api">{{item.api}}<span style="float: right">{{item.method}}</span></div>
                    <div class="tips-item-note">{{item.note}}</div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        name: "API",
        data() {
            return {
                doc_site: [
                    {
                        title: "公共接口，页面Footer调用",
                        data: [
                            { api: '/article/findAll', method: 'get', note: '获取最新文章，默认倒叙查询最新的8条记录' },
                            { api: '/comments/findAll', method: 'get', note: '获取最新评论，默认倒叙查询最新的8条记录' },
                        ]
                    },
                    {
                        title: "首页接口",
                        data: [
                            { api: '/article/findByPageForSite?pageCode=1&pageSize=6', method: 'post', note: '分页查询，该接口只为博客前台服务。pageCode当前页；pageSize每页记录数' },
                        ]
                    },
                    {
                        title: "文章详情页接口",
                        data: [
                            { api: '/article/findById?id=1', method: 'get', note: '获取当前文章信息，id来自路由跳转携带的参数' },
                            { api: '/comments/findCountByArticleId?articleId=7', method: 'get', note: '获取当前文章的评论数量' },
                            { api: '/comments/findCommentsList?pageCode=1&pageSize=6&articleId=7&sort=0', method: 'get', note: '获取当前文章评论数据。pageCode当前页；pageSize每页记录数；sort分类：0文章详情页、1友链页、2关于我页' },
                            { api: '/comments/findCountByArticleId?articleId=7', method: 'get', note: '获取当前文章的评论数量' },
                        ]
                    },
                    {
                        title: "其它页",
                        data: [
                            { api: '/article/findArchives', method: 'get', note: '获取文章归档' },
                            { api: '/links/findAll', method: 'get', note: '获取所有的友链数据' },
                            { api: '/article/search?title=xx', method: 'get', note: '根据文章标题模糊查询文章归档，title来自路由跳转携带的参数' },
                        ]
                    },
                ],
                doc_admin: [
                    {
                        title: "Login",
                        data: [
                            { api: '/admin/login', method: 'get', note: '登录接口。username:用户名；password:密码；remember:是否记住我' },
                            { api: '/user/info', method: 'get', note: '验证登录状态接口。token:登录名' },
                            { api: '/user/logout', method: 'get', note: '重写退出登录接口，Shiro提供的登录接口会自动跳转到项目根路径下' },
                        ]
                    },
                    {
                        title: "/article",
                        data: [
                            { api: '/article/findAll', method: 'get', note: '获取所有文章，默认只倒叙查询最新的10条记录' },
                            { api: '/article/findByPage', method: 'post', note: '分页查询。Article:封装查询信息的对象；pageCode:当前页；pageSize:每页的记录数' },
                            { api: '/article/search', method: 'get', note: '仅为博客前台服务，根据文章标题模糊查询。title:文章标题' },
                            { api: '/article/findByPageForSite', method: 'get', note: '仅为博客前台服务' },
                            { api: '/article/findById', method: 'get', note: '根据ID查询' },
                            { api: '/article/findTags', method: 'get', note: '查询当前文章所有关联的标签。id:文章ID' },
                            { api: '/article/findArchives', method: 'get', note: '仅为博客前台服务，查询文章归档数据' },
                            { api: '/article/save', method: 'post', note: '保存，必须是JSON格式' },
                            { api: '/article/update', method: 'put', note: '更新，必须是JSON格式' },
                            { api: '/article/delete', method: 'post', note: '批量删除接口，前端要传递JSON格式的ID数组' },
                        ]
                    },
                    {
                        title: "/category",
                        data: [
                            { api: '/category/findAll', method: 'get', note: '获取所有数据' },
                            { api: '/category/findByPage', method: 'post', note: '分页查询。Category:封装查询信息的对象；pageCode:当前页；pageSize:每页的记录数' },
                            { api: '/category/findById', method: 'get', note: '根据ID查询' },
                            { api: '/category/save', method: 'post', note: '保存，必须是JSON格式' },
                            { api: '/category/update', method: 'put', note: '更新，必须是JSON格式' },
                            { api: '/category/delete', method: 'post', note: '批量删除接口，前端要传递JSON格式的ID数组' },
                        ]
                    },
                    {
                        title: "/comments",
                        data: [
                            { api: '/comments/findAll', method: 'get', note: '获取所有数据' },
                            { api: '/comments/findByPage', method: 'post', note: '分页查询。Comments:封装查询信息的对象；pageCode:当前页；pageSize:每页的记录数' },
                            { api: '/comments/findCountByArticleId', method: 'get', note: '根据文章ID查询旗下所有评论数量' },
                            { api: '/comments/findCommentsList', method: 'get', note: '仅为博客前台服务，分页查询并过滤留言数据' },
                            { api: '/comments/findById', method: 'get', note: '根据ID查询' },
                            { api: '/comments/save', method: 'post', note: '保存，必须是JSON格式' },
                            { api: '/comments/update', method: 'put', note: '更新，必须是JSON格式' },
                            { api: '/comments/delete', method: 'post', note: '批量删除接口，前端要传递JSON格式的ID数组' },
                        ]
                    },
                    {
                        title: "/links",
                        data: [
                            { api: '/links/findAll', method: 'get', note: '获取所有数据' },
                            { api: '/links/findByPage', method: 'post', note: '分页查询。Links:封装查询信息的对象；pageCode:当前页；pageSize:每页的记录数' },
                            { api: '/links/findById', method: 'get', note: '根据ID查询' },
                            { api: '/links/save', method: 'post', note: '保存，必须是JSON格式' },
                            { api: '/links/update', method: 'put', note: '更新，必须是JSON格式' },
                            { api: '/links/delete', method: 'post', note: '批量删除接口，前端要传递JSON格式的ID数组' },
                        ]
                    },
                    {
                        title: "/tags",
                        data: [
                            { api: '/tags/findAll', method: 'get', note: '获取所有数据' },
                            { api: '/tags/findByPage', method: 'post', note: '分页查询。Tags:封装查询信息的对象；pageCode:当前页；pageSize:每页的记录数' },
                            { api: '/tags/findById', method: 'get', note: '根据ID查询' },
                            { api: '/tags/save', method: 'post', note: '保存，必须是JSON格式' },
                            { api: '/tags/update', method: 'put', note: '更新，必须是JSON格式' },
                            { api: '/tags/delete', method: 'post', note: '批量删除接口，前端要传递JSON格式的ID数组' },
                        ]
                    },
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
                width: 38%;
            }
            .tips-item-note {
                display: inline-block;
                margin-left: 15px;
                font-size: 13px;
            }
        }
    }
</style>
