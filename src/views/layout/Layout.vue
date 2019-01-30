<template>
  <div class="app-wrapper">
    <navbar/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .main-container {
      padding: 1em;
      background: #e9e9e9;
    }
  }
</style>
