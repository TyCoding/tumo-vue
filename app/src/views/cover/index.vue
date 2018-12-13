<template>
    <div class="cover-container">
        <pic-card></pic-card>
    </div>
</template>

<script>
    import PicCard from './components/PicCard'
    export default {
        name: "index",
        data() {
            return {

            }
        },
        components: {
            PicCard
        },
        methods: {

        },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .cover-container{
        padding: 32px;
    }
</style>
