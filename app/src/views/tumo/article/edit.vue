<template>
  <div class="app-container">
    <el-card>
      <el-form ref="form" :model="form" :rules="rulesForm" label-width="80px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="文章分类" prop="category">
              <el-select v-model="form.category" value-key="id" placeholder="请选择文章分类" style="width: 100%">
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="文章标签" prop="tags">
              <el-select v-model="form.tags" value-key="id" multiple placeholder="请选择文章标签" style="width: 100%">
                <el-option
                  v-for="item in tagList"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文章描述" prop="des">
          <tinymce v-model="form.des" :height="300" />
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <tinymce v-model="form.content" :height="300" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleSubmit('form')">更新文章</el-button>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
import { getCategoryFilterList } from '@/api/category'
import { getTagFilterList } from '@/api/tag'
import { getArticleById, articleUpdate } from '@/api/article'

export default {
  name: 'Add',
  components: { Tinymce },
  computed: {
    ...mapGetters([
      'qiNiuUploadApi'
    ])
  },
  data() {
    return {
      content: '',
      form: {},
      categoryList: [],
      tagList: [],
      rulesForm: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        tags: [
          { required: true, message: '请选择文章标签', trigger: 'change' }
        ],
        des: [
          { required: true, message: '请输入文章描述', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      getCategoryFilterList({}).then(res => {
        this.categoryList = res.data
      })
      getTagFilterList({}).then(res => {
        this.tagList = res.data
      })
      getArticleById(id).then(res => {
        this.form = res.data
      })
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          articleUpdate(this.form).then(res => {
            if (res.code === 200) {
              this.$message.success('文章更新成功，即将跳转到文章列表页面')
              setTimeout(function() {
                window.location.href = '/tumo/article'
              }, 400)
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
