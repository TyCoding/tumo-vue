<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="80px">
    <el-form-item prop="username" label="账户">
      <el-input v-model="form.username"/>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input v-model="form.password" placeholder="请输入新密码" type="password"/>
    </el-form-item>
    <el-form-item prop="introduce" label="介绍">
      <el-input v-model="form.introduce"/>
    </el-form-item>
    <el-form-item prop="remark" label="备注">
      <el-input type="text" v-model="form.remark"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit('form')">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { getInfo, update } from '@/api/login'
  export default {
    data() {
      return {
        rules: {
          username: [
            { required: true, message: '请填写账户名', trigger: 'blur' }
          ],
          introduce: [
            { required: true, message: '请填写介绍', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ]
        },
        form: {}
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getInfo().then(res => {
          this.form = res.data
          this.form.password = null
        })
      },
      submit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.form.password == null || this.form.password == '') {
              this.form.password = null
            }
            update(this.form).then(res => {
              if (res.code == 200) {
                this.$store.dispatch('user/logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
