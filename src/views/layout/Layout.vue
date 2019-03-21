<template>
  <div class="app-wrapper">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button slot="left" icon>
        <mu-icon value="menu"/>
      </mu-button>
      标题
      <mu-button slot="right" flat @click="doLogout">登出</mu-button>
    </mu-appbar>
    <div class="main-container">
      <router-view :key="key"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  methods: {
    doLogout() {
      this.$store.dispatch('user/FedLogOut').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>

</style>
