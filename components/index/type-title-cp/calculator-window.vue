
<template>
  <st-row class="calculator-window">
    <ul class="silder">
      <li @click="type = 1" :class="{active: type === 1}">{{ $t('typeTitle.calculatorPage.plCalculator') }}</li>
      <li @click="type = 2" :class="{active: type === 2}">{{ $t('typeTitle.calculatorPage.flatPrice') }}</li>
      <li @click="type = 3" :class="{active: type === 3}">{{ $t('typeTitle.calculatorPage.earningsRate') }}</li>
    </ul>
    <div>
    <st-row class="calculator-window-centent">
      <div class="calculator-window-centent-left">
        <st-row class="item">
          <p>{{ $t('typeTitle.calculatorPage.way') }}</p>
          <div class="item-tab">
            <a @click="options = true" :class="{active: options}" >{{ $t('typeTitle.calculatorPage.long') }}</a>
            <a  @click="options = false" :class="{active: !options}" >{{ $t('typeTitle.calculatorPage.sort') }}</a>
          </div>
        </st-row>
        <st-row v-if="type === 3" class="item">
          <p>{{ $t('typeTitle.calculatorPage.calculatorType') }}</p>
          <div class="item-tab">
            <a @click="calculatorType = true" :class="{active: calculatorType}" >{{ $t('typeTitle.calculatorPage.earningsValue') }}</a>
            <a @click="calculatorType = false" :class="{active: !calculatorType}" >{{ $t('typeTitle.calculatorPage.earningsRate') }}</a>
          </div>
        </st-row>
        <st-row class="item">
          <p>{{ $t('typeTitle.calculatorPage.leverage') }}</p>
          <div class="item-sel">
              <div class="leverage-sel">
              <div class="Sel-mask" v-if="leverageShow" @click="leverageShow = false"></div>
                 <span class="Sel-name"  @click="leverageShow = !leverageShow">
                   <span>{{ leverageInfo.name}}</span>
                 </span>
                 <ul class="Sel-list" v-if="leverageShow">
                    <li v-if="item.name !== 'allCabin'" :key="item.name" v-for="item in leverageList" :class="item.name === leverageInfo.name ? 'active' : '' " @click="changeLeverage(item.name)">
                       {{ item.name}}
                    </li>
                 </ul>
            </div>
          </div>
        </st-row>
        <st-row class="item">
          <p>{{ $t('typeTitle.calculatorPage.positions') }}</p>
          <div class="item-input">
            <input  @input="postionsChange" v-model="postions" type="text">
            <span>{{ $t('common.pieces') }}</span>
          </div>
        </st-row>
        <st-row class="item">
          <p>{{ $t('typeTitle.calculatorPage.openPrice') }}</p>
          <div class="item-input">
            <input @input="openPriceChange" v-model="openPrice" type="text">
            <span>{{ productInfo.contract.quote_coin }}</span>
          </div>
        </st-row>
        <st-row v-if="type === 1" class="item">
          <p>{{ $t('typeTitle.calculatorPage.closePrice') }}</p>
          <div  class="item-input">
            <input @input="closePriceChange" v-model="closePrice" type="text">
            <span>{{ productInfo.contract.quote_coin }}</span>
          </div>
        </st-row>
        <st-row v-if="type === 3" class="item">
          <p>{{ calculatorType ? $t('typeTitle.calculatorPage.earningsValue') : $t('typeTitle.calculatorPage.earningsRate') }}</p>
          <div class="item-input">
            <input @input="earningsChange" v-model="earnings" type="text">
            <span>{{ calculatorType ? com.marginUnit : '%'}}</span>
          </div>
        </st-row>
        <a class="btn" @click="calculator" target="_blank">{{ $t('typeTitle.calculatorPage.openCalculator') }}</a>
      </div >
      <div class="calculator-window-centent-rigth">
        <h6>{{ $t('typeTitle.calculatorPage.calculatorValue') }}</h6>
        <div v-if="type === 1">
          <div class="result">
            <p>{{ $t('typeTitle.calculatorPage.im') }}</p>
            <p>{{ profitAndLoss.im | addCommom(com.valueUnit) }} {{ com.marginUnit }}</p>
          </div>
          <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.positionValue') }}</p>
            <p>{{ profitAndLoss.value | addCommom(com.valueUnit) }} {{ com.marginUnit }}</p>
          </div>
          <div class="result">
            <p>{{ $t('typeTitle.calculatorPage.pl') }}</p>
            <p>{{ profitAndLoss.pl | addCommom(com.valueUnit) }} {{ com.marginUnit }}</p>
          </div>
         <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.rate') }}</p>
            <p>{{ profitAndLoss.rate | addCommom(2) }}%</p>
          </div>
        </div>
        <div v-else-if="type === 2">
           <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.flatPriceTwo') }}</p>
            <p>{{ flatPrice.flatPrice | addCommom(com.priceUnit - 1)}} {{ productInfo.contract.quote_coin }}</p>
          </div>
           <div class="result">
            <p>{{ $t('typeTitle.calculatorPage.positionValue') }}</p>
            <p>{{ flatPrice.value | addCommom(com.valueUnit) }} {{ productInfo.contract.quote_coin }}</p>
          </div>
           <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.imRate') }}</p>
            <p>{{ flatPrice.im }}</p>
          </div>
           <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.mmRate') }}</p>
            <p>{{ flatPrice.mm }}</p>
          <!-- </st-row> -->
           </div>
        </div>
         <div v-else-if="type === 3">
          <div class="result">
            <p>{{ $t('typeTitle.calculatorPage.im') }}</p>
            <p>{{ targetClose.im | addCommom(com.valueUnit) }} {{ com.marginUnit }}</p>
          </div>
          <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.targetClosePrice') }}</p>
            <p v-if="targetClose.price">{{ targetClose.price | addCommom(com.priceUnit - 1) }} {{ productInfo.contract.quote_coin }}</p>
            <p v-else>
              --
            </p>
          </div>
          <div class="result" >
            <p>{{ calculatorType ? $t('typeTitle.calculatorPage.Rate') : $t('typeTitle.calculatorPage.Value')}}</p>
            <p v-if="calculatorType">{{ targetClose.valueOrRote | addCommom(2) +'%' }}</p>
            <p v-else>{{ targetClose.valueOrRote | addCommom(com.valueUnit) }}{{ com.marginUnit }}</p>
          </div>
         </div>
      </div>
    </st-row>
    <st-row class="calculator-window-centent-bottom" align="center"><p>{{ $t('typeTitle.calculatorPage.message') }}</p></st-row>
    </div>
  </st-row>
