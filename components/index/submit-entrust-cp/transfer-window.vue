
<template>
  <div class="transfer-window">
    <div class="direction">
        <div :class="'numberOne ' + (isDirection ? 'left' : 'right')" :style="isDirection ? 'left: 0px; text-align: left;' : 'left: 217px; text-align: right;'">
           {{ $t('submitEntrust.cp.trade') }}
           <!-- <ul>
             <li :key="item.value" v-for="item in numberList" @click="changeNumber(item.value)">{{item.name}}</li>
           </ul> -->
        </div>
        <div class="arrow" @click="change"><i></i></div>
        <div :class="'numberTwo ' + (isDirection ? 'right' : 'left')" :style="isDirection ? 'left: 217px; text-align: right;' : 'left: 0px; text-align: left;'">
           {{ this.$t('common.contract') }}
        </div>
    </div>
    <st-row class="transfer-window-number" justify="between">
       <p>{{ $t('submitEntrust.cp.number') }}</p>
       <div>
         <div><input v-model="value" maxlength="16" @input="valueChange" type="text"></div>
         <st-row class="all" justify="between">
            <div class="hint-father hover">
             <p>{{ $t('submitEntrust.cp.can') }}{{ (isDirection ? getTradeAccount() : getTransferBalance()) | retainDecimals({decimal: com.valueUnit})}} {{ com.marginUnit }}</p>
               <div class="hint">
                   <p>{{ $t('submitEntrust.cp.canHover') }}</p>
               </div>
            </div>
           <p><a @click="all">{{ $t('submitEntrust.cp.all') }}</a></p>
         </st-row>
       </div>
    </st-row>
    <st-row justify="between" class="transfer-window-btn">
        <a @click="close">{{ $t('submitEntrust.cp.cancel') }}</a><a @click="submit">{{ $t('submitEntrust.cp.confirm') }}</a>
    </st-row>
  </div>
</template>

