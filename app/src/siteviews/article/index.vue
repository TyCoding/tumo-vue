<template>
  <div class="content-index">
    <article class="main-content page-page">
      <div class="post-header">
        <h1 class="post-title" itemprop="name headline"> {{article.title}} </h1>
        <div class="post-data">
          <time datetime="2018-04-01T23:34:00+08:00" itemprop="datePublished">{{article.publishTime}}</time>
                    in <a href="#">{{article.category}}</a>
        </div>
      </div>
      <div class="post-content" itemprop="articleBody">
        <p class="post-tags" v-if="article.tags != null">
          <a v-for="tag in article.tags" href="#">{{tag.name}}</a>
        </p>

        <div id="post-content" v-html="article.content" ref="content"></div>

        <p class="post-info">
          本文由 <a href="/">{{article.author}}</a> 创作，采用
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="external nofollow">知识共享署名4.0</a>
          国际许可协议进行许可<br>本站文章除注明转载/出处外，均为本站原创或翻译，转载前请务必署名<br>最后编辑时间为: {{article.editTime}}
        </p>
      </div>
    </article>

    <div id="directory-content" class="directory-content initial headroom--not-bottom headroom--not-top pinned">
      <div id="directory">
      </div>
    </div>

    <div @click="floatMenu" id="floatMenu">
      <a href="javascript:;" class="btn-goTop"></a>
    </div>

    <div id="respond-post-334" class="comment-container">
      <div id="comments" class="clearfix">
        <span class="response">Responses</span>
        <form id="comment-form" class="comment-form" role="form">
          <input v-model="form.articleTitle = article.title" style="display: none;">
          <input v-model="form.articleId = article.id" style="display: none;">
          <input v-model="form.sort = 0" style="display: none;">
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
  import {getListForArticle, add} from "@/api/comment";
  import {findById} from '@/api/article'

  export default {
    name: "index",
    data() {
      return {
        article: {},
        data: {},
        form: {},
        current: 1
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {
      setTimeout(() => {
        this.init();
      }, 400)
    },
    methods: {
      fetchData() {
        findById(this.$route.params.id).then(res => {
          this.article = res.data
        })
        this.fetchCommentData(this.current)
      },

      fetchCommentData(current) {
        getListForArticle(this.$route.params.id, current).then(res => {
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
            this.fetchCommentData(this.current)
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
        this.fetchCommentData(page)
      },

      clearForm() {
        this.form.name = ''
        this.form.email = ''
        this.form.url = ''
        this.form.content = ''
        this.form.pid = ''
        this.form.cname = ''
      },

      init() {

        //生成右侧目录导航
        var postDirectoryBuild = function () {
          var postChildren = function children(childNodes, reg) {
            var result = [],
              isReg = typeof reg === 'object',
              isStr = typeof reg === 'string',
              node, i, len;
            for (i = 0, len = childNodes.length; i < len; i++) {
              node = childNodes[i];
              if ((node.nodeType === 1 || node.nodeType === 9) &&
                (!reg ||
                  isReg && reg.test(node.tagName.toLowerCase()) ||
                  isStr && node.tagName.toLowerCase() === reg)) {
                result.push(node);
              }
            }
            return result;
          }
          var createPostDirectory = function (article, directory, isDirNum) {
            var contentArr = [],
              titleId = [],
              levelArr, root, level,
              currentList, list, li, link, i, len;
            levelArr = (function (article, contentArr, titleId) {
              var titleElem = postChildren(article.childNodes, /^h\d$/),
                levelArr = [],
                lastNum = 1,
                lastRevNum = 1,
                count = 0,
                guid = 1,
                id = 'directory' + (Math.random() + '').replace(/\D/, ''),
                lastRevNum, num, elem;
              while (titleElem.length) {
                elem = titleElem.shift();
                contentArr.push(elem.innerHTML);
                num = +elem.tagName.match(/\d/)[0];
                if (num > lastNum) {
                  levelArr.push(1);
                  lastRevNum += 1;
                } else if (num === lastRevNum ||
                  num > lastRevNum && num <= lastNum) {
                  levelArr.push(0);
                  lastRevNum = lastRevNum;
                } else if (num < lastRevNum) {
                  levelArr.push(num - lastRevNum);
                  lastRevNum = num;
                }
                count += levelArr[levelArr.length - 1];
                lastNum = num;
                elem.id = elem.id || (id + guid++);
                titleId.push(elem.id);
              }
              if (count !== 0 && levelArr[0] === 1) levelArr[0] = 0;
              return levelArr;
            })(article, contentArr, titleId);
            currentList = root = document.createElement('ul');
            var dirNum = [0];
            for (i = 0, len = levelArr.length; i < len; i++) {
              level = levelArr[i];
              if (level === 1) {
                list = document.createElement('ul');
                if (!currentList.lastElementChild) {
                  currentList.appendChild(document.createElement('li'));
                }
                currentList.lastElementChild.appendChild(list);
                currentList = list;
                dirNum.push(0);
              } else if (level < 0) {
                level *= 2;
                while (level++) {
                  if (level % 2) dirNum.pop();
                  currentList = currentList.parentNode;
                }
              }
              dirNum[dirNum.length - 1]++;
              li = document.createElement('li');
              link = document.createElement('a');
              link.href = '#' + titleId[i];
              link.innerHTML = !isDirNum ? contentArr[i] :
                dirNum.join('.') + ' ' + contentArr[i];
              li.appendChild(link);
              currentList.appendChild(li);
            }
            directory.appendChild(root);
          };
          createPostDirectory(document.getElementById('post-content'), document.getElementById('directory'), true);
        };
        postDirectoryBuild();
      },

      floatMenu() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }

    }
  }
</script>
<style scoped>
  @import "~@/styles/style.min.css";
  @import "~@/styles/xcode.min.css";

  .content-index {
    padding: 0
  }
</style>
