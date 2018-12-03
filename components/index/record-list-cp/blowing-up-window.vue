
<template>
  <div class="blowing-up-window">
    <template v-if="isStrongOrBlow && info" >
      <p v-html="$t('record.cp.blowingUpFive', {time: getTime(), price: (Util.retainDecimals(info.trigger_price, {decimal: com.priceUnit}) || 0) + ' ' + productInfo.contract.quote_coin, dealPrice: Util.retainDecimals(info.order_price, {decimal: com.priceUnit}) + ' ' + productInfo.contract.quote_coin})"></p>
      <a target="_blank" :href="`https://support.bbx.com/hc/${locale}/articles/360007975194`">{{ $t('record.cp.blowingUpFore')}}</a>
    </template> 
    <template v-else-if="info">
      <p v-html="$t('record.cp.blowingUpOne', {time: getTime(), price: (Util.retainDecimals(info.trigger_price, {decimal: com.priceUnit}) || 0) + ' ' + productInfo.contract.quote_coin, name: productInfo.contract.name, mmr: Util.retainDecimals(info.mmr * 100, {decimal: 2}), positionType: $t(way === 3 ? 'record.cp.more' : 'record.cp.empty'), direction: $t(way === 3 ? 'record.cp.down' : 'record.cp.on')})"></p>
      <p v-html="$t('record.cp.blowingUpTwo', {price: (Util.retainDecimals(info.order_price, {decimal: com.priceUnit}) || 0) + ' ' + productInfo.contract.quote_coin})"></p>
      <a target="_blank" :href="`https://support.bbx.com/hc/${locale}/articles/360007975034?flash_digest=e1b2b532812c9ffee70986d118c3efc6d1b7afca`">{{ $t('record.cp.blowingUpThree') }}</a>
    </template>  
  </div>
</template>

<script>
  import Util from '../../../assets/js/util.js'
  export default {
    name: 'blowing-up-window',
    props: ['close', 'orderId', 'way', 'isStrongOrBlow'],
    data() {
      return {
        info: null,
        Util: Util
      }
    },
    mounted() {
      this.userLiqRecords()
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      },
      com() {
        return this.$store.state.com
      },
      productInfo() {
        return this.$store.state.market.productInfo
      }
    },
    methods: {
      userLiqRecords() {
        this.swapsApi.userLiqRecords(this.orderId)
        .then(res => {
          this.info = res.data.records[0]
        })
      },
      getTime() {
        return Util.timeFormat(this.info.created_at)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../../assets/css/base";
.blowing-up-window {
    padding-top: 20px;
    p {
        position: relative;
        padding: 10px 50px;
        color: #313A56;
        word-wrap: break-word;
       i {
           position: absolute;
           left: 30px;
           top: 12px;
           width: 16px;
           height: 16px;
           background-color: @bbxBlue1;
           border-radius: 50%;
           text-align: center;
           line-height: 16px;
           font-style: normal;
           color: #fff;
           font-size: 12px;
       }
       span {
           color: #c87e80;
       }
    }
    a {
        margin-top: 20px;
        margin-left: 37px;
        display: block;
        width: 240px;
        height: 50px;
        background-color: @windowButton;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        color: @bbxWhite;
        &:hover {
            background-color: @windowButtonHover;
        }
    }
}
</style>
