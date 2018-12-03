
<template>
  <div class="unwind-window">
      <div class="unwind-window-message">
          <h4>{{ $t(`common.${info.category === 1 ? 'limitPrice' : 'marketPrice'}`) + $t(`common.${info.way === 2 ? 'buy' : 'sell'}`) + $t('common.table.unwind') }}</h4>
          <p v-if="!isAll" ><span>{{ $t(`common.${info.way === 2 ? 'buy' : 'sell'}`) }}</span>{{ $t('record.cp.tradeMessage') }}<span>{{ info.category === 1 ? info.price : $t('common.marketPrice') }}</span>{{ info.category === 1 ? productInfo.contract.quote_coin : '' }} <span>{{ info.vol }}</span>{{ $t('common.pieces') + ' ' + productInfo.contract.name }}</p>
          <p v-else>{{ $t('record.cp.positionMesage') }}</p>
      </div>
      <div class="unwind-window-content">
         <p @click="isConfirm" :class="{active: isShow}" v-if="!isAll">
           <st-row align="center" justify="end">
             <i></i> &nbsp;<p>{{ $t('record.cp.noAccording') }}</p>
           </st-row>
         </p>
         <st-row justify="between" class="unwind-window-btn">
            <a @click="close">{{ $t('common.cancel') }}</a><a @click="unwind">{{ info.category === 1 ? $t('record.cp.limitPricePosition') : $t('common.table.marketPriceUnwind') }}</a>
         </st-row>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'unwind-window',
    props: ['close', 'info', 'isAll'],
    data() {
      return {
        isShow: false
      }
    },
    mounted() {
    },
    computed: {
      productInfo() {
        return this.$store.state.market.productInfo
      }
    },
    methods: {
      unwind() {
        this.$emit('submitOrder', this.info.longOrSort)
      },
      isConfirm() {
        this.isShow = !this.isShow
        this.isShow ? window.localStorage.setItem('isConfirm', '1') : window.localStorage.removeItem('isConfirm')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 @import "../../../assets/css/base";
.unwind-window {
    padding: 0 20px;
    .unwind-window-message {
       margin-top: 24px;
       text-align: center;
       h4 {
           font-weight: 500;
           font-size: 22px;
           color: @bbxGreen;
       }
       p {
           &:nth-child(2) {
               margin: 14px 0;
               font-size: 16px;
              //  font-weight: 500;
               color: #000;
               span {
                   color: @bbxGreen;
               }
           }
           &:last-child {
             color: #4D5D8E;
           }
       }
    }
    .unwind-window-content {
        padding: 0 30px;
        p {
            padding: 10px 0 ;
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
    .unwind-window-btn a{
      width: 160px;
      height: 50px;
      text-align: center;
      line-height: 48px;
      font-size: 18px;
      border-radius: 2px;
      &:first-child {
        border: 1px solid @windowButton;
        color: @windowButton;
        &:hover {
           border-color: @windowButtonHover;
           color: @windowButtonHover;
        }
      }
      &:last-child {
          background-color: @windowButton;
          color: @bbxWhite;
        &:hover {
           background-color: @windowButtonHover;
        }
      }
    }
}
</style>
