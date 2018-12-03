<template>
<div class="information-insure">
    <st-row>
        <insure-page></insure-page>
    </st-row>
</div>
</template>

<script>
import insurePage from '../../../components/information/insure-page.vue'
import SwapsApi from '../../../assets/js/api/swapsApi'
export default {
  name: 'information-insure',
  head() {
    return {
      title: this.$t('informationPage.historyData')
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
    insurePage
  }
}
</script>

<style lang="less" scoped>

</style>
