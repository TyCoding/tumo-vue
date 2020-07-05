<template>
  <div class="app-container">
    <el-card>
      <el-tabs tab-position="left">
        <el-tab-pane label="基本设置">
          <h4 class="tab-header">基本设置</h4>
          <div class="tab-view">
            <div class="tab-left">
              <el-form ref="ruleBase" :model="form" :rules="rulesBase" size="small">
                <el-form-item label="登录账户" prop="username">
                  <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="描述" prop="des">
                  <el-input v-model="form.des" type="textarea" />
                </el-form-item>
              </el-form>
              <el-button type="primary" size="mini" @click="handleUpdate('ruleBase')">更新基本信息</el-button>
            </div>
            <div class="tab-right">
              <p><label>头像</label></p>
              <el-avatar :size="100" fit="fill" :src="form.avatar" />
              <div>
                <el-button plain size="mini" icon="el-icon-upload2" @click="handleAvatar">更换头像</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <h4 class="tab-header">修改密码</h4>
          <div class="tab-view">
            <div class="tab-left">
              <el-form ref="rulePass" :model="passForm" :rules="rulesPass" size="small">
                <el-form-item label="新密码" prop="password">
                  <el-input v-model="passForm.password" type="password" />
                </el-form-item>
                <el-form-item label="再次确认" prop="rePass">
                  <el-input v-model="passForm.rePass" type="password" />
                </el-form-item>
              </el-form>
              <el-button type="primary" size="mini" @click="handleUpdatePass('rulePass')">更新密码</el-button>
            </div>
            <div class="tab-right" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="登录日志">
          <h4 class="tab-header">登录日志</h4>
          <div class="tab-view" style="display: block;">
            <el-form size="mini" :inline="true">
              <el-form-item>
                <el-input v-model="query.location" placeholder="请输入登录地点查询" style="width: 300px" />
              </el-form-item>
              <el-form-item style="padding: 0;margin: 0">
                <el-button type="success" icon="el-icon-search" @click="fetchData" />
              </el-form-item>
            </el-form>
            <div class="table-responsive">
              <el-table
                :data="list"
                tooltip-effect="dark"
                style="width: 100%"
                size="mini"
              >
                <el-table-column prop="username" label="登录账户" width="110" />
                <el-table-column prop="ip" label="登录IP" width="120" />
                <el-table-column prop="location" label="登录地点" />
                <el-table-column prop="device" label="登录设备" />
                <el-table-column prop="createTime" label="登录时间" width="150" />
                <el-table-column label="操作" width="50">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-delete" @click="handleDel(scope.row.id)" />
                  </template>
                </el-table-column>
              </el-table>
              <pagination v-show="pageConf.total>0" :total="pageConf.total" :page.sync="pageConf.page" :limit.sync="pageConf.limit" @pagination="fetchData" />
            </div>
          </div></el-tab-pane>
      </el-tabs>
    </el-card>
    <avatar :form="form" :dialog-visible="dialogVisible" @modelOpen="changeAvatar" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateUser, changePass, findUserByName } from '@/api/user'
import { getLoginLogList, loginLogDel } from '@/api/loginlog'
import Pagination from '@/components/Pagination'
import Avatar from './components/Avatar'
export default {
  name: 'Profile',
  components: { Pagination, Avatar },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入登录账户'))
      } else {
        findUserByName(value).then(res => {
          if (res.data != null) {
            callback(new Error('该用户名已存在'))
          } else {
            callback()
          }
        }).catch(() => {
          callback(new Error('服务器错误'))
        })
      }
    }
    var validateRePass = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入原密码'))
      } else {
        if (this.passForm.password != value) {
          callback(new Error('两次输入的密码不一致'))
        }
        callback()
      }
    }
    return {
      form: {},
      passForm: {},
      rulesBase: {
        username: [
          { validator: validateName, required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: '请输入真实姓名', trigger: 'blur' }
        ]
      },
      rulesPass: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        rePass: [
          { validator: validateRePass, required: true, trigger: 'blur' }
        ]
      },
      list: [],
      pageConf: {
        page: 1,
        limit: 8,
        total: 12
      },
      query: {},
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    fetchData() {
      findUserByName(this.name).then(res => {
        if (res.code === 200) {
          this.form = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      getLoginLogList(this.query, this.pageConf).then(res => {
        if (res.code === 200) {
          this.list = res.data.rows
          this.pageConf.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeAvatar() {
      this.disalogVisible = false
      updateUser({
        id: this.form.id,
        avatar: this.form.avatar
      }).then(res => {
        if (res.code === 200) {
          this.$confirm('更新用户头像成功，重新登录后生效，立即重新登录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleAvatar() {
      this.dialogVisible = true
    },
    handleUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUser(this.form).then(res => {
            if (res.code === 200) {
              this.$alert('更新用户信息成功，立即重新登录？', '提示', {
                confirmButtonText: '确定',
                type: 'success'
              }).then(() => {
                this.$store.dispatch('user/logout')
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleUpdatePass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePass(this.passForm).then(res => {
            if (res.code === 200) {
              this.$alert('修改账户密码成功，立即重新登录？', '提示', {
                confirmButtonText: '确定',
                type: 'success'
              }).then(() => {
                this.$store.dispatch('user/logout')
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleDel(id) {
      this.$confirm('你确定永久删除此数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loginLogDel(id).then(res => {
          if (res.code === 200) {
            this.fetchData()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>
<style lang="css" scoped>
  ::v-deep .el-tabs__header{width:224px;border-right:1px solid #f0f0f0}
  ::v-deep .el-tabs__nav-wrap{border:0}
  ::v-deep .el-tabs--left .el-tabs__item.is-left{padding-left:24px;text-align:left}
  ::v-deep .el-tabs__item:after{transform:scaleY(1);opacity:1;transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1);position:absolute;top:0;right:0;bottom:0;border-right:3px solid #1890ff;transform:scaleY(.0001);opacity:0;transition:transform .15s cubic-bezier(.215,.61,.355,1),opacity .15s cubic-bezier(.215,.61,.355,1);content:""}
  ::v-deep .el-tabs__item.is-active{font-weight:700;background-color:#e6f7ff}
  ::v-deep .el-tabs__item{font-variant:tabular-nums;font-feature-settings:"tnum","tnum";font-weight:500;color:rgba(0,0,0,.65);font-size:14px;text-align:left;list-style:none}
  ::v-deep .el-tabs__content{flex:1 1;padding:8px 40px}
  ::v-deep h4.tab-header{margin-bottom:12px;color:rgba(0,0,0,.85);font-weight:500;font-size:20px;line-height:28px}
  ::v-deep .tab-view{display:flex;padding-top:12px}.tab-left{min-width:280px;max-width:448px}.tab-right{flex:1 1;padding-left:104px}
  ::v-deep .avatar-img{width:100px;height:100px;display:inline-block;margin:10px;overflow:hidden;position:relative;border-radius:5%}
  ::v-deep .avatar-img img{width:100px;height:100px;z-index:1}
  ::v-deep .avatar-img img:hover{cursor:pointer}
  ::v-deep .avatar-img-label{position:absolute;right:-17px;top:-7px;width:46px;height:26px;background:#13ce66;text-align:center;transform:rotate(45deg);box-shadow:0 1px 1px #ccc}
  ::v-deep .avatar-img-label .el-icon-check{font-size:12px;margin-top:12px;transform:rotate(-45deg);color:#fff}
</style>
