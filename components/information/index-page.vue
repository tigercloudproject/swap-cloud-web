<template>
    <div class='insure-page'>
       <h4>{{info.name}}{{ $t('informationPage.index.index') }}</h4>
       <div class="insure-page-message">
           <h6>{{info.name}}{{ $t('informationPage.index.detail') }}</h6>
           <!-- <p>{{info[locale === 'zh-cn' ? 'brief_zh' : 'brief_en']}}</p> -->
           <st-row class="index-detail">
             <div><span>{{ $t('informationPage.index.source') }}</span><span>{{ $t('informationPage.index.weight') }}</span></div>
             <div :key="item.market_name" v-for="item in memberList"><span>{{item.market_name}}</span><span>{{item.weight}}</span></div>
           </st-row>
       </div>
          <div class="insure-page-message">
           <h6>{{ $t('informationPage.index.indexContract') }}</h6>
           <p>
               <span :key="item.contract_id" v-for="item in info.contract">{{ item[locale === 'zh-cn' ? 'display_name' : 'display_name_en'] }} &nbsp;</span>
           </p>
       </div>
        <div class="insure-page-message">
           <h6>{{info.name}}{{ $t('informationPage.index.indexValue') }}</h6>
           <st-row class="nav">
             <a @click="changeLineType(true)" :class="{active: lineType}">{{ $t('informationPage.index.indexPrice') }}</a>
             <a @click="changeLineType(false)" :class="{active: !lineType}">{{ $t('informationPage.index.canPrice') }}</a>
           </st-row>
           <div class="kline">
               <div id="tv_chart_container"></div>
           </div>
       </div>
    </div>
