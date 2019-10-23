
<template>
  <div class="set-up-window">
    <div class="set-up-window-content">
      <st-row>
      <p>{{ $t('typeTitle.showUnit') }}</p>
      <st-row>
        <p @click="changeCoinUnit(true)" :class="{active: coinUnit}"><i></i> {{ $t('common.pieces') }}</p>
        <p @click="changeCoinUnit(false)" :class="{active: !coinUnit}"><i></i> {{ productInfo.contract.base_coin }}</p>
      </st-row>
    </st-row>
    <st-row>
      <p>{{ $t('typeTitle.pnlCalculator') }}</p>
      <st-row>
        <p @click="changePriceType(true)" :class="{active: pnlPriceUnit}"><i></i> {{ $t('typeTitle.onPrice') }}</p>
        <p @click="changePriceType(false)" :class="{active: !pnlPriceUnit}"><i></i> {{ $t('typeTitle.newsPrice') }}</p>
      </st-row>
    </st-row>
    </div>

    <st-row justify="center">
      <a @click="close">{{ $t('record.cp.confirm') }}</a>
    </st-row>
  </div>
</template>

<script>
  export default {
    name: 'set-up-window',
    props: ['close'],
    data() {
      return {
      }
    },
    computed: {
      coinUnit() {
        return this.$store.state.market.coinUnit
      },
      pnlPriceUnit() {
        return this.$store.state.market.pnlPriceUnit
      },
      productInfo() {
        return this.$store.state.market.productInfo
      }
    },
    methods: {
      changePriceType(bl) {
        window.localStorage.setItem('pnlPriceUnit', bl)
        this.$store.commit('market/SET_MARKET', {
          key: 'pnlPriceUnit',
          data: bl
        })
      },
      changeCoinUnit(bl) {
        window.localStorage.setItem('coinUnit', bl)
        this.$store.commit('market/SET_COINUNIT', {
          data: bl
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../../assets/css/base";
.set-up-window {
  padding: 10px 20px 0;
  .set-up-window-content {
    padding: 30px 10px;
    border-bottom: 1px solid rgba(151, 176, 214, .5);
    p {
      width: 130px;
      text-align: left;
      font-size: 14px;
      font-weight: 400;
      }
    div {
        align-items: center;
    }
  }
    a {
        margin-top: 30px;
        // margin-left: 37px;
        display: block;
        width: 180px;
        height: 40px;
        background-color: @windowButton;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
        color: @bbxWhite;
        border-radius: 2px;
        &:hover {
            background-color: @windowButtonHover;
        }
    }
    p {
            margin-bottom: 10px;
            cursor: pointer;
            color: #4D5D8E;
            text-align: right;
            font-size: 12px;
            i {
                display: inline-block;
                width: 12px;
                height: 12px;
                background-image: url("../../../assets/img/icon-chose-login_nor.png");
            }
             &.active i{
                  background-image: url("../../../assets/img/icon-chose-login_sel.png");
            }
        }
}
</style>
