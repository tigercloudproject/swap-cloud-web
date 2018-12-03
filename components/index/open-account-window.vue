
<template>
  <div class="open-account-window">
    <h5>{{ $t('index.open.notice') }}</h5>
    <p>{{ $t('index.open.message1') }}</p>
    <p>{{ $t('index.open.message2') }}</p>
    <p>{{ $t('index.open.message3') }}</p>
    <p>{{ $t('index.open.message4') }}</p>
    <p>{{ $t('index.open.message5') }}</p>
    <p>{{ $t('index.open.message6') }}</p>
    <p>{{ $t('index.open.message7') }}</p>
    <div>
      <a @click="createContractAccount" target="_blank">{{ $t('index.open.messageBtn') }}</a>
    </div>
    <div><span>{{ $t('index.open.tips') }}</span></div>
  </div>
</template>

<script>
  export default {
    name: 'open-account-window',
    props: ['close'],
    data() {
      return {
      }
    },
    computed: {
      productInfo() {
        return this.$store.state.market.productInfo
      }
    },
    methods: {
      createContractAccount() {
        this.swapsApi.createContractAccount(this.productInfo.contract.contract_id)
        .then(res => {
          if (res.errno === 'OK') {
            this.$alert('s', this.$t('index.open.message'))
            this.close()
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../assets/css/base";
.open-account-window {
  padding: 10px 20px;
  h5 {
    font-size: 14px;
    font-weight: 400;
  }
    p {
      margin: 10px 0;
      font-size: 12px;
      font-weight: 400;
    }
    a {
        margin-top: 20px;
        // margin-left: 37px;
        display: block;
        width: 480px;
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
    div {
      margin-top: 10px;
      span {
        color: @bbxFooterColor;
        font-size: 12px;
        font-weight: 400;
      }
    }
}
</style>
