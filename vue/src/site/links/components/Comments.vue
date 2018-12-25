<template>
    <div class="comment-container">
        <div id="comments" ref="comments" class="clearfix">
            <span class="response"></span>
            <!-- 表单 -->
            <div id="comment-form" class="comment-form">
                <input maxlength="12" v-model="comments.author" class="form-control input-control clearfix" placeholder="姓名 (*)" value="" required/>
                <input type="email" v-model="comments.email" class="form-control input-control clearfix" placeholder="邮箱 (*)" value="" required/>
                <input type="url" v-model="comments.url" class="form-control input-control clearfix" placeholder="网址 (http://)" value=""/>
                <textarea v-model="comments.content" class="form-control" :placeholder="holder" required minlength="5" maxlength="2000"></textarea>
                <button type="button" class="submit" @click="subComment">提交</button>
            </div>
            <!-- 列表 -->
            <ol class="comment-list" v-if="total > 0">
                <li v-for="comment in list" :id="'li-comment-' + comment.parent.id" class="comment-body comment-parent comment-odd">
                    <div :id="'comment-' + comment.parent.id">
                        <div class="comment-view">
                            <div class="comment-header">
                                <img class="avatar" src="http://cdn.tycoding.cn/author.png" width="80" height="80">
                                <span class="comment-author">
                                    <a :href="comment.parent.url" target="_blank" rel="external nofollow" v-text="comment.parent.author"></a>
                                </span>
                            </div>
                            <div class="comment-content">
                                <span class="comment-author-at"></span>
                                <p><p v-text="comment.parent.content"></p></p>
                            </div>
                            <div class="comment-meta">
                                <time class="comment-time" v-text="comment.parent.time"></time>
                                <span class="comment-reply">
                                <a rel="nofollow" @click="reply(comment.parent.author, comment.parent.id)">回复</a>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div class="comment-children" v-if="comment.childrenList != '[]'">
                        <ol class="comment-list">
                            <li v-for="item in comment.childrenList" :id="'li-comment-' + item.id" class="comment-body comment-child comment-level-odd comment-odd">
                                <div :id="'comment-' + item.id">
                                    <div class="comment-view">
                                        <div class="comment-header">
                                            <img class="avatar" src="http://cdn.tycoding.cn/author.png" width="80" height="80">
                                            <span class="comment-author comment-by-author">
                                                <a :href="item.url" target="_blank" rel="external nofollow" v-text="item.author"></a>
                                            </span>
                                        </div>
                                        <div class="comment-content">
                                        <span class="comment-author-at">
                                            <a :href="'#comment-' + (item.cId == 0 ? item.pId : item.cId)" v-text="item.authorId"></a>
                                        </span>
                                            <p><p v-text="item.content"></p></p>
                                        </div>
                                        <div class="comment-meta">
                                            <time class="comment-time" v-text="item.time"></time>
                                            <span class="comment-reply">
                                                <a rel="nofollow" @click="reply(item.author, item.pId, item.id)">回复</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </li>
            </ol>

            <div class="lists-navigator clearfix">
                <ol class="page-navigator" v-if="total > 0">
                    <li class="prev" v-if="listQuery.pageCode != '1'">
                        <router-link :to="'?cp=' + ((listQuery.pageCode < 1) ? listQuery.pageCode : (listQuery.pageCode-1)) + '#comments'">←</router-link>
                    </li>
                    <li v-for="i in total">
                        <router-link :style="i == listQuery.pageCode ? 'color: #eb5055;' : ''" :to="'?cp=' + i + '#comments'" v-text="i"></router-link>
                    </li>
                    <li class="next" v-if="listQuery.pageCode < total">
                        <router-link :to="'?cp=' + ((listQuery.pageCode < total) ? (listQuery.pageCode+1) : total) + '#comments'">→</router-link>
                    </li>
                </ol>
            </div>
        </div>
    </div>

</template>

<script>
    import {findCommentsList,save} from '@/api/comments'
    import {getUrlKey} from '@/utils/url'
    export default {
        name: "Comments",
        data() {
            return {
                list: null,
                total: '',
                listLoading: true,
                id: 0,
                listQuery: {
                    pageCode: 1,
                    pageSize: 6
                },
                holder: '回复',
                comments: {
                    pId: '',
                    cId: '',
                    author: '',
                    authorId: '',
                    email: '',
                    content: '',
                    url: '',
                    sort: 0,
                },
                article: null,
            }
        },
        created() {
            this.findCommentsList();
        },
        watch: {
            $route(to, from) {
                this.listQuery.pageCode = getUrlKey('cp');
                this.findCommentsList();
            },
        },
        methods: {
            findCommentsList() {
                this.listLoading = true;
                findCommentsList(this.listQuery.pageCode, this.listQuery.pageSize, this.id, 1).then(response => {
                    if (response.code == 20000) {
                        this.list = response.data.rows;
                        this.total = response.data.total;
                        this.listLoading = false
                    }
                })
            },
            reply(author, pId, cId){
                var element = document.getElementById('comments');
                element.scrollIntoView(); //让页面滚动到指定区域
                this.holder = '回复 ' + author;
                this.comments.authorId = '@' + author;
                this.comments.pId = pId;
                this.comments.cId = cId;
            },
            subComment(){
                save(this.comments).then(response => {
                    if (response.code == 20000) {
                        this.$message({
                            showClose: true,
                            message: '留言成功',
                            type: 'success'
                        });
                    }
                    this.comments.pId = '';
                    this.comments.author = '';
                    this.comments.cId = '';
                    this.comments.content = '';
                    this.comments.email = '';
                    this.comments.url = '';
                    this.holder = '回复';
                    this.findCommentsList();
                });
            }
        },
    }
</script>

<style scoped>
    @import "../../../styles/site.css";
</style>
