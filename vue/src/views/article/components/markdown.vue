<template>
    <div class="editor-container">
        <markdown-editor ref="markdownEditor" v-model="md" height="600px"></markdown-editor>
    </div>
</template>

<script>
    import MarkdownEditor from '@/components/MarkdownEditor'

    export default {
        name: 'markdown',
        components: {MarkdownEditor},
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
        created() {
        },
        watch: {
            content(newVal, oldVal) {
                this.editor.md = newVal; //监听父组件传来的content数据，只会执行一次，用来给子组件赋初始值
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
    }
</script>

<style scoped>
    .editor-container {
        margin-bottom: 30px;
    }

    .tag-title {
        margin-bottom: 5px;
    }
</style>