</template>
<script>
import DataFeeds from '../../assets/js/datafeed'
export default {
  name: 'information-index',
  data() {
    return {
      info: {},
      clear: null,
      memberList: [],
      lineType: true
    }
  },
  computed: {
    locale() {
      return this.$store.state.auth.locale
    },
    list() {
      return this.$store.state.market.indexs
    },
    productInfo() {
      return this.$store.state.market.productInfo
    },
    productList() {
      return this.$store.state.market.productList
    }
  },
  watch: {
    list() {
      this.getInfo()
      this.init()
    },
    '$i18n.locale'() {
      // this.widget.setLanguage(this.changeLocale())
      try {
        this.widget.remove()
      } catch (error) {
        console.log(error)
      }
      this.init()
      // console.log(this.widget)
    }
  },
  methods: {
    getInfo() {
      this.info = this.list.filter(item => {
        return item.index_id === Number(this.$route.params.id)
      })[0] || {}
      if (this.info.member) {
        let member = this.info.member.filter(item => item.coin_code === this.info.base_coin)[0]
        this.memberList = member ? member.market : []
      }
    },
    changeLineType(bl) {
      if (bl === this.lineType) return
      this.lineType = bl
      this.init()
    },
    init() {
      let getChartproperties = JSON.parse(window.localStorage.getItem('tradingview.chartproperties'))
      if (getChartproperties && getChartproperties.paneProperties && getChartproperties.paneProperties.background !== '#ffffff') {
        getChartproperties.paneProperties.background = '#ffffff'
        window.localStorage.setItem('tradingview.chartproperties', JSON.stringify(getChartproperties))
      }
      let coinPair = this.$route.params.id || this.list[0].index_id
      if (!this.lineType) {
        coinPair = this.productList.filter(item => {
          return item.contract.index_id === Number(coinPair)
        })[0].contract.contract_id
      }
      let lang = this.locale
      let langObj = {
        'zh-cn': 'zh',
        'zh-tw': 'en',
        'en-us': 'en'
      }
      let kLineType = [
        {
          id: 0,
          name: '0',
          buttonName: this.$t('common.timeSharing'),
          period: '5min',
          step: 5 * 60 * 1000,
          bit: 5,
          type: 'M',
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false, // 是否是第一次请求
          isIncremental: true // 是否是第一次增量
        },
        {
          id: 0,
          name: '5',
          buttonName: '5' + this.$t('common.minute'),
          period: '5min',
          step: 5 * 60 * 1000,
          bit: 5,
          type: 'M',
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false,
          isIncremental: true // 是否是第一次增量
        },
        {
          id: 1,
          name: '15',
          buttonName: '15' + this.$t('common.minute'),
          period: '15min',
          step: 15 * 60 * 1000,
          type: 'M',
          bit: 15,
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false,
          isIncremental: true // 是否是第一次增量
        },
        {
          id: 2,
          name: '30',
          buttonName: '30' + this.$t('common.minute'),
          period: '30min',
          step: 30 * 60 * 1000,
          type: 'M',
          bit: 30,
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false,
          isIncremental: true // 是否是第一次增量
        },
        {
          id: 3,
          name: '60',
          buttonName: '1' + this.$t('common.hour'),
          period: '1hour',
          step: 60 * 60 * 1000,
          type: 'H',
          bit: 1,
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false,
          isIncremental: true // 是否是第一次增量
        },
        {
          id: 4,
          name: '120',
          buttonName: '2' + this.$t('common.hour'),
          period: '2hour',
          step: 2 * 60 * 60 * 1000,
          type: 'H',
          bit: 2,
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false,
          isIncremental: true // 是否是第一次增量
        },
        {
          id: 5,
          name: '240',
          buttonName: '4' + this.$t('common.hour'),
          period: '4hour',
          step: 4 * 30 * 60 * 1000,
          type: 'H',
          bit: 4,
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false,
          isIncremental: true // 是否是第一次增量
        },
        {
          id: 6,
          name: '360',
          buttonName: '6' + this.$t('common.hour'),
          period: '6hour',
          step: 6 * 30 * 60 * 1000,
          type: 'H',
          bit: 6,
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false,
          isIncremental: true // 是否是第一次增量
        },
        {
          id: 7,
          name: '720',
          buttonName: '12' + this.$t('common.hour'),
          period: '12hour',
          step: 12 * 60 * 60 * 1000,
          type: 'H',
          bit: 12,
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false,
          isIncremental: true // 是否是第一次增量
        },
        {
          id: 8,
          name: 'D',
          buttonName: '1' + this.$t('common.day'),
          period: '1day',
          step: 1440 * 60 * 1000,
          type: 'D',
          bit: 1,
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false,
          isIncremental: true // 是否是第一次增量
        },
        {
          id: 9,
          name: 'W',
          buttonName: '1' + this.$t('common.week'),
          period: '1week',
          step: 7 * 1440 * 60 * 1000,
          type: 'D',
          bit: 7,
          firstTime: '',
          lastTime: '',
          cache: [],
          noData: false,
          isIncremental: true // 是否是第一次增量
        }
      ]
      // console.log(window.localStorage.getItem('tradingview.chartproperties'))
      let TradingView = window.TradingView
      let dataFeeds = new DataFeeds(kLineType, this.lineType ? this.list : this.productList, this.lineType ? this.swapsApi.getIndexBar : this.swapsApi.getFpBar, this.lineType ? 'IndexBin' : '')
      this.clear = () => {
        dataFeeds.unsubscribeBars()
      }
      let widget = this.widget = window.tvWidget = new TradingView.widget({
        width: '100%',
        height: 456,
        symbol: coinPair,
        interval: '5',
        allow_symbol_change: true,
        timezone: 'Asia/Hong_Kong',
        container_id: 'tv_chart_container',
        // BEWARE: no trailing slash is expected in feed URL
        datafeed: dataFeeds,
        // (!~window.location.hostname.indexOf('bbx') ? '' : 'https://static.bbx.com') +
        library_path: '/js/charting_library/',
        locale: langObj[lang] || 'en', // this.changeLocale() || 'zh',
        custom_css_url: 'base2.css',
        debug: false,
        load_last_chart: false,
        // Regression Trend-related functionality is not implemented yet, so it's hidden for a while
        drawings_access: {
          type: 'black',
          tools: [
            { name: 'Regression Trend' }
          ]
        },
        disabled_features: ['legend_context_menu', 'volume_force_overlay', 'timeframes_toolbar', 'display_market_status', 'compare_symbol', 'go_to_date', 'header_chart_type', 'header_compare', 'header_interval_dialog_button', 'header_screenshot', 'header_symbol_search', 'header_undo_redo', 'show_hide_button_in_legend', 'show_interval_dialog_on_key_press', 'snapshot_trading_drawings', 'symbol_info', 'border_around_the_chart', 'remove_library_container_border', 'header_saveload', 'show_interval_dialog_on_key_press', 'header_interval_dialog_button', 'header_resolutions'],
        enabled_features: ['move_logo_to_main_pane', 'dont_show_boolean_study_arguments', 'hide_last_na_study_output'],
        charts_storage_api_version: '1.1',
        client_id: 'bbx.com',
        user_id: 2,
        loading_screen: {
          background: '#ffffff'
        },
        overrides: {
          'volumePaneSize': 'medium',
          'paneProperties.background': '#ffffff', // 整个背景
          'paneProperties.horzGridProperties.color': 'rgba(50,69,101,0.1)', // grid 横线
          'paneProperties.vertGridProperties.color': 'rgba(50,69,101,0.1)', // grid 竖线
          'paneProperties.crossHairProperties.color': '#CDD5DF', // 交叉轴
          'paneProperties.topMargin': 30,
          'paneProperties.legendProperties.showSeriesTitle': false,
          // Candles styles
          'mainSeriesProperties.candleStyle.drawBorder': true,
          'mainSeriesProperties.candleStyle.borderUpColor': 'rgb(49, 158, 92)', // 蜡烛边框
          'mainSeriesProperties.candleStyle.borderDownColor': 'rgb(184, 58, 58)', // 蜡烛边框
          'mainSeriesProperties.candleStyle.upColor': 'rgb(49, 158, 92)', // 蜡烛 升
          'mainSeriesProperties.candleStyle.downColor': 'rgb(184, 58, 58)', // 蜡烛 降
          'mainSeriesProperties.candleStyle.wickUpColor': 'rgb(49, 158, 92)', // 蜡烛成交上线颜色
          'mainSeriesProperties.candleStyle.wickDownColor': 'rgb(184, 58, 58)', // 蜡烛成交下颜色
          'mainSeriesProperties.candleStyle.barColorsOnPrevClose': true,
          'paneProperties.priceAxisProperties.alignLabels': true,
          'paneProperties.legendProperties.showLegend': false,
          'scalesProperties.lineColor': '#5d8ed5', // 内部 边框线
          'scalesProperties.fontSize': 12,
          'scalesProperties.textColor': '#97B0D6', // 字母和数字
          'mainSeriesProperties.barStyle.downColor': '#ffff00', // #d32f2f
          'mainSeriesProperties.haStyle.upColor': '#DC143C',
          'mainSeriesProperties.haStyle.downColor': '#d75442', // ---------------------
          'mainSeriesProperties.areaStyle.color1': 'rgba(95,142,212, 0.05)', // 分时颜色上
          'mainSeriesProperties.areaStyle.color2': 'rgba(95,142,212, 0.05)', // 分时颜色下
          'mainSeriesProperties.areaStyle.linecolor': 'rgba(95,142,212, 0.8)', // 分时线颜色
          'mainSeriesProperties.areaStyle.linewidth': 0.5  // 分时线宽度
        },
        studies_overrides: {
          'volume.volume.color.0': '#874755', // 倒影
          'volume.volume.color.1': '#0a6b61', // 倒影
          'volume.volume.transparency': 50,
          'volume.show ma': true,
          'volume.volume ma.color': '#7e9efd',
          'volume.volume ma.plottype': 'line',
          'volume.volume ma.linewidth': 2,
          'Moving Average.precision': 4 // 加号中的位数
        }
      })
      // widget.onChartReady(() => {
      //   widget.chart().executeActionById('drawingToolbarAction')
      // })
      widget.onChartReady(() => {
        widget.chart().createStudy('Moving Average', false, false, [5], null, {
          'Plot.color.0': '#ff9500',
          'Plot.linewidth': 2
        })
        widget.chart().createStudy('Moving Average', false, false, [10], null, {
          'Plot.color.0': '#d32f2f',
          'Plot.linewidth': 2
        })
        widget.chart().createStudy('Moving Average', false, false, [20], null, {
          'Plot.color.0': '#b4ad14',
          'Plot.linewidth': 2
        })
        widget.chart().createStudy('Moving Average', false, false, [60], null, {
          'Plot.color.0': '#107efa',
          'Plot.linewidth': 2
        })
        let buttonList = kLineType.map((item, i) => {
          return widget.createButton()
            .data('interval', item.name)
            .on('click', (e) => {
              buttonList.map(item => {
                item.removeClass('selected')
              })
              buttonList[i].addClass('selected')
              widget.chart().setChartType(item.name === '0' ? 3 : 1)
              widget.chart().getAllStudies().map(items => {
                if (items.name === 'Moving Average') {
                  widget.chart().setEntityVisibility(items.id, item.name !== '0')
                }
              })
              if (item.name === '0' || item.name === '5') { // 点击分时
                if (widget.chart().resolution() !== '0' && widget.chart().resolution() !== '5') widget.chart().setResolution(item.name)
              } else widget.chart().setResolution(item.name)
            }) //
            .append(window.$('<a class="time-interval" id=interval' + item.name + '>' + item.buttonName + '</a>'))
        })
        buttonList.map(item => {
          if (item.data('interval') === widget.chart().resolution()) {
            item.addClass('selected')
          }
        })
      })
      let t
      let klineIfarme = document.querySelector('#' + widget.id)
      klineIfarme.style.visibility = 'hidden'
      let isLoad = () => {
        if (klineIfarme.contentWindow && klineIfarme.contentWindow.document.readyState === 'complete') {
          klineIfarme.style.visibility = ''
          clearInterval(t)
        }
      }
      t = setInterval(isLoad, 1000)
    }
  },
  mounted() {
    if (this.list.length) {
      this.getInfo()
      this.init()
    }
  },
  beforeDestroy() {
    this.clear()
  }
}
</script>
<style lang="less" scoped>
 @import "./information.less";
 .kline {
    // margin-top: 10px;
    height: 460px;
    border: 1px solid rgba(151,176,214,0.2);
 }
 .index-detail {
   width: 880px;
   div {
    //  flex: 1;
     &:first-child {
       width: 150px;
     }
   }
   span {
     display: block;
    //  width: 200px;
     height: 40px;
     padding-left: 12px;
     line-height: 40px;
     font-weight: 400;
     border: 1px solid rgba(151,176,214,0.2);
     &:last-child {
       border-top: none;
     }
   }
   div:nth-child(n + 2) {
      flex: 1;
       span {
         border-left: none;
       }
     }
 }
 .nav {
   border-radius: 50% 50% 0 0;
   a {
    height: 40px;
    width: 100px;
    text-align: center;
    line-height: 40px;
    background-color: #E5EAF3 ;
    color: #5d6686;
    &:last-child {
      border-radius: 0 6px 0 0;
    }
    &:first-child {
      border-radius: 6px 0 0;
    }
    &.active {
      background-color: #eff3f9;
    }
   }
 }
</style>