<script>
  import Utils from '../../../assets/js/util.js'
  export default {
    name: 'transfer-window',
    props: ['close'],
    data() {
      return {
        isDirection: true,
        value: ''
        // numberList: [{name: this.$t('common.contract'), value: 1}, {name: this.$t('common.coin'), value: 2}],
        // numberName: this.$t('common.contract')
      }
    },
    mounted() {
      this.$store.dispatch('getUser')
    },
    computed: {
      accounts() {
        return this.$store.state.auth.accounts
      },
      com() {
        return this.$store.state.com
      },
      tradeAccount() {
        return this.$store.state.auth.userInfo
      }
    },
    methods: {
      // 获取交易所用户余额
      getTradeAccount() {
        let account = 0
        if (this.tradeAccount && this.tradeAccount.user_assets) {
          this.tradeAccount.user_assets.forEach(element => {
            if (element.coin_code === this.com.marginUnit) {
              account = element.available_vol
            }
          })
        }
        return account
      },
      // 获取可以转账余额
      getTransferBalance() {
        let balance = Math.min(this.accounts.available_vol, (this.accounts.cash_vol - Math.max(0, this.accounts.freeze_vol - (this.accounts.realised_vol - this.accounts.earnings_vol)))) + this.com.positionLoss
        // return balance < 0 ? 0 : balance
        // return Math.max( 0, Math.min( this.accounts.available_vol, this.accounts.cash_vol) );
        return this.accounts.trans_out_balance < 0 ? 0 : this.accounts.trans_out_balance
      },
      // 转账数量改变事件
      valueChange() {
        this.value = Utils.retainDecimals(this.value, {integer: 8, decimal: this.com.valueUnit}) || ''
      },
      // 最多转账
      all() {
        this.value = Utils.retainDecimals(this.isDirection ? this.getTradeAccount() : this.getTransferBalance(), {integer: 8, decimal: this.com.valueUnit}) || ''
      },
      // 切换账户
      change() {
        this.isDirection = !this.isDirection
        this.value = ''
      },
      // 提交转账
      submit() {
        if (!this.value) {
          this.$alert(this.$t('submitEntrust.message.b2'))
          return false
        }
        if (this.isDirection) {
          if (Number(this.getTradeAccount()) < Number(this.value)) {
            this.$alert(this.$t('submitEntrust.message.b3'))
            return false
          }
        } else {
          if (Number(this.getTransferBalance()) < Number(this.value)) {
            this.$alert(this.$t('submitEntrust.message.b3'))
            return false
          }
        }
        this.swapsApi.transferFunds(this.com.marginUnit, this.value, this.isDirection ? 1 : 2)
        .then(res => {
          if (res.errno === 'OK') {
            // this.$store.dispatch('getUser')
            this.$alert('s', this.$t('submitEntrust.message.b4'))
            this.close()
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 @import "../../../assets/css/base";
.transfer-window {
    padding: 0 100px;
    .transfer-window-number {
      &>p {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #000;
      }
      &>div {
        input {
           padding: 0 10px;
           width: 340px;
           height: 50px;
           font-size: 16px;
           border: 1px solid #d0d7e1;
        }
        .all {
          margin-bottom: 14px;
          height: 46px;
          line-height: 46px;
          font-size: 16px;
          p {
            &:first-child {
              color: #4D5D8E;
            }
          }
        }
      }
    }
    .direction {
      position: relative;
      height: 30px;
      margin: 30px 0;
      padding: 0 183px;
      .numberOne, .numberTwo{
        position: absolute;
        top: 0px;
        width: 183px;
        cursor: pointer;
        font-size: 20px;
        color: #1f2636;
        &.right {
          animation: myarrowright 0.5s;
          -moz-animation:  myarrowright 0.5s;	/* Firefox */
          -webkit-animation:  myarrowright 0.5s;	/* Safari 和 Chrome */
          -o-animation:  myarrowright 0.5s;	/* Opera */
        }
        &.left {
          animation: myarrowleft 0.5s;
          -moz-animation: myarrowleft 0.5s;	/* Firefox */
          -webkit-animation: myarrowleft 0.5s;	/* Safari 和 Chrome */
          -o-animation: myarrowleft 0.5s;	/* Opera */
        }
      }
       .arrow {
          order: 1;
          cursor: pointer;
          i {
            display: block;
            width: 34px;
            height: 34px;
            background-image: url("../../../assets/img/icon-exchange_nor.png");
            &:hover {
              background-image: url("../../../assets/img/icon-exchange_sel.png");
            }
          }
        }
     // &>div {
       
        // &::after{
        //     content: '';
        //     position: absolute;
        //     margin-left: 8px;
        //     top: 50%;
        //     right: 2px;
        //     margin-top: -2px;
        //     display: block;
        //     border-width:6px 6px 0;
        //     border-style:solid;
        //     border-color:#1f2636 transparent transparent;/*灰 透明 透明 */
        // }
        // &:first-child {
        //   position: relative;
        //   padding-right: 20px;
        //   ul {
        //     position: absolute;
        //     padding: 10px 0;
        //     width: 100%;
        //     display: none;
        //     background-color: @bbxClick;
        //     li {
        //       height: 30px;
        //       line-height: 30px;
        //       font-size: 16px;
        //       text-align: center;
        //     }
        //   }
        //    &:hover {
        //      ul {
        //        display: block
        //      }
        //    }
        // }
     // }
    }
    .transfer-window-btn a{
      width: 190px;
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

@keyframes myarrowright
{
  0% {left: 0px; opacity: 1;}
  50% { opacity: 0.2; }
  100% {left: 217px; opacity: 1;}
}
@keyframes myarrowleft
{
  0% {left: 217px; opacity: 1;}
  50% { opacity: 0.2; }
  100% {left: 0px; opacity: 1;}
}

@-moz-keyframes myarrowright
{
  0% {left: 0px; opacity: 1;}
  50% { opacity: 0.2; }
  100% {left: 217px; opacity: 1;}
}
@-moz-keyframes myarrowleft
{
  0% {left: 217px; opacity: 1;}
  50% { opacity: 0.2; }
  100% {left: 0px; opacity: 1;}
}

@-webkit-keyframes myarrowright
{
  0% {left: 0px; opacity: 1;}
  50% { opacity: 0.2; }
  100% {left: 217px; opacity: 1;}
}
@-webkit-keyframes myarrowleft
{
  0% {left: 217px; opacity: 1;}
  50% { opacity: 0.2; }
  100% {left: 0px; opacity: 1;}
}

@-o-keyframes myarrowright
{
  0% {left: 0px; opacity: 1;}
  50% { opacity: 0.2; }
  100% {left: 217px; opacity: 1;}
}
@-o-keyframes myarrowleft
{
  0% {left: 217px; opacity: 1;}
  50% { opacity: 0.2; }
  100% {left: 0px; opacity: 1;}
}
</style>
