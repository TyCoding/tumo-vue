<template>
    <div class="app-wrapper">
        <!-- Markdown富文本组件 -->
        <markdown></markdown>
    </div>
</template>

<script>
    import markdown from './components/markdown'
    export default {
        name: "Editor",
        components: {
            markdown
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.mobile.openSidebar{
            position: fixed;
            top: 0;
        }
    }
    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
</style>
