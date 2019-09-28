<template>
  <div class="app-container">
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" style="display: inline-block">
          <el-select v-model="form.category" placeholder="请选择文章分类" style="width:400px">
            <el-option v-for="item in categoryList" :label="item.name" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" style="display: inline-block">
          <el-select multiple v-model="tags" placeholder="请选择文章标签" style="width: 500px">
            <el-option v-for="item in tagList" :label="item.name" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容">
          <div class="editor-container">
            <markdown-editor ref="markdownEditor" :content="form.contentMd" @editor="editor" height="600px"/>
          </div>
        </el-form-item>
        <el-form-item class="cover" label="文章封面">
          <el-upload
            :headers="tokenHeader"
            class="avatar-uploader"
            :action="qiNiuUploadApi"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.cover" :src="form.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="draftSubmit">存入草稿</el-button>
          <el-button type="primary" @click="releaseSubmit">发表文章</el-button>
          <el-button type="warning" @click="resetSubmit">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { update, findById } from '@/api/article'
  import {getAllCategory} from '@/api/category'
  import {getAllTag} from "@/api/tag";
  import MarkdownEditor from './components/markdown'

  export default {
    name: "edit",
    components: {MarkdownEditor},
    computed: {
      ...mapGetters([
        'qiNiuUploadApi',
        'token'
      ])
    },
    data() {
      return {
        form: {},
        tags: [],
        tokenHeader: {},
        categoryList: null,
        tagList: null,
      }
    },
    created() {
      this.tokenHeader = {'Authorization': this.token}
      this.fetchData()
    },
    methods: {
      fetchData() {
        findById(this.$route.params.id).then(res => {
          this.form = res.data

          if (this.form.tags instanceof Array) {
            this.form.tags.forEach(tag => {
              this.tags.push(tag.id)
            })
          }

          getAllCategory().then(response => {
            this.categoryList = response.data

            for (let i = 0; i < this.categoryList.length; i++) {
              if (response.data[i].id == res.data.category) {
                this.form.category = response.data[i].name
              }
            }
          })
        })
        getAllTag().then(res => {
          this.tagList = res.data
        })
      },

      clearForm() {
        this.form = {}
        this.tags = []
      },

      //markdown编辑器数据变化时触发
      editor(val){
        this.form.contentMd = val.md;
        this.form.content = val.html;
      },

      handleAvatarSuccess(res, file) {
        if (res.code == 500) {
          this.$message.error(res.msg)
        }
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.form.cover = res.data.url;
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      draftSubmit() {
        if (this.tags != null || this.tags.length > 0) {
          let tags = []
          this.tags.forEach(t => {
            tags.push({id: t})
          })
          this.form.tags = tags
        } else {
          this.form.tags = null
        }

        this.form.state = 0
        update(this.form).then(res => {
          this.$router.replace('/admin/article/list')
        })

      },
      releaseSubmit() {
        if (this.tags != null || this.tags.length > 0) {
          let tags = []
          this.tags.forEach(t => {
            tags.push({id: t})
          })
          this.form.tags = tags
        } else {
          this.form.tags = null
        }

        this.form.state = 1
        update(this.form).then(res => {
          this.$router.replace('/admin/article/list')
        })
      },
      resetSubmit() {
        this.clearForm()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor-container {
    margin-bottom: 30px;

    /deep/ .tui-editor-defaultUI .te-mode-switch-section {
      height: 40px !important;
    }
  }
  .cover {
    /deep/ .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    /deep/ .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    /deep/ .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    /deep/ .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
