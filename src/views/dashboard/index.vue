<template>
  <div>
    <div class="icon-container">
      <mu-icon value="home"/>
      <mu-icon value="flight_takeoff" color="red"/>
      <mu-icon value="cloud_download" color="orange"/>
      <mu-icon value="info" color="blue"/>
    </div>
    <div class="icon-container">
      <mu-icon size="36" value="home"/>
      <mu-icon size="36" value="flight_takeoff" color="red"/>
      <mu-icon size="36" value="cloud_download" color="orange"/>
      <mu-icon size="36" value="info" color="blue"/>
    </div>
    <div class="icon-container">
      <mu-icon size="48" value="home"/>
      <mu-icon size="48" value="flight_takeoff" color="red"/>
      <mu-icon size="48" value="cloud_download" color="orange"/>
      <mu-icon size="48" value="info" color="blue"/>
    </div>
    <div class="icon-container">
      <mu-icon size="56" value="home"/>
      <mu-icon size="56" value="flight_takeoff" color="red"/>
      <mu-icon size="56" value="cloud_download" color="orange"/>
      <mu-icon size="56" value="info" color="blue"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
