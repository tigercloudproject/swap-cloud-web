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
      <div class="bonus-index-content-center" >
        <st-row justify="between" align="center"><span>{{ $t('bonus.totalPeople', {num: child_count}) }}</span><a @click="moveCopyFn" class="btn">{{ $t('bonus.copy') }}</a></st-row>
        <st-row justify="between" align="center"><span>{{ $t('bonus.cumulative', {coin: 'USDT'}) }}{{ vol + ' USDT' }}</span><a @click="go(1, `${apiConfig.mainDomain}/assets/deposit_withdrawal/deposit?lang=${locale}`)">{{ $t('bonus.recharge') }}</a></st-row>
      </div>
      <div class="bonus-index-content-bottom">
         <!-- <h6>{{ $t('bonus.stayGold') }}</h6> -->
         <st-row justify="between">
           <div class="info">
              <div><img src="../../../assets/img/m/bonus/icon-1-H5@2x.png" alt=""></div>
              <p>{{ $t('bonus.openTrade') }}</p>
              <p>{{ $t('bonus.send') }}{{ '10USDT' }}</p>
              <p><a :class="{noClick: openAccountReward}" @click="openAccountRewardFn">{{ openAccountReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
           </div>
            <div class="info hot">
              <div><img src="../../../assets/img/m/bonus/icon-2-H5@2x.png" alt=""></div>
              <p>{{ $t('bonus.first') }}</p>
              <p>{{ $t('bonus.send') }}{{ '100USDT' }}</p>
               <p><a :class="{noClick: true}" >{{ $t('bonus.end') }}</a></p>
              <!-- <p><a :class="{noClick: depositReward}" @click="depositRewardFn">{{ depositReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p> -->
           </div>
          <!-- <div class="info">
              <div><img src="../../../assets/img/m/bonus/icon-3-H5@2x.png" alt=""></div>
              <p>{{ $t('bonus.palce') }}</p>
              <p>{{ $t('bonus.send') }}{{ '20USDT' }}</p>
              <p><a :class="{noClick: true}" href="javascirpt:void(0)">{{ $t('bonus.noOpen') }}</a></p>
           </div> -->
         </st-row>
      </div>
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
     <popup :title="info.title"  :width="windowWidth" :callback="messageClose" v-if="isMessage">
            <web-message-window @go="go" :info="info" :close="messageClose"></web-message-window>
       </popup>
          <popup :title="$t('bonus.smTitle')"  :width="windowWidth" :callback="smClose" v-if="isSm">
            <sm-window :close="smClose"></sm-window>
       </popup>
   </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import ApiConfig from '../../../config/api.config'
import cookie from '../../../assets/js/cookie.js'
import WebMessageWindow from '../../../components/bonus/web-message-window'
import SmWindow from '../../../components/bonus/sm-window'

export default {
  name: 'bonus-index',
  layout: 'm',
  components: {
    WebMessageWindow,
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
      isSm: false,
      width: 440,
      isAndroid: false,
      isiOS: false
    }
  },
  computed: {
    locale() {
      return this.$store.state.auth.locale
    },
    windowWidth() {
      return String(this.$store.state.m.windowWidth)
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
          hrefTitle: this.$t('bonus.validation.openGo'),
          type: 2
        },
        CUMULATION_DEPOSIT_VOL: {
          title: this.$t('bonus.validation.addTitle'),
          message: this.$t('bonus.validation.addMessge'),
          href: '',
          hrefTitle: this.$t('bonus.validation.addGo'),
          type: 1
        },
        BIND_PHONE: {
          title: this.$t('bonus.validation.phoneTitle'),
          message: this.$t('bonus.validation.phoneMessage'),
          href: '',
          hrefTitle: this.$t('bonus.validation.phoneGo'),
          type: 3
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
    moveCopyFn() {
      let obj = {
        cyInfo: `${this.apiConfig.mainDomain}/register?inviter=${this.$route.query.uid}&lang=${this.locale}`
      }
      if (this.isAndroid) {
        window.bridge.Copy2Clipboard(JSON.stringify(obj))
      } else if (this.isiOS) {
        window.webkit.messageHandlers.Copy2Clipboard.postMessage(JSON.stringify(obj))
      } else {
        this.copyFn()
      }
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
      }).catch(e => {
        this.go(4)
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
          // this.$alert('s', this.$t('bonus.receiveSuccess'))
          let obj = {
            content: this.$t('bonus.receiveSuccess')
          }
          if (this.isAndroid) {
            window.bridge.toast(JSON.stringify(obj))
          } else if (this.isiOS) {
            window.webkit.messageHandlers.toast.postMessage(JSON.stringify(obj))
          } else {
            this.$alert('s', this.$t('bonus.receiveSuccess'))
          }
        }
      })
    },
    // 获取累计邀请人数
    getNum() {
      this.swapsApi.rebates().then(res => {
        this.child_count = res.data.rebate.child_count
      })
    },
    setUserCookie() {
      // cookie.setCookie('ssid', this.$route.query.ssid, 1, '/',this.apiConfig.mainDomain)
      let lang = this.$route.query.lang
      cookie.setCookie('uid', this.$route.query.uid, 1, '/', this.apiConfig.domain)
      cookie.setCookie('lang', lang, 1, '/', this.apiConfig.domain)
      cookie.setCookie('token', this.$route.query.token, 1, '/', this.apiConfig.domain)
      cookie.setCookie('version', this.$route.query.version, 1, '/', this.apiConfig.domain)
      cookie.setCookie('options', this.$route.query.options, 1, '/', this.apiConfig.domain)
      this.$store.commit('auth/SET_LOCALE', {
        locale: lang
      })
      this._i18n.locale = lang
      this.$store.commit('auth/SET_TOKEN', {
        token: this.$route.query.token
      })
    },
    isAndroidOrIOS() {
      var u = navigator.userAgent
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    },
    go(type, href) {
      let obj = {
        to: type,
        coin_code: 'USDT'
      }
      if (this.isAndroid) {
        window.bridge.jumpTo(JSON.stringify(obj))
      } else if (this.isiOS) {
        window.webkit.messageHandlers.jumpTo.postMessage(JSON.stringify(obj))
      } else {
        window.location.href = href
      }
    }
    // depositReward(type) {
    //   let data = {
    //     url: config.swapsUrl + '/ifcontract/activity/openAccountReward?action=' + type,
    //     method: 'GET',
    //     body: '',
    //     succeedCallback: '',
    //     failCallBack: ''
    //   }
    //   if (this.isAndroid) {
    //     window.bridge.HttpRequest(JSON.stringify(data))
    //   } else if (this.isiOS) {
    //     window.webkit.messageHandlers.HttpRequest.postMessage(JSON.stringify(data))
    //   }
    // }
  },
  mounted() {
    if (this.$route.query.token) {
      this.isAndroidOrIOS()
      this.setUserCookie()
    }
    if (this.$store.state.auth.token) {
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
  //  height: 1080px;
  //  margin-bottom: 50px;
   background: url('../../../assets/img/m/bonus/bg-1@2x.png') no-repeat;
   background-size: 100%;
   background-color: #1f2636;
   .bonus-index-title {
     padding-top: .4rem;
     h1,p {
       text-align: center;
     }
     h1 {
       padding-top: .3rem;
       color: #e6b991;
       font-size: .50rem;
       font-weight: 400;
       text-shadow: 0 .03rem .04rem #232732;
     }
     p {
       color: #fffdf9;
       font-size: .26rem;
       padding: .1rem 0 .2rem;
     }
   }
   .bonus-index-content {
     margin: .5rem auto 0;
     width: 6.9rem;
     background-color: #3d455b;
     .bonus-index-content-top {
       padding: .3rem 0 .2rem;
       text-align: center;
       h3 {
         line-height: .58rem;
         font-size: .34rem;
         color: #fffdf9;
         font-size: 400;
         span {
           color: #e6b991;
         }
       }
       p {
         line-height: .38rem;
         font-size: .22rem;
         color: #fffdf9;
       }
     }
     .bonus-index-content-center {
       margin: 0 .3rem;
       padding: .34rem 0;
      //  height: 90px;
       border-top: 1px solid #373f53;
       border-bottom: 1px solid #373f53;
       font-size: .28rem;
       div:last-child {
         margin-top: .34rem;
       }
       span {
         color: #fffdf9;
       }
       a {
         margin-left: .24rem;
         display: inline-block;
         height: .48rem;
         width: 1.8rem;
         font-size: .26rem;
         line-height: .48rem;
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
      //  h6 {
      //    margin-left: 25px;
      //    height: 80px;
      //    line-height: 80px;
      //    font-size: 16px;
      //    color: #fffdf9;
      //  }
      &>div {
        flex-wrap: wrap
      }
      padding: .3rem;
       .info {
          // padding-top: .1rem;
          width: 3rem;
          height: 3rem;
          background: #32374a;
          text-align: center;
          // &:last-child {
          //   margin-top: .3rem;
          // }
          div {
            margin: .24rem;
            img {
              width: 1rem;
            }
          }
          p {
            color: #fffdf9;
            font-size: .26rem;
            a {
              margin-top: .1rem;
              display: inline-block;
              height: .48rem;
              width: 1.5rem;
              line-height: .48rem;
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
            background-image: url('../../../assets/img/m/bonus/128772877044550991.png');
            background-repeat:  no-repeat;
            background-position: -6px -6px;
            background-size: 1rem 1rem;
          }
       }
     }
   }
   .bonus-index-message {
       margin: 0 .48rem;
       padding: .24rem .1rem;
       p {
        //  height: 24px;
         margin-bottom: .2rem;
         line-height: .36rem;
         color: #8fa1cb;
         font-size: .26rem;
         word-wrap: break-word;
         word-break: break-all;
        //  overflow: hidden;
         &:first-child {
           margin-bottom: .12rem;
         }
       }
     }
}
</style>
