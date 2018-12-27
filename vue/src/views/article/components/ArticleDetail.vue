<template>
    <div class="createPost-container">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

            <sticky :class-name="'sub-navbar '+postForm.status">
                <CommentDropdown v-model="postForm.comment_disabled"/>
                <PlatformDropdown v-model="postForm.platforms"/>
                <SourceUrlDropdown v-model="postForm.origin"/>
                <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布</el-button>
                <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
            </sticky>

            <div class="createPost-main-container">
                <el-row>
                    <el-col :span="24">
                        <el-form-item style="margin-bottom: 40px;" prop="title">
                            <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                                标题
                            </MDinput>
                        </el-form-item>

                        <div class="postInfo-container">
                            <el-row>
                                <el-col :span="8" :xs="{span: 24}" :sm="{span: 24}" :md="{span: 8}" :lg="{span: 8}" :xl="{span: 8}">
                                    <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
                                        <el-input v-model="postForm.author" placeholder="文章作者" style="min-width: 195px;"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10" :xs="{span: 24}" :sm="{span: 24}" :md="{span: 8}" :lg="{span: 8}" :xl="{span: 8}">
                                    <el-form-item label-width="72px" label="发布时间:" class="postInfo-container-item">
                                        <el-date-picker v-model="postForm.publishTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                                                        format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6" :xs="{span: 24}" :sm="{span: 24}" :md="{span: 8}" :lg="{span: 8}" :xl="{span: 8}">
                                    <el-form-item label-width="60px" label="重要性:" class="postInfo-container-item">
                                        <el-rate v-model="postForm.importance" :max="3"
                                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                            :low-threshold="1"
                                            :high-threshold="3"
                                            style="margin-top:8px;"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="8" :xs="{span: 24}" :sm="{span: 24}" :md="{span: 8}" :lg="{span: 8}" :xl="{span: 8}">
                                    <el-form-item label-width="45px" label="分类:" class="postInfo-container-item">
                                        <el-tooltip class="item" effect="dark" content="下拉框中没有？可直接键入" placement="top-start">
                                            <el-select v-model="postForm.category" allow-create filterable placeholder="请选择文章分类">
                                                <el-option
                                                    v-for="item in userListOptions" :key="item.value"
                                                    :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-tooltip>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" :xs="{span: 24}" :sm="{span: 24}" :md="{span: 16}" :lg="{span: 16}" :xl="{span: 16}">
                                    <el-tag :key="tag" v-for="tag in dynamicTags" closable
                                        :disable-transitions="false" @close="handleCloseTag(tag)">
                                        {{tag}}
                                    </el-tag>
                                    <el-input class="input-new-tag" v-if="inputVisible" v-model="postForm.tags"
                                        ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
                                        @blur="handleInputConfirm"></el-input>
                                    <el-button v-else size="small" @click="showInput">+文章标签
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>

                <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
                    <el-input :rows="1" v-model="postForm.content_short" type="textarea" class="article-textarea"
                              autosize placeholder="请输入内容"/>
                    <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
                </el-form-item>

                <div class="tinymce-container editor-container">
                    <!-- Markdown富文本组件 -->
                    <markdown :content="postForm.contentMd" @editor="editor"></markdown>
                    <div class="editor-custom-btn-container">
                        <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
                    </div>
                </div>

                <!--<div style="margin-bottom: 20px;">
                    <Upload v-model="postForm.title_pic"/>
                </div>-->
            </div>
        </el-form>

    </div>
</template>

