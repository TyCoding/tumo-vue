<template>
    <iframe width="400" id="iframe" frameborder="0" scrolling="auto" :src="targetUrl"></iframe>
</template>

<script>
  export default {
    name: "index",
    props: ['targetUrl'],
    mounted() {
      /**
       * iframe-宽高自适应显示
       */
      const oIframe = document.getElementById('iframe');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = '-webkit-fill-available'; //数字是页面布局宽度差值
      oIframe.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差
    },
  }
</script>

<style scoped>

</style>
