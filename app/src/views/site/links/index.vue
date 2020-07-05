<template>
  <div>
    <article class="main-content page-page">
      <div class="post-header">
        <h1 class="post-title" itemprop="name headline"> Links </h1>
      </div>
      <div id="post-content" class="post-content">
        <h3>小伙伴</h3>
        <ul class="flinks">
          <li v-for="link in list" :key="link.id">🔒 <a :href="link.url" target="_blank">{{ link.name }}</a></li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script>
import { getLinkFilterList } from '@/api/link'
export default {
  name: 'Index',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getLinkFilterList({}).then(res => {
        if (res.code === 200) {
          this.list = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style src="../../../styles/style.min.css"></style>
