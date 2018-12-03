<template>
    <div class='insure-page'>
       <h4>{{ $t('informationPage.insure.insureIndex') }}</h4>
       <div class="insure-page-message">
           <h6>{{ $t('informationPage.insure.balance') }}</h6>
           <p>
               {{ $t('informationPage.insure.messageOne') }}
           </p>
           <p>{{ $t('informationPage.insure.messageTwo') }}</p>
           <p>{{ $t('informationPage.insure.messageThree') }}</p>
       </div>
       <st-row justify="between" align="center" class="insure-page-opctions">
          <information-selector></information-selector>
          <div class="insure-page-opctions-count">{{ $t('informationPage.insure.show') }} {{( this.getPage - 1) * 10 + 1 }} - {{ this.getPage * 10 }}</div>
          <page :isDown="isDown"></page>
       </st-row>
       <div class="insure-page-list">
           <table>
                  <thead>
                      <tr><th>{{ $t('informationPage.time') }}</th><th>{{ $t('informationPage.insure.balance') }}</th> </tr>
                  </thead>
                 <tbody>
                     <tr :key="item.timestamp" v-for="item in list"><td>{{item.timestamp * 1000|timeFormat}}</td><td>{{item.vol|addCommom(valueUnit)}} {{ coin }}</td></tr>
                 </tbody>
            </table>
       </div>
    </div>
</template>
<script>
import InformationSelector from './selector'
import Page from '../bx-ui/page'
import Formula from '../../assets/js/formula/index.js'
export default {
  name: 'insure-page',
  components: {
    InformationSelector,
    Page
  },
  data() {
    return {
      isDown: false,
      coin: '',
      list: null,
      valueUnit: 0
    }
  },
  computed: {
    productList() {
      return this.$store.state.market.productList
    },
    getPage() {
      return this.$route.query.page || 1
    }
  },
  watch: {
    '$route'() {
      this.getList()
    }
  },
  methods: {
    getList() {
      let contract_id = this.$route.query.id || this.productList[0].contract.contract_id
      this.swapsApi.riskReserves(contract_id, (this.getPage - 1) * 10)
      .then(res => {
        if (res.data.length !== 10) {
          this.isDown = true
        } else {
          this.isDown = false
        }
        let info = this.productList.filter(item => {
          return item.contract.contract_id === Number(contract_id)
        })[0].contract
        this.valueUnit = info.value_unit.length - 2
        this.coin = Formula.MarginCoin(info.base_coin, info.quote_coin, info.price_coin)
        this.list = res.data
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
 @import "./information.less";
</style>
