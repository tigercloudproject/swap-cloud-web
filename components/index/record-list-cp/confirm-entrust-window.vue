
<template>
  <div class="confirm-entrust-window">
      <div class="confirm-entrust-window-message">
          <h4>{{ $t(`common.${info.category === 1 ? 'limitPrice' : 'marketPrice'}`) + $t(`common.${info.way === 1 ? 'buy' : 'sell'}`)}}</h4>
          <p>({{ info.leverageName !== 'allCabin' ? ($t('submitEntrust.partCabin') + ' ' + info.leverageName) : $t('submitEntrust.allCabin') }})</p>
          <p><span>{{ $t(`common.${info.way === 1 ? 'buy' : 'sell'}`) }}</span>{{ $t('record.cp.tradeMessage') }}<span>{{ info.category === 1 ? info.price : $t('common.marketPrice') }}</span>{{ info.category === 1 ? productInfo.contract.quote_coin : '' }} <span>{{ info.vol }}</span>{{ $t('common.pieces') + ' ' + productInfo.contract.name }} </p>
      </div>
      <div class="confirm-entrust-window-content">
         <table>
             <tbody>
                 <tr>
                     <td>{{ $t('record.cp.entrustedValue') }}</td>
                     <td>{{ info.jz }}</td>
                 </tr>
                 <tr>
                     <td>{{ $t('record.cp.costing', {leverage: info.leverageName !== 'allCabin' ? info.leverageName : '100x'}) }}</td>
                     <td>{{ info.cb }}</td>
                 </tr>
                 <tr>
                     <td>{{ $t('record.cp.balance') }}</td>
                     <td>{{ info.ye }}</td>
                 </tr>
                 <tr>
                     <td>{{ $t('record.cp.positionSize') }}</td>
                     <td>{{ info.size + ' ' + $t('common.pieces') }}</td>
                 </tr>
             </tbody>
         </table>
         <p @click="isConfirm" :class="{active: isShow}"><i></i> {{ $t('record.cp.noAccording') }}</p>
         <st-row justify="between" class="confirm-entrust-window-btn">
            <a @click="close">{{ $t('common.cancel') }}</a><a @click="unwind">{{ $t(`common.${info.way === 1 ? 'buy' : 'sell'}`) }}</a>
         </st-row>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'confirm-entrust-window',
    props: ['close', 'info'],
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
.confirm-entrust-window {
    padding: 0 20px;
    .confirm-entrust-window-message {
        margin-top: 24px;
       text-align: center;
       border-bottom: 1px solid rgba(151,176,214,.5);
       h4 {
           font-weight: 500;
           font-size: 20px;
           color: @bbxRed;
       }
       p {
           color: #4D5D8E;
           &:nth-child(2) {
               font-size: 16px;
           }
           &:last-child {
               margin: 14px 0 26px;
               font-size: 16px;
               color: #313A56;
            //    font-weight: 500;
               span {
                   color: @bbxRed;
               }
           }
       }
    }
    .confirm-entrust-window-content {
        padding: 0 30px;
        table {
            margin: 20px 0 16px;
            width: 100%;
            color: #4D5D8E;
            tr {
                height: 30px;
                line-height: 30px;
                td:last-child {
                   text-align: right;
               }
               span {
                   color: @bbxGreen;
               }
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
    .confirm-entrust-window-btn a{
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
