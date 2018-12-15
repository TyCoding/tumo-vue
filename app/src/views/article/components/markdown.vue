<template>
    <div class="components-container">
        <div class="editor-container">
            <markdown-editor ref="markdownEditor" v-model="content" :language="language" height="600px"/>
        </div>
    </div>
</template>

<script>
    import MarkdownEditor from '@/components/MarkdownEditor'

    export default {
        name: 'markdown',
        components: {MarkdownEditor},
        data() {
            return {
                content: this.$emit('content'),
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
                this.html = this.$refs.markdownEditor.getHtml();
                console.log(this.html)
            }
        }
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
