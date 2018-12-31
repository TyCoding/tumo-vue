<template>
    <div class="editor-container">
        <markdown-editor ref="markdownEditor" v-model="md" height="600px"></markdown-editor>
        <div class="editor-custom-btn-container">
            <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
        </div>
    </div>
</template>

<script>
    import MarkdownEditor from '@/components/MarkdownEditor'
    import editorImage from '@/components/Upload/editorImage'

    export default {
        name: 'markdown',
        components: {MarkdownEditor,editorImage},
        props: ['content'],
        data() {
            return {
                markdownId: this.id,
                md: '',
                editor: {
                    md: '',
                    html: '',
                },
                languageTypeList: {
                    'en': 'en_US',
                    'zh': 'zh_CN',
                    'es': 'es_ES'
                }
            }
        },
        watch: {
            content(newVal, oldVal) {
                this.md = newVal; //监听父组件传来的content数据，只会执行一次，用来给子组件赋初始值
            },
            md(newVal, oldVal) {
                //监听子组件中数据
                this.editor.html = this.$refs.markdownEditor.getHtml();
                this.editor.md = newVal;
                this.$emit('editor', this.editor);
            }
        },
        computed: {
            language() {
                return this.languageTypeList[this.$store.getters.language]
            }

        },
        methods: {
            //获取到文件上传组件上传的所有图片信息
            imageSuccessCBK(arr) {
                /**
                 * [{…}]
                 * 0
                 * hasSuccess: true
                 * height: 141
                 * uid: 1546058194268
                 * url: "http://xxx/1078872379626291200.png"
                 * width: 141
                 */
                console.log(arr);
                const _this = this;
                arr.forEach(v => {
                    if (v.hasSuccess) {
                        this.md += '![](' + v.url + ')';
                    }
                })
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .editor-container {
        margin-bottom: 30px;
    }

    .tag-title {
        margin-bottom: 5px;
    }
    .editor-custom-btn-container {
        position: absolute;
        right: 4px;
        top: 4px;
        /*z-index: 2005;*/
        .tips {
            margin-right: 5px;
            font-size: 10px;
        }
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
