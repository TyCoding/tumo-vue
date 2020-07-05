<template>
  <div class="index-page main-content clearfix onelist-page">
    <div class="post-lists">
      <div class="post-lists-body">
        <div v-if="list == null || list.length == 0" class="post-onelist-item">
          <div class="post-onelist-item-container">
            <p>还有没有发表文章呢！</p>
          </div>
        </div>
        <div v-for="item in list" v-else :key="item.id" class="post-onelist-item">
          <div class="post-onelist-item-container">
            <router-link :to="'/article/' + item.id">
              <div
                class="onelist-item-thumb bg-green item-thumb bg-deepgrey
"
                :style="'background-image:url(/img/thumbs/' + getThumbs() + '.jpg);'"
              />
            </router-link>
            <div class="onelist-item-info">
              <div class="item-title">
                <router-link :to="'/archives/' + item.id">「{{ item.category.name }}」{{ item.title }}</router-link>
              </div>
              <div class="item-meta">
                <time datetime="2020-4-26 10:42:08" itemprop="datePublished">
                  发布于 {{ item.createTime }}
                </time>in
                <router-link :to="'/archives/' + item.id">{{ item.category.name }}</router-link>

              </div>
              <div
                class="item-meta-hr bg-blue
"
              />
              <div class="item-content">
                <p v-html="item.des" />
              </div>
              <div class="item-readmore">
                <router-link :to="'/archives/' + item.id"> 继续阅读 → </router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="lists-navigator clearfix" />
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
export default {
  name: 'Index',
  data() {
    return {
      list: [],
      pageConf: {
        page: 1,
        limit: 8,
        total: 0
      },
      thumbs: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // let param = this.$route.params.page
      getArticleList({}, this.pageConf).then(res => {
        if (res.code === 200) {
          this.list = res.data.rows
          this.pageConf.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getThumbs() {
      var thumbs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      var index = Math.floor((Math.random() * thumbs.length))
      return index
    }
  }
}
</script>
<style src="../../../styles/style.min.css"></style>
