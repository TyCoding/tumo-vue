<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <el-card class="welcome-card">
      <el-row :gutter="40">
        <el-card shadow="never" style="margin: 0 20px;">
          <el-col :md="12" :sm="12" :lg="12">
            <div class="welcome-text">
              <pan-thumb :image="avatar" :height="'100px'" :width="'100px'" :hoverable="false"></pan-thumb>
              <div class="user-info">
                <div class="random-message">
                  <span id="welcome-message" v-html="welcomeMessage"></span>
                </div>
                <div class="user-login-info">
                  上次登录时间：<span id="last-login-time">2019-09-24T08:45:36.000+0000</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :md="12" :sm="12" :lg="12">
            <div class="news-text">
              <el-card class="box-card">
                <div slot="header" class="box-text">
                  <span>今日IP</span>
                </div>
                <div class="box-num">12</div>
              </el-card>
              <el-card class="box-card">
                <div slot="header" class="box-text">
                  <span>文章总量</span>
                </div>
                <div class="box-num">12</div>
              </el-card>
              <el-card class="box-card">
                <div slot="header" class="box-text">
                  <span>评论总量</span>
                </div>
                <div class="box-num">12</div>
              </el-card>
            </div>
          </el-col>
        </el-card>
      </el-row>
    </el-card>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane label="最新文章" name="first">
              <el-table
                v-loading="listLoading"
                :data="articleList"
                element-loading-text="Loading"
                border
                fit
                size="mini"
                highlight-current-row>
                <el-table-column label="标题">
                  <template slot-scope="scope">
                    {{ scope.row.title }}
                  </template>
                </el-table-column>
                <el-table-column label="作者" width="110" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                  </template>
                </el-table-column>
                <el-table-column class-name="status-col" label="状态" width="110" align="center">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.state == '1' ? 'success' : 'warning'">{{ scope.row.state == '1' ? '已发布' : '未发布' }}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="最新评论" name="second">
              <el-table
                v-loading="listLoading"
                :data="commentList"
                element-loading-text="Loading"
                border
                fit
                size="mini"
                highlight-current-row>
                <el-table-column label="留言人" width="100">
                  <template slot-scope="scope">
                    {{ scope.row.name }}
                  </template>
                </el-table-column>
                <el-table-column label="留言内容">
                  <template slot-scope="scope">
                    {{ scope.row.content }}
                  </template>
                </el-table-column>
                <el-table-column label="网址" width="150">
                  <template slot-scope="scope">
                    <a :href="scope.row.url" target="_blank" style="color: #409EFF">{{scope.row.url}}</a>
                  </template>
                </el-table-column>
                <el-table-column label="IP" width="120">
                  <template slot-scope="scope">
                    {{ scope.row.ip }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-row>
          <el-col>
            <el-card class="project-card">
              <div slot="header">
                <span>进行中的项目</span>
                <el-button style="float: right; padding: 3px 0" type="text">所有项目</el-button>
              </div>
              <div>
                <el-row>
                  <el-col class="project-item" :xs="12" :sm="12" :lg="12">
                    <div class="project-name">
                      <a target="_blank" href="https://github.com/TyCoding/tumo">Tumo</a>
                    </div>
                    <div class="project-desc">
                      Spring Boot 2.1.3 &amp; Shiro 博客系统。
                    </div>
                  </el-col>
                  <el-col class="project-item" :xs="12" :sm="12" :lg="12">
                    <div class="project-name">
                      <a target="_blank" href="https://github.com/TyCoding/permission">Permission</a>
                    </div>
                    <div class="project-desc">
                      Spring Boot &amp; Shiro 权限管理系统。
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col class="project-item" :xs="12" :sm="12" :lg="12">
                    <div class="project-name">
                      <a target="_blank" href="https://github.com/TyCoding/cloud-template">Cloud Template</a>
                    </div>
                    <div class="project-desc">
                      SpringCloud Greenwich.SR1 &amp; Spring Boot &amp; Vue 微服务架构模板。
                    </div>
                  </el-col>
                  <el-col class="project-item" :xs="12" :sm="12" :lg="12">
                    <div class="project-name">
                      <a target="_blank" href="https://github.com/TyCoding/scst">Spring Cloud Security Template</a>
                    </div>
                    <div class="project-desc">
                      SpringCloud Greenwich.SR1 &amp; Spring Security &amp; Vue 微服务权限管理系统。
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
          <el-col>
            <el-card class="info-card">
              <div slot="header">
                <span>版本信息</span>
              </div>
              <div>
                <el-card class="info-item-card" shadow="never">
                  <div class="info-header">
                    当前版本
                  </div>
                  <div class="info-text">
                    V2.0
                  </div>
                </el-card>
                <el-card class="info-item-card" shadow="never">
                  <div class="info-header">
                    基于框架
                  </div>
                  <div class="info-text">
                    SpringBoot2.1.3 / Shiro / LayUI
                  </div>
                </el-card>
                <el-card class="info-item-card" shadow="never">
                  <div class="info-header">
                    博客源码
                  </div>
                  <div class="info-text">
                    <a href="https://github.com/TyCoding/tumo" target="_blank">https://github.com/TyCoding/tumo</a>
                  </div>
                </el-card>
                <el-card class="info-item-card" shadow="never">
                  <div class="info-header">
                    联系我
                  </div>
                  <div class="info-text">
                    Blog：<a href="http://tycoding.cn" target="_blank">http://tycoding.cn</a>
                    <br/>
                    Github：<a href="https://github.com/TyCoding/" target="_blank">https://github.com/TyCoding/</a>
                    <br/>
                    QQ Group: 671017003
                  </div>
                </el-card>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getCommentList } from '@/api/comment'
  import { getArticleList } from '@/api/article'
  import { mapGetters } from 'vuex'
  import GithubCorner from '@/components/GithubCorner'
  import PanThumb from '@/components/PanThumb'

  export default {
    name: 'DashboardAdmin',
    components: {
      GithubCorner,
      PanThumb
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'name'
      ])
    },
    data() {
      return {
        commentList: null,
        articleList: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        activeName: 'first',
        welcomeMessage: null
      }
    },
    created() {
      this.fetchData()
      this.init()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getArticleList({}, this.listQuery).then(response => {
          this.articleList = response.data.rows
          this.listLoading = false
        })
        getCommentList({}, this.listQuery).then(response => {
          this.commentList = response.data.rows
          this.listLoading = false
        })
      },

      init() {
        var hour = new Date().getHours();
        var time = hour < 6 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour <= 18 ? '下午好' : '晚上好')));
        var welcomeArr = [
          '喝杯咖啡休息下吧☕',
          '要不要和朋友打局LOL',
          '今天又写了几个Bug呢',
          '今天在群里吹水了吗',
          '今天吃了什么好吃的呢',
          '今天您微笑了吗😊',
          '今天帮助别人了吗',
          '准备吃些什么呢',
          '周末要不要去看电影？'
        ];
        var index = Math.floor((Math.random() * welcomeArr.length));
        this.welcomeMessage = time + '，<a style="color: #5a8bff;">' + this.name + '</a>，' + welcomeArr[index];
      }

    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }
    .welcome-card{
      margin-bottom: 10px;
    }
    .welcome-text {
      color: rgba(0, 0, 0, 0.45);
      padding: .2rem;
      display: inline-block;
      .user-info {
        display: inline-block;
        vertical-align: top;
        padding: 25px;
        .random-message {
          font-size: 1rem;
          margin-bottom: 0.8rem;
          max-width: 21rem;
        }
      }
    }
    .news-text {
      float: right;
      padding: .2rem;
      .box-card {
        padding: 0 10px;
        display: inline-block;
        border: none;
        box-shadow: none !important;
        /deep/ .el-card__header {
          border: none !important;
        }
        .box-num {
          font-size: 20px;
          font-weight: 700;
          color: #20a0ff;
        }
      }
    }
    .project-card {
      .project-item {
        padding: .5rem 0.7rem;
        border: 1px solid #f1f1f1;
        .project-name {
          width: 100%;
          height: 24px;
          a {
            color: #42b983;
            font-size: .9rem;
            font-weight: 600;
          }
        }
        .project-desc {
          line-height: 24px;
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
    .info-card {
      margin-top: 10px;
      .info-item-card {
        /deep/ .el-card {
          border-radius: 0;
          border: 1px solid #e6e6e6;
        }
        .info-header {
          display: inline-block;
          width: 80px;
        }
        .info-text {
          display: inline-block;
          a {
            color: #5a8bff;
          }
        }
      }
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
