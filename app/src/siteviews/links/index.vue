<template>
  <div>
    <article class="main-content page-page">
      <div class="post-header">
        <h1 class="post-title" itemprop="name headline"> Links </h1>
        <div class="post-data">
          <time datetime="2016-01-30T20:58:00+08:00" itemprop="datePublished">Published on Jan 30, 2019</time>
        </div>
      </div>
      <div id="post-content" class="post-content">
        <h3>友情链接</h3>
        <ul class="flinks">
          <li v-for="link in list">🔒 <a :href="link.url" target="_blank">{{link.name}}</a></li>
        </ul>
        <h3>链接须知</h3>
        <blockquote>
          <ul>
            <li><p>请确定贵站可以稳定运营</p></li>
            <li><p>原创博客优先，技术类博客优先，设计、视觉类博客优先</p></li>
            <li><p>经常过来访问和评论，眼熟的</p></li>
          </ul>
        </blockquote>
        <p>备注：默认申请友情链接均为内页（当前页面）</p>
        <h3>基本信息</h3>
        <pre><code class="lang-md hljs markdown">网站名称：Tumo
网站地址：www.tumo.tycoding.cn</code></pre>
        <p>暂时先这样，同时欢迎互换友链，这个页面留言即可。 ^_^</p>
        <p>还有，我会不定时对无法访问的网址进行清理，请保证自己的链接长期有效。</p></div>
    </article>

    <div id="respond-post-334" class="comment-container">
      <div id="comments" class="clearfix">
        <span class="response">Responses</span>
        <form id="comment-form" class="comment-form" role="form">
          <input v-model="form.sort = 1" style="display: none;">
          <input type="text" v-model="form.name" maxlength="12" class="form-control input-control clearfix" placeholder="Name (*)" value="" required="">
          <input type="email" v-model="form.email" class="form-control input-control clearfix" placeholder="Email (*)" value="" required="">
          <input type="url" v-model="form.url" class="form-control input-control clearfix" placeholder="Site (http://)" value="">
          <textarea v-model="form.content" class="form-control" placeholder="Your comment here. Be cool. " required=""></textarea>
          <button type="button" class="submit" @click="submit">SUBMIT</button>
        </form>
        <ol v-if="data.rows != null && data.rows.length > 0" class="comment-list">
          <li v-for="parent in data.rows" :id="'li-comment-' + parent.id" class="comment-body comment-parent comment-even">
            <div :id="'comment-' + parent.id">
              <div class="comment-view" onclick="">
                <div class="comment-header">
                  <img class="avatar" src="/user.png" width="80" height="80">
                  <span class="comment-author">
                      <a :href="parent.url" target="_blank" rel="external nofollow">{{parent.name}}</a>
                      <span>{{parent.device}}</span>
                  </span>
                </div>
                <div class="comment-content">
                  <span class="comment-author-at"></span>
                  <p>{{parent.content}}</p>
                  <p></p>
                </div>
                <div class="comment-meta">
                  <time class="comment-time">{{parent.time}}</time>
                  <span class="comment-reply">
                     <a href="#comments" rel="nofollow" @click="reply(parent.id, parent.name)">Reply</a>
                </span>
                </div>
              </div>
            </div>
            <div v-if="parent.children != null && parent.children.length > 0" class="comment-children">
              <ol class="comment-list">
                <li v-for="child in parent.children" :id="'li-comment-' + child.id" class="comment-body comment-child comment-level-odd comment-odd">
                  <div :id="'comment-' + child.id">
                    <div class="comment-view" onclick="">
                      <div class="comment-header">
                        <img class="avatar" src="/user.png" width="80" height="80">
                        <span class="comment-author">
                            <a :href="child.url" target="_blank" rel="external nofollow">{{child.name}}</a>
                            <span>{{child.device}}</span>
                        </span>
                      </div>
                      <div class="comment-content">
                        <span class="comment-author-at"><a :href="'#comment-' + child.pId">@{{child.target}}</a></span>
                        <p>{{child.content}}</p>
                        <p></p>
                      </div>
                      <div class="comment-meta">
                        <time class="comment-time">{{child.time}}</time>
                        <span class="comment-reply">
                            <a href="#comments" rel="nofollow" @click="reply(parent.id, child.name)">Reply</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </li>
        </ol>
        <div v-if="data.pages > 0" class="lists-navigator">
          <ol class="page-navigator">
            <li v-if="data.current > 1" class="prev">
              <a @click="toPage(data.current - 1)" href="#comments">←</a>
            </li>
            <li v-for="i in data.pages" :class="data.current == i ? 'current' : ''">
              <a @click="toPage(i)" href="#comments">{{i}}</a>
            </li>
            <li v-if="data.current < data.pages" class="next">
              <a @click="toPage(data.current + 1)" href="#comments">→</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getListForLink, add} from "@/api/comment";
  import {findAllLink} from '@/api/link'
  export default {
    name: "index",
    data() {
      return {
        list: null,
        data: {},
        form: {},
        current: 1
      }
    },
    created() {
      this.fetchData(1)
    },
    methods: {
      fetchData(current) {
        findAllLink().then(res => {
          this.list = res.data
        })
        getListForLink(current).then(res => {
          this.data = res.data
        })
      },

      submit() {
        if (this.form.name == null || this.form.name == '') {
          this.$message.warning('请填写昵称')
          return false;
        }
        if (this.form.email == null || this.form.email == '') {
          this.$message.warning('请填写邮箱')
          return false
        }
        if (this.form.url == null || this.form.url == '') {
          this.$message.warning('请填写个性域名')
          return false
        }
        if (this.form.content == null || this.form.content == '') {
          this.$message.warning('请填写留言内容')
          return false;
        }

        add(this.form).then(res => {
          if (res.code == 200) {
            this.$message.success('评论成功')
            this.fetchData(this.current)
            this.clearForm()
          }
        })
      },

      reply(id, name) {
        this.form.pid = id
        this.form.cname = name
      },

      toPage(page) {
        this.current = page
        this.fetchData(page)
      },

      clearForm() {
        this.form.name = ''
        this.form.email = ''
        this.form.url = ''
        this.form.content = ''
        this.form.pid = ''
        this.form.cname = ''
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/style.min.css";
</style>
