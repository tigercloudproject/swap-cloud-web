
<template>
  <div class="set-plan-window">
    <div class="set-plan-window-content">
        <st-row class="item">
          <p>{{ $t('submitEntrust.priceType') }}</p>
          <div class="item-sel">
              <div class="leverage-sel">
              <div class="Sel-mask" v-if="priceTypeShow" @click="priceTypeShow = false"></div>
                 <span class="Sel-name"  @click="priceTypeShow = !priceTypeShow">
                   <span>{{ $t('submitEntrust.priceType_' + priceTypeValue) }}</span>
                 </span>
                 <ul class="Sel-list" v-if="priceTypeShow">
                    <li  :key="item" v-for="item in priceType" :class="item === priceTypeValue ? 'active' : '' " @click="changePriceType(item)">
                       {{ $t('submitEntrust.priceType_' + item) }}
                    </li>
                 </ul>
            </div>
          </div>
        </st-row>
                <st-row class="item">
          <p>{{ $t('submitEntrust.strategy') }}</p>
          <div class="item-sel">
              <div class="leverage-sel">
              <div class="Sel-mask" v-if="strategyShow" @click="strategyShow = false"></div>
                 <span class="Sel-name"  @click="strategyShow = !strategyShow">
                   <span>{{ $t('submitEntrust.strategy_' + strategyValue) }}</span>
                 </span>
                 <ul class="Sel-list" v-if="strategyShow">
                    <li  :key="item" v-for="item in strategy" :class="item === strategyValue ? 'active' : '' " @click="changeStrategy(item)">
                       {{ $t('submitEntrust.strategy_' + item) }}
                    </li>
                 </ul>
            </div>
          </div>
        </st-row>
        <st-row class="item">
          <p>{{ $t('submitEntrust.onTime') }}</p>
          <div class="item-sel">
              <div class="leverage-sel">
              <div class="Sel-mask" v-if="timeListShow" @click="timeListShow = false"></div>
                 <span class="Sel-name"  @click="timeListShow = !timeListShow">
                   <span>{{ $t('submitEntrust.onTime_' + timeListValue) }}</span>
                 </span>
                 <ul class="Sel-list" v-if="timeListShow">
                    <li :key="item" v-for="item in timeList" :class="item === timeListValue ? 'active' : '' " @click="changeTimeList(item)">
                       {{ $t('submitEntrust.onTime_' + item) }}
                    </li>
                 </ul>
            </div>
          </div>
        </st-row>
    </div>

    <st-row class="btn" justify="between">
      <a @click="close">{{ $t('submitEntrust.cancel') }}</a>
       <a @click="submit">{{ $t('submitEntrust.on') }}</a>
    </st-row>
  </div>
</template>

<script>
  export default {
    name: 'set-plan-window',
    props: ['close'],
    data() {
      return {
        priceType: [1, 2, 4],
        priceTypeValue: 1,
        priceTypeShow: false,
        strategy: [1, 2],
        strategyValue: 1,
        strategyShow: false,
        timeList: [24, 168],
        timeListValue: 24,
        timeListShow: false
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
      changePriceType(value) {
        this.priceTypeValue = value
        this.priceTypeShow = false
      },
      changeStrategy(value) {
        this.strategyValue = value
        this.strategyShow = false
      },
      changeTimeList(value) {
        this.timeListValue = value
        this.timeListShow = false
      },
      submit() {
        let info = {
          priceTypeValue: this.priceTypeValue,
          strategyValue: this.strategyValue,
          timeListValue: this.timeListValue
        }
        this.$emit('changePlan', info)
        window.localStorage.setItem('planInfo', JSON.stringify(info))
        this.close()
      }
    },
    mounted() {
      let info = window.localStorage.getItem('planInfo')
      if (info) {
        info = JSON.parse(info)
        this.priceTypeValue = info.priceTypeValue
        this.strategyValue = info.strategyValue
        this.timeListValue = info.timeListValue
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../../assets/css/base";
.set-plan-window {
  padding: 10px 20px 0;
  .set-plan-window-content {
    padding-top: 10px;
    border-bottom: 1px solid rgba(151, 176, 214, .5);
    
  }
  .btn {
    padding: 0 20px;
  }
    a {
        margin-top: 30px;
        // margin-left: 37px;
        display: block;
        width: 160px;
        height: 48px;
        background-color: @windowButton;
        font-size: 18px;
        text-align: center;
        line-height: 48px;
        color: @bbxWhite;
        border-radius: 2px;
        &:hover {
            background-color: @windowButtonHover;
        }
        &:first-child {
          background-color: #ECF2F7;
          border: 1px solid @windowButton;
          color: @windowButton;
          &:hover {
            border-color: @windowButtonHover;
            color: @windowButtonHover;
          }
        }
    }
      .item {
        height: 34px;
        margin-bottom: 20px;
        &>p {
          width: 130px;
          padding-right: 14px; 
          line-height: 34px;
          text-align: right;
          color: #5f6d98;
          font-weight: 400;                       
        }
        .item-sel {
          .Sel-name {
            position: relative;
            display: block;
            width: 200px;
            height: 34px;
            padding-left: 10px;
            border: 1px solid #b6c8e2;
            line-height: 34px;
            color: #3e4450;
            span {
              font-weight: 400;
            }
            &::after {
              position: absolute;
              content: '';
              right: 10px;
              top: 50%;
              margin-top: -5px;
              border-top:8px solid #b6c8e2;
              border-right:6px solid  rgba(0,0,0,0);
              border-bottom:6px solid rgba(0,0,0,0);
              border-left:6px solid  rgba(0,0,0,0);
            }
          }
          .leverage-sel {
            position: relative;
            .Sel-mask {
              position: fixed;
              left: 0px;
              top: 0px;
              right: 0px;
              bottom: 0px;
            }
            .Sel-list {
              position: absolute;
              z-index: 1;
              width: 100%;
              color: #5f6d98;
              background: #ECF2F7;
               border: 1px solid #b6c8e2;
              cursor: pointer;
              li {
                padding-left: 10px;
              }
              li.active, li:hover {
                background:  #E5ECF2;
              }
            }
          }
        }
      }
}
</style>
