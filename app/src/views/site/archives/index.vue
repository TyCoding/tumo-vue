<template>
  <div class="content-index">
    <article class="main-content page-page">
      <div class="post-header">
        <h1 class="post-title" itemprop="name headline"> {{ article.title }} </h1>
        <div class="post-data">
          <time>{{ article.createTime }}</time>
          in <a href="#" v-if="article.category != null">{{ article.category.name }}</a>
        </div>
      </div>
      <div class="post-content" itemprop="articleBody">
        <p v-if="article.tags != null" class="post-tags">
          <a v-for="item in article.tags" :key="item.id" href="#">{{ item.name }}</a>
        </p>

        <div id="post-content" ref="content" v-html="article.content" />

        <p class="post-info">
          本文由 <a href="#">{{ article.author }}</a> 创作，采用
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="external nofollow">知识共享署名4.0</a>
          国际许可协议进行许可<br>本站文章除注明转载/出处外，均为本站原创或翻译，转载前请务必署名
        </p>
      </div>
    </article>

    <div id="directory-content" class="directory-content initial headroom--not-bottom headroom--not-top pinned">
      <div id="directory" />
    </div>

    <div class="comment-container" style="padding: 40px 0;">
      <div id="comments" class="clearfix" style="padding: 20px;background: #fff">
        <div class="comments-content">
          <el-form :model="form" ref="ruleForm" :rules="rulesForm" size="small">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="nickname">
                  <el-input v-model="form.nickname" placeholder="昵称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="email">
                  <el-input v-model="form.email" placeholder="邮箱"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="content">
                  <el-input v-model="form.content" :autosize="{ minRows: 5}" placeholder="快发表评论吧"
                            type="textarea"></el-input>
                </el-form-item>
                <div style="text-align:right">
                  <el-button @click="handleSubmit('ruleForm')" size="mini" plain>提交</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="comments-count">
          <span>{{list.length}}</span>
          &nbsp;评论
        </div>
        <div class="comments-list">
          <div class="comments-list-item" v-for="item in list">
            <img class="comments-item-img" src="/img/avatar/default.jpg">
            <div class="comments-list-item-view">
              <div class="comments-item-head">
                <span class="comments-item-name">{{item.nickname}}</span>
                <span class="comments-item-device">{{item.device}}</span>
              </div>
              <div class="comments-item-time">
                {{item.createTime}}
              </div>
              <div class="comments-item-content">
                {{item.content}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ElementUI 页面滚动到顶部 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { commentAdd, getByArticle } from '@/api/comment'
import { getArticleById } from '@/api/article'

export default {
  name: 'Index',
  data() {
    return {
      article: {},
      data: {},
      list: [],
      form: {},
      rulesForm: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入评论内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    setTimeout(() => {
      this.init()
    }, 400)
  },
  methods: {
    fetchData() {
      getArticleById(this.$route.params.id).then(res => {
        this.article = res.data
      })
      this.fetchCommentData()
    },

    fetchCommentData() {
      getByArticle(this.$route.params.id).then(res => {
        if (res.code === 200) {
          this.list = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.articleId = this.$route.params.id
          commentAdd(this.form).then(res => {
            if (res.code === 200) {
              this.$message.success('评论已发表~')
              this.fetchData()
              this.form = {}
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!');
          return false
        }
      });
    },

    init() {
      // 生成右侧目录导航
      var postDirectoryBuild = function() {
        var postChildren = function children(childNodes, reg) {
          var result = []
          var isReg = typeof reg === 'object'
          var isStr = typeof reg === 'string'
          var node; var i; var len
          for (i = 0, len = childNodes.length; i < len; i++) {
            node = childNodes[i]
            if ((node.nodeType === 1 || node.nodeType === 9) &&
                (!reg ||
                  isReg && reg.test(node.tagName.toLowerCase()) ||
                  isStr && node.tagName.toLowerCase() === reg)) {
              result.push(node)
            }
          }
          return result
        }
        var createPostDirectory = function(article, directory, isDirNum) {
          var contentArr = []
          var titleId = []
          var levelArr; var root; var level
          var currentList; var list; var li; var link; var i; var len
          levelArr = (function(article, contentArr, titleId) {
            var titleElem = postChildren(article.childNodes, /^h\d$/)
            var levelArr = []
            var lastNum = 1
            var lastRevNum = 1
            var count = 0
            var guid = 1
            var id = 'directory' + (Math.random() + '').replace(/\D/, '')
            var lastRevNum; var num; var elem
            while (titleElem.length) {
              elem = titleElem.shift()
              contentArr.push(elem.innerHTML)
              num = +elem.tagName.match(/\d/)[0]
              if (num > lastNum) {
                levelArr.push(1)
                lastRevNum += 1
              } else if (num === lastRevNum ||
                  num > lastRevNum && num <= lastNum) {
                levelArr.push(0)
                lastRevNum = lastRevNum
              } else if (num < lastRevNum) {
                levelArr.push(num - lastRevNum)
                lastRevNum = num
              }
              count += levelArr[levelArr.length - 1]
              lastNum = num
              elem.id = elem.id || (id + guid++)
              titleId.push(elem.id)
            }
            if (count !== 0 && levelArr[0] === 1) levelArr[0] = 0
            return levelArr
          })(article, contentArr, titleId)
          currentList = root = document.createElement('ul')
          var dirNum = [0]
          for (i = 0, len = levelArr.length; i < len; i++) {
            level = levelArr[i]
            if (level === 1) {
              list = document.createElement('ul')
              if (!currentList.lastElementChild) {
                currentList.appendChild(document.createElement('li'))
              }
              currentList.lastElementChild.appendChild(list)
              currentList = list
              dirNum.push(0)
            } else if (level < 0) {
              level *= 2
              while (level++) {
                if (level % 2) dirNum.pop()
                currentList = currentList.parentNode
              }
            }
            dirNum[dirNum.length - 1]++
            li = document.createElement('li')
            link = document.createElement('a')
            link.href = '#' + titleId[i]
            link.innerHTML = !isDirNum ? contentArr[i]
              : dirNum.join('.') + ' ' + contentArr[i]
            li.appendChild(link)
            currentList.appendChild(li)
          }
          directory.appendChild(root)
        }
        createPostDirectory(document.getElementById('post-content'), document.getElementById('directory'), true)
      }
      postDirectoryBuild()
    }
  }
}
</script>
<style src="../../../styles/style.min.css"></style>
<style src="../../../styles/xcode.min.css"></style>
<style scoped>
  .content-index {
    padding: 0
  }
  ::v-deep .comments .comments-content{border-color:#b2b2b5;border:1px solid #f0f0f0;border-radius:4px;margin-bottom:10px;overflow:hidden;position:relative;padding:10px}
  ::v-deep .el-input__inner{border:0;border-bottom:1px dashed #dedede}
  ::v-deep .el-textarea{padding:10px 0}
  ::v-deep .el-textarea__inner{border:0}.comments-count{padding:5px;font-weight:600;font-size:1.25em}
  ::v-deep .comments{}
  ::v-deep .comments-list{width:100%;font-family:Lato,"PingFang SC","Microsoft YaHei",sans-serif}
  ::v-deep .comments-list-item{padding-top:1.25em;position:relative;display:block;overflow:hidden;padding-bottom:.5em;border-bottom:1px dashed #f5f5f5}
  ::v-deep .comments-item-img{width:3.125em;height:3.125em;float:left;border-radius:50%;margin-right:.7525em;border:1px solid #f5f5f5;padding:.125em}
  ::v-deep .comments-list-item-view{overflow:hidden;padding-bottom:.5em;border-bottom:1px dashed #f5f5f5}
  ::v-deep .comments-item-head{line-height:1.5;margin-top:0}
  ::v-deep .comments-item-name{position:relative;font-size:.875em;font-weight:500;margin-right:.875em;cursor:pointer;text-decoration:none;display:inline-block}
  ::v-deep .comments-item-device{color:#929298;display:inline-block;padding:.2em .5em;font-size:.75em;border-radius:.2em;margin-right:.3em}
  ::v-deep .comments-item-time{font-size:.75em;margin-right:.875em;color:#929298}
  ::v-deep .comments-item-content{word-wrap:break-word;word-break:break-all;font-size:.875em;line-height:2;position:relative;margin-bottom:.75em;padding-top:.625em;color:#b2b2b5}
</style>
