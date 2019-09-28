<template>
  <div>
    <article class="main-content page-page">
      <div class="post-header"><h1 class="post-title" itemprop="name headline"> About </h1>
        <div class="post-data">
          <time datetime="2016-01-28T14:07:00+08:00" itemprop="datePublished">Published on Jan 28, 2018</time>
        </div>
      </div>
      <div id="post-content" class="post-content"><h3>Hello</h3>
        <p>我是 TyCoding ，Java后端练习生</p>
        <p><a href="https://github.com/TyCoding/tumo" target="_blank">Tumo</a> 博客项目起初是自己的一个练习Demo</p>
        <p>后来，逐渐学习了新技术（SpringBoot、Vue、Node...），便想着能将新技术运用到这个项目中</p>
        <p>但苦于技术太菜，在项目中埋下了很多坑，很对不起大家。</p>
        <P>这次花了几天时间重构项目，采用全新的LayUI绘制，相比Vue，LayUI更适合这种前后端不分离的项目</P>
        <h3>关于我</h3>
        <p>在读大学僧一枚</p>
        <p>马不停蹄赶来的路上...</p>
        <p>如果你想跟我做朋友的话，必须欢迎，你可以通过博客页底的社交链接联系到我···</p>
        <ul>
          <li><p><a href="https://tycoding.cn/" target="_blank">Blog</a></p></li>
          <li><p><a href="https://github.com/TyCoding" target="_blank">Github</a></p></li>
          <li><p><a href="https://www.zhihu.com/people/tomo-83-82/activities" target="_blank">zhihu</a></p></li>
          <li><p>QQ Group: 671017003</p></li>
        </ul>
      </div>
    </article>
    <div id="respond-post-334" class="comment-container">
      <div id="comments" class="clearfix">
        <span class="response">Responses</span>
        <form id="comment-form" class="comment-form" role="form">
          <input v-model="form.sort = 2" style="display: none;">
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
  import {getListForAbout, add} from "@/api/comment";
  export default {
    name: "index",
    data() {
      return {
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
        getListForAbout(current).then(res => {
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

