<template>
  <el-dialog title="更换头像" :visible="dialogVisible" width="47%" :before-close="handleClose" :close-on-press-escape="false" :close-on-click-modal="false">
    <div v-for="i in fileList" :key="i" class="avatar-img" @click="handleClick(i)">
      <img :src="i">
      <label :style="form.avatar == i ? '':'display:none'" class="avatar-img-label"><i class="el-icon-upload-success el-icon-check" /></label>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="changeAvatar">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [
        '/img/avatar/20180414165754.jpg',
        '/img/avatar/20180414165815.jpg',
        '/img/avatar/20180414165821.jpg',
        '/img/avatar/20180414165827.jpg',
        '/img/avatar/20180414165834.jpg',
        '/img/avatar/20180414165840.jpg',
        '/img/avatar/20180414165846.jpg',
        '/img/avatar/20180414165855.jpg',
        '/img/avatar/20180414165909.jpg',
        '/img/avatar/20180414165914.jpg',
        '/img/avatar/20180414165920.jpg',
        '/img/avatar/20180414165927.jpg',
        '/img/avatar/20180414165936.jpg',
        '/img/avatar/20180414165942.jpg',
        '/img/avatar/20180414165947.jpg',
        '/img/avatar/20180414165955.jpg',
        '/img/avatar/20180414170003.jpg',
        '/img/avatar/default.jpg'
      ]
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    handleClick(url) {
      if (this.avatar == url) {
        this.form.avatar = ''
      } else {
        this.form.avatar = url
      }
    },
    changeAvatar() {
      this.$emit('modelOpen')
    }
  }
}
</script>

<style scoped>
  .avatar-img{width:100px;height:100px;display:inline-block;margin:10px;overflow:hidden;position:relative;border-radius:5%}.avatar-img img{width:100px;height:100px;z-index:1}.avatar-img img:hover{cursor:pointer}.avatar-img-label{position:absolute;right:-17px;top:-7px;width:46px;height:26px;background:#13ce66;text-align:center;transform:rotate(45deg);box-shadow:0 1px 1px #ccc}.avatar-img-label .el-icon-check{font-size:12px;margin-top:12px;transform:rotate(-45deg);color:#fff}
</style>

