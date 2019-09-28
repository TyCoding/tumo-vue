<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <el-button @click="editAvatar" size="mini" style="margin: 17px 0 0 -10px;">更换头像</el-button>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
      </div>
    </div>

    <avatar :content="status"/>

    <div class="user-bio">
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="skill"/>
          <span>Skills</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Java</span>
            <el-progress :percentage="40"/>
          </div>
          <div class="progress-item">
            <span>Spring</span>
            <el-progress :percentage="10"/>
          </div>
          <div class="progress-item">
            <span>Spring Boot / Spring Cloud</span>
            <el-progress :percentage="5"/>
          </div>
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="30"/>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  import Avatar from './Avatar'
  import PanThumb from '@/components/PanThumb'

  export default {
    components: {Avatar, PanThumb},
    data() {
      return {
        status: false
      }
    },
    props: {
      user: {
        type: Object,
        default: () => {
          return {
            name: '',
            avatar: '',
          }
        }
      }
    },
    methods: {
      editAvatar() {
        this.status = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }

    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>
