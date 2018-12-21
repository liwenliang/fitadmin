<template>
  <el-menu class="navbar" mode="horizontal">
    <h2 class="title">遥诺科技-平台管理中心</h2>
    <div class="avatar-container" trigger="click">
      {{ name }}
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
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
    background: #1bbc9b;
    .title {
      display: inline-block;
      margin: 0;
      padding-left: 1em;
    }
    .avatar-container {
      height: $height;
      display: inline-block;
      position: absolute;
      right: 35px;
    }
  }
</style>

