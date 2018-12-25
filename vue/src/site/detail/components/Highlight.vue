<template>

</template>

<script>
    import Vue from 'vue'
    import hljs from 'highlight.js'
    import 'highlight.js/styles/default.css'

    Vue.directive('highlight',function (el) {
        let blocks = el.querySelectorAll('pre code');
        blocks.forEach((block)=>{
            hljs.highlightBlock(block)
        })
    })
    export default {
        name: "Highlight",

    }
</script>

<style scoped>

</style>
