<template>
    <header id="header" :class="'header bg-white' + headerClass">
        <div class="navbar-container">
            <router-link to="/" class="navbar-logo">
                <img src="http://cdn.tycoding.cn/tumo-logo.png" alt="Tumo Blog"/>
            </router-link>
            <div class="navbar-menu">
                <router-link to="/archives">归档</router-link>
                <router-link to="/links">友链</router-link>
                <router-link to="/about">关于</router-link>
            </div>
            <div class="navbar-search" onclick="">
                <span class="icon-search"></span>
                <form role="search" onsubmit="return false;">
                <span class="search-box">
                    <input type="text" id="search-inp" class="input" placeholder="搜索..." maxlength="30"
                           autocomplete="off">
                </span>
                </form>
            </div>
            <div class="navbar-mobile-menu">
                <span class="icon-menu cross"><span class="middle"></span></span>
                <ul>
                    <li><router-link to="/archives">归档</router-link></li>
                    <li><router-link to="/links">友链</router-link></li>
                    <li><router-link to="/about">关于</router-link></li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>

    export default {
        name: "Header",
        data() {
            return {
                offsetTop: 0,   // 触发bar浮动的阈值
                headerClass: '', //给Header设置样式
            }
        },
        mounted() {
            // 设置bar浮动阈值为 #fixedBar 至页面顶部的距离
            this.offsetTop = document.querySelector('#header').offsetHeight;

            // 开启滚动监听
            window.addEventListener('scroll', this.handleScroll);
        },
        methods: {

            // 滚动监听  滚动触发的效果写在这里
            handleScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var scroll = scrollTop - this.offsetTop;
                this.offsetTop = scrollTop;
                if (scroll < 0) {
                    this.headerClass = ' animated headroom--not-bottom slideDown headroom--top';
                } else {
                    this.headerClass = ' animated headroom--not-bottom headroom--not-top slideUp';
                }
            }
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll); // 离开页面 关闭监听 不然会报错
        }
    }
</script>

<style scoped>
    @import '../../../styles/site.css';

</style>
