<template>
   <div class="index">
             <main-nav @submitEntrustInit="submitEntrustInit"></main-nav>
             <div :class="{isPlan, 'first-grid': isGrid,'first-position': !isGrid}">
                <submit-entrust ref="submitEntrust" @move="move" class="submit"></submit-entrust>
                <entrust-list  class="entrust"></entrust-list>
                <K-line class="k-line"></K-line>
                <news-deal class="news-deal"></news-deal>
                <div class="news-risk">
                    <risk></risk>
                    <information></information>
                </div>
                <record-list class="record-list"></record-list>
                <depth class="map"></depth>
             </div>
            <popup :title="$t(`index.open.openTrade`)"  width="520" :callback="closeOpenAccount" v-if="showOpenAccount">
                <open-account-window  :close="closeOpenAccount"></open-account-window>
            </popup>
    </div>
</template>
<script>
import SubmitEntrust from '../components/index/submit-entrust'
import EntrustList from '../components/index/entrust-list'
import NewsDeal from '../components/index/news-deal'
import KLine from '../components/index/k-line'
import MainNav from '../components/index/main-nav'
import Information from '../components/index/information'
import Depth from '../components/index/depth'
import RecordList from '../components/index/record-list'
import Risk from '../components/index/risk'
import Utis from '../assets/js/util.js'
// import cookie from '../assets/js/cookie'
import Popup from '../components/bx-ui/popup'
import OpenAccountWindow from '../components/index/open-account-window'
export default {
  name: 'index',
  head() {
    return {
      title: (Utis.addZero(this.ticker.last_price, this.com.priceUnit) || '----') + '  ' + this.productInfo.contract.display_name + '|BBX-Swap'
    }
  },
  components: {
    MainNav,
    SubmitEntrust,
    EntrustList,
    KLine,
    NewsDeal,
    Information,
    RecordList,
    Depth,
    Risk,
    Popup,
    OpenAccountWindow
  },
  data() {
    return {
      // 判断是否支持grid布局
      isGrid: true,
      isFixed: false,
      top: 0,
      left: 0,
      height: 0,
      doE: null,
      doB: null,
      fixedRef: null,
      informationRef: null,
      timeOut: null,
      scrollShow: false
    }
  },
  computed: {
    showOpenAccount() {
      return this.$store.state.com.showOpenAccount
    },
    com() {
      return this.$store.state.com
    },
    ticker() {
      return this.$store.state.market.ticker
    },
    locale() {
      return this.$store.state.auth.locale
    },
    token() {
      return this.$store.state.auth.token
    },
    productInfo() {
      return this.$store.state.market.productInfo
    },
    isPlan() {
      return this.$store.state.com.isPlan
    }
  },
  methods: {
    closeOpenAccount() {
      this.$store.commit('com/SET_COMMON', {
        showOpenAccount: false
      })
    },
    changeLeftHeight() {
      this.doE = document.documentElement
      this.doB = document.body
      this.fixedRef = this.$refs.fixedRef
      this.informationRef = this.$refs.informationRef.$el
      window.onresize = () => { this.move() }
      document.onscroll = () => { this.move() }
    },
    move() {
      var scrolltop = this.doE.scrollTop || this.doB.scrollTop // 卷曲高度
      let scrollleft = this.doE.scrollLeft || this.doB.scrollLeft // 卷曲左侧距离
      var seeHeight = this.doE.clientHeight || this.doB.clientHeight // 可是区域高度
      var sunHeight = this.doE.scrollHeight || this.doB.scrollHeight // 总高度
      let seeWidth = this.doE.clientWidth || this.doB.clientWidth
      let y = 0
      this.isFixed = scrolltop > 150
      if (this.isFixed && (sunHeight - scrolltop - seeHeight < 380)) {
        y = -Math.abs(seeHeight - (this.fixedRef.offsetHeight + (380 - (sunHeight - scrolltop - seeHeight)))) - 15
        this.informationRef.style.height = this.height - (380 - (sunHeight - scrolltop - seeHeight)) + 'px'
        this.top = y
        this.left = scrollleft
      } else {
        if (this.isFixed) {
          y = seeHeight - this.fixedRef.offsetHeight
          this.top = y
          this.left = scrollleft
        }
        this.height = this.informationRef.offsetHeight + (seeHeight - this.fixedRef.offsetHeight)
        this.informationRef.style.height = this.height + 'px'
      }
      if (seeWidth > 1490) {
        this.informationRef.style.height = 260 + 'px'
      }
      this.scrollShow = this.doE.scrollWidth > 1490
      // var bl = (doE.scrollWidth || doB.scrollWidth) - (doE.clientWidth || doB.clientWidth) > 0  // 存在横向滚动条时页面可视区域减少10px
      // if (this.isFixed) { // 150 固定元素距离顶部的距离 // 380 底部的高度 // 90 在底部没有上来之前最大的定位
      //   if (sunHeight - scrolltop - seeHeight < 380) { // 判断是否快要到底部
      //     y = -Math.abs(seeHeight - (this.$refs.fixedRef.offsetHeight + (380 - (sunHeight - scrolltop - seeHeight)))) - 15
      //     this.$refs.informationRef.$el.style.height = this.height - (380 - (sunHeight - scrolltop - seeHeight)) + 'px'
      //   } else {
      //     y = seeHeight - this.$refs.fixedRef.offsetHeight
      //     this.height = this.$refs.informationRef.$el.offsetHeight + (seeHeight - this.$refs.fixedRef.offsetHeight)
      //     this.$refs.informationRef.$el.style.height = this.height + 'px'
      //   }
      //   this.top = y
      //   this.left = scrollleft
      // } else {
      //   this.height = this.$refs.informationRef.$el.offsetHeight + (seeHeight - this.$refs.fixedRef.offsetHeight)
      //   this.$refs.informationRef.$el.style.height = this.height + 'px'
      // }
    },
    // 获取仓位和委托记录
    // getCabinOrHistory() {
    //   this.swapsApi.getUserPositions(this.productInfo.contract.contract_id, 3).then(res => {
    //     this.$store.commit('market/SET_CABINLIST', {
    //       data: res.data.positions
    //     })
    //   })
    //   this.swapsApi.getUserOrders(this.productInfo.contract.contract_id, 3).then(res => {
    //     this.$store.commit('market/SET_CURRYENTRUSTLIST', {
    //       data: res.data.orders
    //     })
    //   })
    // },
    // 合约切换时清空输入框
    submitEntrustInit() {
      this.$refs.submitEntrust.changeInit()
    }
  },
  mounted() {
    // this.scrollShow = document.documentElement.scrollWidth > 1490
    // if (!this.token) {
    //   let token = cookie.getCookie('tocken')
    //   if (token) {
    //     this.$store.commit('auth/SET_TOKEN', {
    //       token: token
    //     })
    //   }
    // }
    this.isGrid = Utis.cssProperty('grid')
    this.$store.dispatch('getMarketDate')
    this.$store.dispatch('getUserDate')
    this.$store.dispatch('userWebSocket')
    document.addEventListener('visibilitychange', () => {
      if (document.hidden === true) {
        this.$store.dispatch('clearDateTime')
      } else {
        this.$store.dispatch('getMarketDate')
        this.$store.dispatch('getUserDate')
      }
    })
    // this.changeLeftHeight()
  },
  created() {
    // this.getDate()
  },
  beforeDestroy() {
    // clearTimeout(this.timeOut)
    this.$store.dispatch('clearDateTime')
  }
}
</script>
<style lang="less" scoped>
@import "../assets/css/grid.css";
@import "../assets/css/position.less";
.index {
  // .index-centent {
  //   padding: 10px 0;
  // }
  // .index-centent-top, .index-centent-left-submit-entrust {
  //   margin-bottom: 10px;
  // }
  // .index-centent-rigth {
  //   flex: 1;
  // }
  // .screen-show {
  //   display: none;
  // }
  //  @media screen and (max-width: 1500px) {
  //    .screen-show {
  //      margin-top: 10px;
  //      display: flex;
  //      .screen-show-height {
  //         height: 480px;
  //      }
  //    }
  //   //  .screen-no-show {
  //   //    display: none;
  //   //  }
  //    .index-centent-left {
  //      width: 300px;
  //      .fixed {
  //         position: fixed;
  //         z-index: 1;
  //         left: 0px;
  //         top: 0px;
  //       }
  //    }
  //  }
}
</style>
