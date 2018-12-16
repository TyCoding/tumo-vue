<template>
    <div class="components-container">

        <div class="editor-container">
            <markdown-editor v-model="content" height="600px"></markdown-editor>
        </div>

    </div>
</template>

<script>
    import MarkdownEditor from '@/components/MarkdownEditor'
    import {Editor} from '@toast-ui/vue-editor'

    export default {
        name: 'MarkdownDemo',
        components: { MarkdownEditor, Editor},
        props: ['content'],
        data() {
            return {
                // content: '',
                html: '',
                languageTypeList: {
                    'en': 'en_US',
                    'zh': 'zh_CN',
                    'es': 'es_ES'
                }
            }
        },
        computed: {
            language() {
                return this.languageTypeList[this.$store.getters.language]
            }
        },
        methods: {
            getHtml() {
                this.html = this.$refs.markdownEditor.getHtml()
                console.log(this.html)
            }
        }
    }
</script>

<style scoped>
    .editor-container{
        margin-bottom: 30px;
    }
    .tag-title{
        margin-bottom: 5px;
    }
</style>
