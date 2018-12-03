<template>
<div class="default black">
  <common-header></common-header>
  <div>
    <nuxt/>
  </div>
    <common-footer/>
</div>
</template>

<script>
import CommonFooter from '../components/template/footer'
import CommonHeader from '../components/template/header'
import InformationSidebar from '../components/information/sidebar.vue'
export default {
  head() {
    return {
      title: this.$t('header.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('header.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('header.keywords') },
        { hid: 'format-detection', name: 'format-detection', content: 'telephone=no' }
      ]
    }
  },
  components: {
    CommonFooter,
    CommonHeader,
    InformationSidebar
  }
}
</script>

<style lang="less" scoped>

.default {
  position: relative;
  min-width: 1260px;
  padding-bottom: 385px;
}
@media screen and (max-width:750px) {
  .default {
    padding-bottom: 640px;
  }
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
