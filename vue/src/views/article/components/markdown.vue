<template>
    <div class="editor-container">
        <markdown-editor v-model="md" height="600px"></markdown-editor>
    </div>
</template>

<script>
    import MarkdownEditor from '@/components/MarkdownEditor'

    export default {
        name: 'markdown',
        components: {MarkdownEditor},
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                markdownId: this.id,
                // content: '',
                md: '',
                html: '',
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
                this.md = newVal; //监听父组件传来的content数据，只会执行一次，用来给子组件赋初始值
            },
            md(newVal, oldVal) {
                //监听子组件中数据
                this.$emit('updateContent', newVal);
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