<script>
    import editorImage from '@/components/Upload/editorImage'
    import markdown from './markdown'
    import Upload from '@/components/Upload/singleImage3'
    import MDinput from '@/components/MDinput'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import {validateURL} from '@/utils/validate'
    import {findById} from '@/api/article'
    import {userSearch} from '@/api/remoteSearch'
    import Warning from './Warning'
    import {CommentDropdown, PlatformDropdown, SourceUrlDropdown} from './Dropdown'

    const defaultForm = {
        status: 'draft',
        title: '', // 文章题目
        contentMd: '', // 文章内容
        content_short: '', // 文章摘要
        origin: '', // 文章外链
        titlePic: '', // 文章图片
        publishTime: undefined, // 前台展示时间
        id: undefined,
        platforms: ['a-platform'],
        comment_disabled: false,
        importance: 0,
        category: '',
        tags: '',
    };

    export default {
        name: 'ArticleDetail',
        components: {markdown, editorImage, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const validateRequire = (rule, value, callback) => {
                if (value === '') {
                    this.$message({
                        message: rule.field + '为必传项',
                        type: 'error'
                    });
                    callback(new Error(rule.field + '为必传项'))
                } else {
                    callback()
                }
            };
            const validateSourceUri = (rule, value, callback) => {
                if (value) {
                    if (validateURL(value)) {
                        callback()
                    } else {
                        this.$message({
                            message: '外链url填写不正确',
                            type: 'error'
                        });
                        callback(new Error('外链url填写不正确'))
                    }
                } else {
                    callback()
                }
            };
            return {
                postForm: Object.assign({}, defaultForm),
                loading: false,
                userListOptions: [],
                rules: {
                    titlePic: [{validator: validateRequire}],
                    title: [{validator: validateRequire}],
                    content: [{validator: validateRequire}],
                    origin: [{validator: validateSourceUri, trigger: 'blur'}]
                },

                //tags
                dynamicTags: [],
                inputVisible: false,

                tempRoute: {}
            }
        },
        computed: {
            contentShortLength() {
                return this.postForm.content_short.length
            },
            lang() {
                return this.$store.getters.language
            }
        },
        created() {
            if (this.isEdit) { //说明是编辑文章的，获取路由传递的id
                const id = this.$route.params && this.$route.params.id;
                this.fetchData(id)
            } else {
                this.postForm = Object.assign({}, defaultForm)
            }

            // Why need to make a copy of this.$route here?
            // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
            // https://github.com/PanJiaChen/vue-element-admin/issues/1221
            this.tempRoute = Object.assign({}, this.$route)
        },
        methods: {
            fetchData(id) {
                findById(id).then(response => {
                    this.postForm = response.data;
                    // Just for test
                    this.postForm.title += `   Article Id:${this.postForm.id}`;
                    this.postForm.content_short += `   Article Id:${this.postForm.id}`;

                    // Set tagsview title
                    this.setTagsViewTitle()
                }).catch(err => {
                    console.log(err)
                })
            },
            setTagsViewTitle() {
                const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article';
                const route = Object.assign({}, this.tempRoute, {title: `${title}-${this.postForm.id}`});
                this.$store.dispatch('updateVisitedView', route)
            },
            submitForm() {
                this.postForm.tags = JSON.stringify(this.dynamicTags); //给tags字段赋值
                this.postForm.publishTime = parseInt(this.publishTime / 1000);
                console.log(this.postForm);
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$notify({
                            title: '成功',
                            message: '发布文章成功',
                            type: 'success',
                            duration: 2000
                        });
                        this.postForm.status = 'published';
                        this.loading = false
                    } else {
                        console.log('error submit!!');
                        return false
                    }
                })
            },
            draftForm() {
                this.postForm.tags = JSON.stringify(this.dynamicTags); //给tags字段赋值
                if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
                    this.$message({
                        message: '请填写必要的标题和内容',
                        type: 'warning'
                    });
                    return
                }
                this.$message({
                    message: '保存成功',
                    type: 'success',
                    showClose: true,
                    duration: 1000
                });
                this.postForm.status = 'draft'
            },
            getRemoteUserList(query) {
                userSearch(query).then(response => {
                    if (!response.data.items) return;
                    this.userListOptions = response.data.items.map(v => v.name);
                })
            },
            imageSuccessCBK(arr) {
                console.log(arr);
                const _this = this;
                arr.forEach(v => {
                })
            },
            editor(val){
                this.postForm.contentMd = val.md;
                this.postForm.content = val.html;
            },

            //===============标签==================
            handleCloseTag(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.postForm.tags;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.postForm.tags = '';
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "~@/styles/mixin.scss";

    .createPost-container {
        position: relative;
        .createPost-main-container {
            padding: 40px 45px 20px 50px;
            .postInfo-container {
                position: relative;
                @include clearfix;
                margin-bottom: 10px;
                .postInfo-container-item {
                    float: left;
                }
            }
            .editor-container {
                min-height: 500px;
                margin: 0 0 30px;
                .editor-upload-btn-container {
                    text-align: right;
                    margin-right: 10px;
                    .editor-upload-btn {
                        display: inline-block;
                    }
                }
            }
        }
        .word-counter {
            width: 40px;
            position: absolute;
            right: -10px;
            top: 0px;
        }
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .tinymce-container {
        position: relative;
    }

    .tinymce-container >>> .mce-fullscreen {
        z-index: 10000;
    }

    .tinymce-textarea {
        visibility: hidden;
        z-index: -1;
    }

    .editor-custom-btn-container {
        position: absolute;
        right: 4px;
        top: 4px;
        /*z-index: 2005;*/
    }

    .fullscreen .editor-custom-btn-container {
        z-index: 10000;
        position: fixed;
    }

    .editor-upload-btn {
        display: inline-block;
    }
    .el-button--mini, .el-button--mini.is-round {
        padding: 6px 15px;
    }
</style>
