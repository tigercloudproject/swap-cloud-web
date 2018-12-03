<template>
<div class="default white">
  <common-header></common-header>
  <st-row class="container">
        <information-sidebar></information-sidebar>
        <nuxt/>
    </st-row>
    <common-footer/>
</div>
</template>

<script>
import CommonFooter from '../components/template/footer'
import CommonHeader from '../components/template/header'
import InformationSidebar from '../components/information/sidebar.vue'
import ApiConfig from '../config/api.config'
import webSocketFn from '../assets/js/webSocket'
export default {
  components: {
    CommonFooter,
    CommonHeader,
    InformationSidebar
  },
  beforeMount() {
    window.webSocket_base = webSocketFn(ApiConfig.webSocketUrl)
  }
  // mounted() {
  //   this.$store.dispatch('getUser')
  // }
}
</script>

<style lang="less">

.default {
  position: relative;
  min-width: 1260px;
  padding-bottom: 385px;
}
.black {
  background: #171A25;
  .container
      {
        margin: 0;
        width: 100%;
        padding: 100px 0;
      }
}
.white {
  background: #f3f7fc;
  .container
    {
      width: 1200px;
      margin: 20px auto 50px;
    }
}
</style>
