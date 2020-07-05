<template>
  <div>
    <header id="header" class="header bg-white">
      <div class="navbar-container">
        <a href="/" class="navbar-logo">
          <span>Tumo Blog</span>
        </a>
        <div class="navbar-menu">
          <a href="/">Home</a>
          <a href="/links">Links</a>
          <a href="/about">About</a>
        </div>
        <div class="navbar-mobile-menu" onclick="">
          <span class="icon-menu cross"><span class="middle" /></span>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/links">Links</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
      </div>
    </header>

    <router-view />

    <footer id="footer" class="footer bg-white">
      <div class="footer-social">
        <div class="footer-container clearfix">
          <div class="social-list">
            <a class="social rss" target="blank" href="https://tycoding.cn/">BLOG</a>
            <a class="social zhihu" target="blank" href="https://www.zhihu.com/people/tomo-83-82/activities">ZHIHU</a>
            <a class="social github" target="blank" href="https://github.com/TyCoding">GITHUB</a>
          </div>
        </div>
      </div>
      <div class="footer-meta">
        <div class="footer-container">
          <div class="meta-item meta-copyright">
            <div class="meta-copyright-info">
              <a href="/" class="info-logo">
                <span>Tumo Blog</span>
              </a>
              <div class="info-text">
                <p>© 2019 <a href="https://tycoding.cn/">TyCoding</a></p></div>
            </div>
          </div>
          <div class="meta-item meta-posts">
            <h3 class="meta-title">RECENT POSTS</h3>
            <li v-for="item in articleList" :key="item.id">
              <router-link :to="'/article/' + item.id">{{ item.title }}</router-link>
            </li>
          </div>
          <div class="meta-item meta-comments">
            <h3 class="meta-title">RECENT COMMENTS</h3>
            <li v-for="item in commentList" :key="item.id">
              <router-link :to="'/article/' + item.articleId">{{ item.nickname }} : {{ item.content }}</router-link>
            </li>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import { getCommentList } from '@/api/comment'

export default {
  name: 'Layout',
  data() {
    return {
      articleList: [],
      commentList: [],
      pageConf: {
        page: 1,
        limit: 8,
        total: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getArticleList({}, this.pageConf).then(res => {
        this.articleList = res.data.rows
      })
      getCommentList({}, this.pageConf).then(res => {
        this.commentList = res.data.rows
      })
    },

  }
}
</script>
