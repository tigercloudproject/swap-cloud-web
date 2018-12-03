<template>
    <div class='information-sidebar'>
        <dl>
            <dt>{{ $t('informationPage.historyData') }}</dt>
            <dd><nuxt-link to="/information/funding">{{ $t('informationPage.funding.fundingHistory') }}</nuxt-link></dd>
            <dd><nuxt-link to="/information/insure">{{ $t('informationPage.insure.insureIndex') }}</nuxt-link></dd>
        </dl>
        <dl>
            <dt>{{ $t('informationPage.index.index') }}</dt>
            <dd :key="item.index_id" v-for="item in list"><nuxt-link :to="`/information/index/${item.index_id}`">{{ item.name }}</nuxt-link></dd>
        </dl>
    </div>
</template>
<script>

export default {
  name: 'information-sidebar',
  computed: {
    list() {
      return this.$store.state.market.indexs
    }
  }
}
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.information-sidebar{
    width: 260px;
    background: #fff;
   dl {
       margin-bottom: 0;
       &:last-child {
           dt {
               border-top: 1px solid #eaeff7;
           }
       }
       dt {
            border-bottom: 1px solid #eaeff7;
            padding-left: 24px;
            height: 70px;
            font-size: 18px;
            color: #313a56;
            line-height: 70px;
       }
       dd {
           margin: 0;
          a {
               display: block;
               padding-left: 38px;
               height: 60px;
               font-size: 16px;
               line-height: 60px;
               color: #5b6585;
               &.nuxt-link-active {
                   color: #fff;
                   background: #2b93f6;
               }
          }
       }
   }
}
</style>
