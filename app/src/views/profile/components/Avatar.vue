<template>
  <el-dialog title="修改头像" :visible.sync="dialogVisible" width="30%" :append-to-body='true' :before-close="handleClose">
    <span id="app-avatar">
        <el-tabs v-model="activeName">
          <el-tab-pane label="后田花子" name="first">
            <img @click="editAvatar($event)" src="/avatar/1d22f3e41d284f50b2c8fc32e0788698.jpeg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/2dd7a2d09fa94bf8b5c52e5318868b4d9.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/2dd7a2d09fa94bf8b5c52e5318868b4df.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/8f5b60ef00714a399ee544d331231820.jpeg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/17e420c250804efe904a09a33796d5a10.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/17e420c250804efe904a09a33796d5a16.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/87d8194bc9834e9f8f0228e9e530beb1.jpeg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/496b3ace787342f7954b7045b8b06804.jpeg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/595ba7b05f2e485eb50565a50cb6cc3c.jpeg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/964e40b005724165b8cf772355796c8c.jpeg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/5997fedcc7bd4cffbd350b40d1b5b987.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/5997fedcc7bd4cffbd350b40d1b5b9824.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/a3b10296862e40edb811418d64455d00.jpeg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/a43456282d684e0b9319cf332f8ac468.jpeg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/bba284ac05b041a8b8b0d1927868d5c9x.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/c7c4ee7be3eb4e73a19887dc713505145.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/ff698bb2d25c4d218b3256b46c706ece.jpeg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/default.jpg" title="点击更换">
          </el-tab-pane>
          <el-tab-pane label="阿里系" name="second">
            <img @click="editAvatar($event)" src="/avatar/BiazfanxmamNRoxxVxka.png" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/cnrhVkzwxjPwAaCfPbdc.png" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/gaOngJwsRYRaVAuXXcmB.png" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/jZUIxmJycoymBprLOUbT.png" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/ubnKSIfAJTxIgXOKlciN.png" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/WhxKECPNujWoWEFNdnJE.png" title="点击更换">
          </el-tab-pane>
          <el-tab-pane label="脸萌" name="third">
            <img @click="editAvatar($event)" src="/avatar/20180414165920.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165927.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165754.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165815.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165821.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165827.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165834.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165840.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165846.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165855.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165909.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165914.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165936.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165942.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165947.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414165955.jpg" title="点击更换">
            <img @click="editAvatar($event)" src="/avatar/20180414170003.jpg" title="点击更换">
        </el-tab-pane>
        </el-tabs>
    </span>
  </el-dialog>
</template>

<script>
  import { getInfo, update } from '@/api/login'
  export default {
    name: "Avatar",
    props: ["content"],
    watch: {
      content(newVal, oldVal) {
        if (newVal) {
          this.dialogVisible = true
        }
      }
    },
    data() {
      return {
        form: {},
        activeName: 'first',
        dialogVisible: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getInfo().then(res => {
          this.form = res.data
        })
      },
      handleClose() {
        this.dialogVisible = false
      },
      editAvatar(event) {
        let data = {
          id: this.form.id,
          avatar: event.target.src
        }
        update(data).then(res => {
          if (res.code == 200) {
            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  }
</script>

<style scoped>
  #app-avatar img {
    width: 5rem;
    border-radius: 50%;
    margin: .5rem;
    cursor: pointer;
  }

  #app-avatar .layui-tab-item {
    margin-left: 1rem;
  }
</style>
