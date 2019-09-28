<template>
  <div class="app-container">
    <el-alert
      :title="'Authorization Token: ' + token"
      type="success"
      :closable="false">
    </el-alert>
    <targetWindow :targetUrl="swaggerApi"></targetWindow>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import targetWindow from '@/components/iframe/index'
  export default {
    components: {targetWindow},
    computed: {
      ...mapGetters([
        'token',
        'swaggerApi'
      ])
    }
  }
</script>

<style scoped>
</style>