</template>

<script>
  import Utils from '../../../assets/js/util.js'
  import Formula from '../../../assets/js/formula/index.js'
  export default {
    name: 'calculator-window',
    props: ['close'],
    data() {
      return {
        // 计算方案 1： 盈亏计算  2. 强平价格 3.目标价收益率
        type: 1,
        // true 为开多
        options: true,
        // true 为目标收益额
        calculatorType: true,
        leverageShow: false,
        leverageInfo: {},
        // 开仓价格
        openPrice: '',
        // 平仓价格
        closePrice: '',
        // 仓位
        postions: '',
        // 收益额或者收益率
        earnings: '',
        // 盈亏计算
        profitAndLoss: {
          im: 0,
          value: 0,
          pl: 0,
          rate: 0
        },
        // 强平价格
        flatPrice: {
          flatPrice: 0,
          value: 0,
          im: 0,
          mm: 0
        },
        // 目标价收益率
        targetClose: {
          price: 0,
          im: 0,
          valueOrRote: 0
        }
      }
    },
    computed: {
      com() {
        return this.$store.state.com
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      leverageList() {
        return this.$store.state.com.leverageList
      }
    },
    methods: {
      // 算仓位价值
      CalculateContractValue(vol, price) {
        return Formula.CalculateContractValue(vol, price, Formula.contractObj.getContract(this.productInfo.contract))
      },
      earningsChange() {
        this.earnings = Utils.retainDecimals(this.earnings, {integer: this.calculatorType ? 8 : 4, decimal: this.calculatorType ? this.com.valueUnit : 2}) || ''
      },
      postionsChange() {
        this.postions = Utils.retainDecimals(this.postions, {integer: 8, decimal: 0}) || ''
      },
      openPriceChange() {
        this.openPrice = Utils.retainDecimals(this.openPrice, {integer: 8, decimal: this.com.priceUnit - 1}) || ''
      },
      closePriceChange() {
        this.closePrice = Utils.retainDecimals(this.closePrice, {integer: 8, decimal: this.com.priceUnit - 1}) || ''
      },
      calculator() {
        if (this.type === 1) {
          if (!this.postions || !this.openPrice || !this.closePrice) {
            this.$alert(this.$t('typeTitle.calculatorPage.a1'))
            return false
          }
          this.profitAndLoss.value = this.CalculateContractValue(Number(this.postions), Number(this.openPrice))
          let margin = this.marginRate(this.profitAndLoss.value)
          this.profitAndLoss.im = this.profitAndLoss.value * Math.max(margin.initial, 1 / this.leverageInfo.value)
          this.profitAndLoss.pl = this.plFn(this.openPrice, this.closePrice, Number(this.postions), this.options)
          this.profitAndLoss.rate = this.profitAndLoss.pl / this.profitAndLoss.im * 100
        } else if (this.type === 2) {
          if (!this.postions || !this.openPrice) {
            this.$alert(this.$t('typeTitle.calculatorPage.a1'))
            return false
          }
          this.flatPrice.value = this.CalculateContractValue(Number(this.postions), Number(this.openPrice))
          let margin = this.marginRate(this.flatPrice.value)
          this.flatPrice.im = Math.max(margin.initial, 1 / this.leverageInfo.value)
          this.flatPrice.mm = margin.maintenance
          // let fee = Number(this.productInfo.fee_config.taker_fee)
          // let position = {HoldVol: Number(this.postions), HoldAvgPrice: Number(this.openPrice), IM: this.flatPrice.im, MM: this.flatPrice.mm}
          // this.flatPrice.flatPrice = Formula.CalculatePositionLiquidatePrice(position, 0, this.getContractInfo(), !this.options)
          // let pl = this.flatPrice.value * (margin.initial - margin.maintenance) * (this.options ? 1 + fee : 1 - fee)
          this.flatPrice.flatPrice = this.liquidatePrice(Number(this.postions), Number(this.openPrice), this.leverageInfo.value)
        } else {
          if (!this.postions || !this.openPrice || !this.earnings) {
            this.$alert(this.$t('typeTitle.calculatorPage.a1'))
            return false
          }
          let value = this.CalculateContractValue(Number(this.postions), Number(this.openPrice))
          let margin = this.marginRate(value)
          this.targetClose.im = value * Math.max(margin.initial, 1 / this.leverageInfo.value)
          let isR = Formula.IsReverse(this.productInfo.contract.quote_coin, this.productInfo.contract.price_coin)
          if (this.calculatorType) {
            if ((this.options && !isR) || (!this.options && isR)) {
              value += Number(this.earnings)
            } else {
              value -= Number(this.earnings)
            }
            this.targetClose.valueOrRote = this.earnings / this.targetClose.im
          } else {
            this.targetClose.valueOrRote = this.earnings * this.targetClose.im / 100
            if ((this.options && !isR) || (!this.options && isR)) {
              value += this.targetClose.valueOrRote
            } else {
              value -= this.targetClose.valueOrRote
            }
          }
          this.targetClose.price = this.targetClosePriceFn(value, Number(this.postions))
        }
      },
      // 获取合约对象
      getContractInfo() {
        return {
          FeeConfig: {TakerFee: Number(this.productInfo.fee_config.taker_fee)},
          Contract: Formula.contractObj.getContract(this.productInfo.contract),
          RiskLimit: Formula.contractObj.getRiskLimit(this.productInfo.risk_limit)
        }
      },
      // 盈亏计算
      plFn(open, close, postions, way) {
        return Formula.LongOrSort(postions, open, close, Formula.contractObj.getContract(this.productInfo.contract), way) || 0
      },
      // 计算起始和维持保证金率
      marginRate(totalValue) {
        let risk = this.productInfo.risk_limit
        let initial = Number(risk.initial_margin)
        let maintenance = Number(risk.maintenance_margin)
        if (totalValue > risk.base_limit) {
          let steps = Math.ceil((totalValue - risk.base_limit) / risk.step)
          initial = Utils.precision.times(steps + 1, initial)
          maintenance = Utils.precision.times(steps + 1, maintenance)
        }
        if (initial > 1) {
          initial = 1
        }
        if (maintenance > 0.5) {
          maintenance = 0.5
        }
        return {initial, maintenance}
      },
      // 计算目标平仓价格
      targetClosePriceFn(value, vol) {
        return Formula.CalculateQuotePrice(value, vol, Formula.contractObj.getContract(this.productInfo.contract))
      },
      // 计算目标平仓价格
      liquidatePrice(Vol, Price, Leverage) {
        return Formula.CalculateOrderLiquidatePrice({Vol, Price, Leverage}, 0, this.getContractInfo(), this.options)
      },
      changeLeverage(name) {
        this.leverageShow = false
        this.leverageInfo = this.leverageList.filter(item => { return item.name === name })[0]
      }
    },
    created() {
      this.leverageInfo = this.leverageList[1] || {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../../assets/css/base";
.calculator-window {
  // padding: 10px 20px;
  margin-bottom: -30px;
  background-color: #E5ECF2;
  ul.silder {
    height: 460px;
    background-color: #ECF2F7;
    margin-bottom: 0px;
    li {
      width: 160px;
      // height: 46px;
      // padding-left: 20px;
      padding: 13px 10px 13px 20px;
      // line-height: 46px;
      line-height: 20px;
      cursor: pointer;
      color: #5f6d98;
      font-size: 16px;
      &.active {
        border-left: 4px solid @windowButton;
        padding-left: 16px;
        background-color: #E5ECF2;
        color: #3e4450;
      }
    }
  }
  .calculator-window-centent {
    margin-top: 26px;
    display: flex;
    .calculator-window-centent-left {
      position: relative;
      height: 362px;
      // width: 314px;
      flex: auto;
      .item {
        height: 34px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        &>p {
          // width: 96px;
          width: 113px;
          padding-right: 14px;
          // line-height: 34px;
          line-height: 18px;
          text-align: right;
          color: #5f6d98;
          font-weight: 400;
        }
        .item-tab {
            display: flex;
            width:240px;
          a {
            flex: auto;
            // height: 34px;
            // width: 100px;
            border: 1px solid @windowButton;
            text-align: center;
            // line-height: 34px;
            line-height: 18px;
            padding: 8px 0;
            font-weight: 400;
            &.active{
                background-color:  @windowButton;
                color: @bbxWhite;
            }
            &:first-child {
              border-radius: 2px 0 0 2px;
            }
             &:last-child {
              border-radius: 0 2px 2px 0;
            }
          }
        }
        .item-input {
          position: relative;
          width:240px;
          input {
            padding-left: 10px;
            border: 1px solid #b6c8e2;
            // width: 200px;
            width: 240px;
            height: 34px;
            color: #3e4450;
            background-color: #E5ECF2;
            border-radius: 2px;
          }
          span {
            position: absolute;
            right: 10px;
            line-height: 34px;
            color: #b6c8e2;
            font-weight: 400;
          }
        }
        .item-sel {
          .Sel-name {
            position: relative;
            display: block;
            // width: 200px;
            width: 240px;
            height: 34px;
            padding-left: 10px;
            border: 1px solid #b6c8e2;
            line-height: 34px;
            color: #3e4450;
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
            width:240px;
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
      .btn {
        position: absolute;
        bottom: 0px;
        // margin-left: 32px;
        margin-left: 64px;
        display: block;
        width: 264px;
        height: 38px;
        background-color: @windowButton;
        font-size: 18px;
        text-align: center;
        line-height: 38px;
        color: @bbxWhite;
        border-radius: 2px;
        &:hover {
            background-color: @windowButtonHover;
        }
      }
    }
    .calculator-window-centent-rigth {
      width: 170px;
      height: 362px;
      padding: 20px 10px;
      background-color: #ECF2F7;
      h6 {
        color: #8895BB;
        font-size: 12px;
        font-weight: 400;
        line-height: 36px;
      }
      .result {
        margin: 6px 0;
        p {
          font-size: 12px;
          font-weight: 400;
          // text-align: left;
          color: #5f6d98;
          // line-height: 26px;
          line-height: 16px;
          padding-top: 8px;
        }
      }
    }
  }
   .calculator-window-centent-bottom {
      margin: 20px 20px 0;
      height: 56px;
      border-top: 1px solid rgba(151, 176, 214, .5);
      p {
        // height: 50px;
        font-weight: 400;
        // line-height: 50px;
        font-size: 12px;
        color: rgba(95,109,152, .8)
      }
    }
    // a {
    //     margin-top: 20px;
    //     // margin-left: 37px;
    //     display: block;
    //     width: 180px;
    //     height: 50px;
    //     background-color: @windowButton;
    //     font-size: 18px;
    //     text-align: center;
    //     line-height: 50px;
    //     color: @bbxWhite;
    //     &:hover {
    //         background-color: @windowButtonHover;
    //     }
    // }
    // div {
    //   // margin-top: 10px;
    //   span {
    //     color: @bbxFooterColor;
    //     font-size: 12px;
    //     font-weight: 400;
    //   }
    // }
}
</style>
