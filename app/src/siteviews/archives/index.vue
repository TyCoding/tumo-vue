<template>
  <div class="main-content archive-page clearfix">
    <div class="categorys-item">
        <span v-if="list != null || list.length > 0" v-for="item in list">
            <div class="categorys-title">{{item.date}}</div>
            <div class="post-lists">
                <div class="post-lists-body">
                    <div class="post-list-item" v-for="a in item.articles">
                        <div class="post-list-item-container">
                            <div class="item-label">
                                <div class="item-title">
                                    <a :href="'/article/' + a.id">{{a.title}}</a>
                                </div>
                                <div class="item-meta clearfix">
                                    <div class="item-meta-date">{{a.publishTime}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </span>
    </div>
  </div>

</template>

<script>
  import {findArchives} from '@/api/article'
  export default {
    name: "index",
    data() {
      return {
        list: null
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        findArchives().then(res => {
          this.list = res.data
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/style.min.css";
</style>
