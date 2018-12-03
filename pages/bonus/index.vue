<template>
   <div class="bonus-index">
    <div class="bonus-index-title">
          <h1>{{ $t('bonus.title') }}</h1>
          <p>{{ $t('bonus.message') }}</p>
    </div>
    <div class="bonus-index-content">
      <div class="bonus-index-content-top">
        <h3>{{ $t('bonus.myTrade') }}<span>{{ `${total}.00 USDT` }}</span></h3>
        <p>{{ $t('bonus.dataTime') }}</p>
      </div>
      <st-row class="bonus-index-content-center" justify="between" align="center">
        <div><span>{{ $t('bonus.totalPeople', {num: child_count}) }}</span><a @click="copyFn" class="btn">{{ $t('bonus.copy') }}</a></div>
        <div><span>{{ $t('bonus.cumulative', {coin: 'USDT'}) }}{{ vol + ' USDT' }}</span><a :href="`${apiConfig.mainDomain}/assets/deposit_withdrawal/deposit?lang=${locale}`">{{ $t('bonus.recharge') }}</a></div>
      </st-row>
      <div class="bonus-index-content-bottom">
         <h6>{{ $t('bonus.stayGold') }}</h6>
         <st-row justify="around">
           <div class="info">
              <div><img src="../../assets/img/bonus/icon-1.png" alt=""></div>
              <p>{{ $t('bonus.openTrade') }}</p>
              <p>{{ $t('bonus.send') }}{{ '10USDT' }}</p>
              <p><a :class="{noClick: openAccountReward}" @click="openAccountRewardFn">{{ openAccountReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
           </div>
            <div class="info hot">
              <div><img src="../../assets/img/bonus/icon-2.png" alt=""></div>
              <p>{{ $t('bonus.first') }}</p>
              <p>{{ $t('bonus.send') }}{{ '100USDT' }}</p>
              <!-- @click="depositRewardFn" -->
              <!-- depositReward ? $t('bonus.end') : $t('bonus.receive') -->
              <p><a :class="{noClick: true}" >{{ $t('bonus.end') }}</a></p>
           </div>
          <!-- <div class="info">
              <div><img src="../../assets/img/bonus/icon-3.png" alt=""></div>
              <p>{{ $t('bonus.palce') }}</p>
              <p>{{ $t('bonus.send') }}{{ '20USDT' }}</p>
              <p><a :class="{noClick: true}" href="javascirpt:void(0)">{{ $t('bonus.noOpen') }}</a></p>
           </div> -->
         </st-row>
      </div>
       <div class="bonus-index-message">
       <p>{{ $t('bonus.activeOne') }}</p>
       <p>{{ $t('bonus.activeTwo') }}</p>
       <p>{{ $t('bonus.activeThree') }}</p>
       <p>{{ $t('bonus.activeFore') }}</p>
       <p>{{ $t('bonus.activeFive') }}</p>
       <p>{{ $t('bonus.activeSix') }}</p>
       <!-- <p>{{ $t('bonus.activeSeven') }}</p> -->
       <p>{{ $t('bonus.activeEight') }}</p>
    </div>
    </div>
     <popup :title="info.title"  width="440" :callback="messageClose" v-if="isMessage">
            <message-window :info="info" :close="messageClose"></message-window>
       </popup>
          <popup :title="locale === 'zh-cn' ? $t('bonus.smTitle') : 'Join BBX Telegram Group to Get Bonus！'"  width="440" :callback="smClose" v-if="isSm">
            <sm-window :close="smClose"></sm-window>
       </popup>
   </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import ApiConfig from '../../config/api.config'
import cookie from '../../assets/js/cookie.js'
import MessageWindow from '../../components/bonus/message-window'
import SmWindow from '../../components/bonus/sm-window'
export default {
  name: 'bonus-index',
  components: {
    MessageWindow,
    SmWindow
  },
  data() {
    return {
      total: 0,
      apiConfig: ApiConfig,
      copy: null,
      // 检查合约账户开通奖励是否被领取
      openAccountReward: true,
      // 检查合约充值奖励是否被领取
      depositReward: true,
      // 邀请人数
      child_count: 0,
      isMessage: false,
      info: null,
      // 领取赠金步骤
      openConditions: null,
      // 领取首次充值步骤
      depositConditions: null,
      vol: 0,
      validation: null,
      isSm: false
    }
  },
  computed: {
    locale() {
      return this.$store.state.auth.locale
    }
  },
  watch: {
    locale() {
      this.getValidation()
    }
  },
  methods: {
    getValidation() {
      this.validation = {
        KYC_AUTH: {
          title: this.$t('bonus.validation.kycTitle'),
          message: this.$t('bonus.validation.kycMessge'),
          href: '',
          hrefTitle: this.$t('bonus.validation.kycGo')
        },
        OPEN_CONTRACT_ACCOUNT: {
          title: this.$t('bonus.validation.openTitle'),
          message: this.$t('bonus.validation.openMessge'),
          href: ApiConfig.swapsDomain + '?id=1',
          hrefTitle: this.$t('bonus.validation.openGo')
        },
        CUMULATION_DEPOSIT_VOL: {
          title: this.$t('bonus.validation.addTitle'),
          message: this.$t('bonus.validation.addMessge'),
          href: '',
          hrefTitle: this.$t('bonus.validation.addGo')
        },
        BIND_PHONE: {
          title: this.$t('bonus.validation.phoneTitle'),
          message: this.$t('bonus.validation.phoneMessage'),
          href: '',
          hrefTitle: this.$t('bonus.validation.phoneGo')
        }
      }
    },
    smClose() {
      this.isSm = false
    },
    messageClose() {
      this.isMessage = false
    },
    copyFn() {
      let uid = cookie.getCookie('uid')
      let href = `${this.apiConfig.mainDomain}/register?inviter=${uid}&lang=${this.locale}`
      this.copy = new ClipboardJS('.btn', {
        text: function () {
          return href
        }
      })
      this.$alert('s', this.$t('bonus.copyMessage'))
    },
    getTotal() {
      let total = 0
      if (this.openAccountReward) {
        total += 10
      }
      if (this.depositReward) {
        total += 100
      }
      return total
    },
    getDate() {
      Promise.all([this.swapsApi.openAccountReward('check'), this.swapsApi.depositReward('check')])
      .then(res => {
        this.openAccountReward = res[0].data.participated
        this.openConditions = res[0].data.conditions
        this.depositReward = res[1].data.participated
        this.depositConditions = res[1].data.conditions
        this.vol = res[1].data.vol
        this.total = this.getTotal()
      })
    },
    openAccountRewardFn() {
      if (!this.openAccountReward) {
        for (let item in this.openConditions) {
          let obj = this.openConditions[item]
          if (!obj.status) {
            this.info = this.validation[obj.key]
            this.isMessage = true
            return false
          }
        }
      } else {
        return false
      }
      this.isSm = true
      // this.swapsApi.openAccountReward('receive')
      // .then(res => {
      //   if (res.message === 'Success') {
      //     this.openAccountReward = true
      //     this.total = this.getTotal()
      //     this.$alert('s', this.$t('bonus.receiveSuccess'))
      //   }
      // })
    },
    depositRewardFn() {
      if (!this.depositReward) {
        for (let item in this.depositConditions) {
          let obj = this.depositConditions[item]
          if (!obj.status) {
            this.info = this.validation[obj.key]
            this.isMessage = true
            return false
          }
        }
      } else {
        return false
      }
      this.swapsApi.depositReward('receive')
      .then(res => {
        if (res.message === 'Success') {
          this.depositReward = true
          this.total = this.getTotal()
          this.$alert('s', this.$t('bonus.receiveSuccess'))
        }
      })
    },
    // 获取累计邀请人数
    getNum() {
      this.swapsApi.rebates().then(res => {
        this.child_count = res.data.rebate.child_count
      })
    }
  },
  mounted() {
    if (this.$store.state.auth.token) {
      if (document.documentElement.clientWidth <= 700) {
        this.$router.push({path: '/m/bonus'})
      }
      this.getValidation()
      // this.$store.dispatch('getUser')
      this.getDate()
      this.getNum()
      this.validation.BIND_PHONE.href = ApiConfig.mainDomain + '/usercenter/account_information/bind_phone?lang=' + this.locale
      this.validation.KYC_AUTH.href = ApiConfig.mainDomain + '/usercenter/kyc?lang=' + this.locale
      this.validation.CUMULATION_DEPOSIT_VOL.href = `${ApiConfig.mainDomain}/assets/deposit_withdrawal/deposit?lang=${this.locale}`
    } else {
      window.location.href = `${this.apiConfig.mainDomain}/login?path=${escape(window.location.href)}&lang=${this.locale}`
    }
  },
  created() {
  }
}
</script>
<style lang="less" scoped>
.bonus-index {
   height: 1080px;
   margin-bottom: 50px;
   background: url('/static/img/bg-1.jpg') no-repeat;
   background-size: 100%;
   background-color: #1f2636;
   .bonus-index-title {
     padding-top: 20px;
     h1,p {
       text-align: center;
     }
     h1 {
       padding-top: 30px;
       color: #e6b991;
       font-size: 46px;
       font-weight: 400;
       text-shadow: 0px 3px 4px #232732;
     }
     p {
       color: #fffdf9;
       font-size: 24px;
       padding-bottom: 20px;
     }
   }
   .bonus-index-content {
     margin: 20px auto 0;
     width: 1200px;
     background-color: #3d455b;
     .bonus-index-content-top {
       padding: 30px 0 20px;
       text-align: center;
       h3 {
         line-height: 58px;
         font-size: 32px;
         color: #fffdf9;
         span {
           color: #e6b991;
         }
       }
       p {
         line-height: 38px;
         font-size: 16px;
         color: #fffdf9;
       }
     }
     .bonus-index-content-center {
       margin: 0 25px;
       height: 90px;
       border-top: 1px solid #373f53;
       border-bottom: 1px solid #373f53;
       font-size: 18px;
       span {
         color: #fffdf9;
       }
       a {
         margin-left: 24px;
         display: inline-block;
         height: 35px;
         width: 140px;
         font-size: 16px;
         line-height: 35px;
         color: #2e3345;
         background: #e6b991;
         text-align: center;
         font-weight: 400;
         &:hover {
            background: #E8BF9A;
          }
       }
     }
     .bonus-index-content-bottom {
       h6 {
         margin-left: 25px;
         height: 80px;
         line-height: 80px;
         font-size: 16px;
         color: #fffdf9;
       }
       .info {
          padding-top: 10px;
          width: 300px;
          height: 269px;
          background: #32374a;
          text-align: center;
          div {
            margin: 24px;
          }
          p {
            color: #fffdf9;
            font-size: 16px;
            a {
              margin-top: 10px;
              display: inline-block;
              height: 35px;
              width: 120px;
              line-height: 35px;
              color: #2e3345;
              background: #e6b991;
              text-align: center;
              font-weight: 400;
              &:hover {
                background: #E8BF9A;
              }
              &.noClick {
                background: #a5acc0;
              }
            }
          }
          &.hot {
            background-image: url('../../assets/img/bonus/hot.png');
            background-repeat:  no-repeat;
            background-position: -6px -6px;
          }
       }
     }
     .bonus-index-message {
       margin-left: 48px;
       padding: 24px 10px;
       p {
        //  height: 24px;
         line-height: 24px;
         color: #fffdf9;
         font-size: 12px;
         word-wrap: break-word;
         word-break: break-all;
        //  overflow: hidden;
         &:first-child {
           margin-bottom: 12px;
         }
       }
     }
   }
}
</style>
