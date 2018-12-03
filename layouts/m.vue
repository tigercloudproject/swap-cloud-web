<template>
<div class="default black">
  <common-header v-if="!$route.query.token"></common-header>
   <div>
    <nuxt/>
  </div>
</div>
</template>

<script>
import CommonFooter from '../components/template/footer'
import CommonHeader from '../components/template/header'
export default {
  head() {
    return {
      title: this.$t('header.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('header.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('header.keywords') },
        { hid: 'format-detection', name: 'format-detection', content: 'telephone=no' },
        { hid: 'viewport', name: 'viewport', content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' }
      ]
    }
  },
  components: {
    CommonFooter,
    CommonHeader
  },
  methods: {
    setFontSize() {
      if (!window.addEventListener) return
      let html = document.documentElement
      let setFont = () => {
        let cliWidth = html.clientWidth
        html.style.fontSize = 100 * (cliWidth / 750) + 'px'
        this.$store.commit('m/SET_M', {
          windowWidth: 440 * (cliWidth / 750)
        })
      }
      window.addEventListener('resize', setFont)
      setFont()
    }
  },
  mounted() {
    this.setFontSize()
  }
}
</script>

<style lang="less">
html {
  font-size: 100px;
}
.default {
  position: relative;
}
</style>
