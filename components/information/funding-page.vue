<template>
    <div class='insure-page'>
       <h4>{{ $t('informationPage.funding.historyTable') }}</h4>
       <div class="insure-page-message">
           <h6>{{ $t('informationPage.funding.historyTable') }}</h6>
           <p>{{ $t('informationPage.funding.messageOne') }}</p>
           <p>{{ $t('informationPage.funding.messageTwo') }}</p>
       </div>
       <st-row justify="between" align="center" class="insure-page-opctions">
          <information-selector></information-selector>
          <div class="insure-page-opctions-count">{{ $t('informationPage.insure.show') }} {{( this.getPage - 1) * 10 + 1 }} - {{ this.getPage * 10 }}</div>
          <page :isDown="isDown"></page>
       </st-row>
       <div class="insure-page-list">
           <table>
                  <thead>
                      <tr><th>{{ $t('informationPage.time') }}</th><th>{{ $t('informationPage.funding.contract') }}</th><th>{{ $t('informationPage.funding.interval') }}</th><th>{{ $t('informationPage.funding.rate') }}</th> <th>{{ $t('informationPage.funding.dayRate') }}</th></tr>
                  </thead>
                 <tbody>
                      <tr :key="item.timestamp" v-for="item in list"><td>{{(item.timestamp + deliveryCycle) * 1000 |timeFormat}}</td><td>{{name}}</td><td>{{ $t('informationPage.hours', {hours: deliveryCycle / 3600}) }}</td><td>{{item.rate * 100|retainDecimals({decimal: 4})}}%</td><td>{{item.rate * 300|retainDecimals({decimal: 4})}}%</td></tr>
                 </tbody>
            </table>
       </div>
    </div>
</template>
<script>
import InformationSelector from './selector'
import Page from '../bx-ui/page'
export default {
  name: 'funding-page',
  components: {
    InformationSelector,
    Page
  },
  data() {
    return {
      isDown: false,
      name: '',
      list: null,
      deliveryCycle: null
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
      this.deliveryCycle = this.productList.filter(item => { return item.contract.contract_id === Number(contract_id) })[0].contract.delivery_cycle
      this.swapsApi.fundingrate(contract_id, (this.getPage - 1) * 10)
      .then(res => {
        if (res.data.length !== 10) {
          this.isDown = true
        } else {
          this.isDown = false
        }
        this.name = this.productList.filter(item => {
          return item.contract.contract_id === Number(contract_id)
        })[0].contract.name
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
