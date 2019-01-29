<template>
  <el-menu class="navbar" mode="horizontal">
    <h2 class="title">
      <router-link :to="addRouters[0].path">XXXX-XX管理中心</router-link>
    </h2>
    <div class="avatar-container">
      <div class="log">更新日志</div>
      <div class="username" title="退出登录" @click="onUserClick">
        {{ userInfo.name }}
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'addRouters',
      'userInfo'
    ])
  },
  methods: {
    onUserClick() {
      this.$confirm('确认退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/FedLogOut').then(() => {
          location.reload()
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $height: 60px;
  .navbar {
    height: $height;
    line-height: $height;
    border-radius: 0px !important;
    background: #304156;
    .title {
      display: inline-block;
      margin: 0;
      color: #fff;
      padding-left: 1em;
    }
    .avatar-container {
      position: absolute;
      right: 0;
      display: inline-block;
      color: #fff;
      div {
        display: inline-block;
        cursor: pointer;
      }
      .log {
        font-size: 0.8em;
        &:hover {
          color: gray;
        }
      }
      .username {
        padding: 0 35px;
        transition: color 300ms;
        &:hover {
          color: gray;
        }
      }
    }
  }
</style>

