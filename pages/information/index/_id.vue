<template>
<div class="information-funding">
    <st-row>
        <index-page></index-page>
    </st-row>
</div>
</template>

<script>
// import InformationSidebar from '../../../components/information/sidebar.vue'
import IndexPage from '../../../components/information/index-page.vue'
import SwapsApi from '../../../assets/js/api/swapsApi'
export default {
  name: 'information-funding',
  head() {
    return {
      title: this.$t('informationPage.index.index')
    }
  },
  async asyncData({ store }) {
    let res = await SwapsApi.getIndexList()
    store.commit('market/SET_MARKET', {
      key: 'indexs',
      data: res.data
    })
  },
  layout: 'information',
  components: {
    // InformationSidebar,
    IndexPage
  }
}
</script>

<style lang="less" scoped>

</style>
