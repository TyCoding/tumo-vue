<template>
    <div class="site-container">
        <!-- 头部 -->
        <Header></Header>
        <!-- 主要 -->
        <Main></Main>
        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from './components/Header'
    import Main from './components/Main'
    import Footer from './components/Footer'
    export default {
        name: "Layout",
        components: {
            Header,
            Main,
            Footer
        }
    }
</script>

<style scoped>
    .site-container{
        background-color: #fff;
    }
</style>
