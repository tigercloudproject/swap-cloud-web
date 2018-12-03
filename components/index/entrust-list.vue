<template>
  <div class='entrust-list'>
      <h3>{{ $t('newsDeal.entrustList') }}</h3>
       <div class="entrust-list-centent">
        <st-row class="entrust-list-title">
         <h6>{{ $t('newsDeal.price') }} ({{ productInfo.contract.quote_coin }})</h6>
         <h6>{{ $t('newsDeal.number') }} ({{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }})</h6>
         <h6>{{ $t('newsDeal.sumNumber') }} ({{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }})</h6>
       </st-row>
       <ul class="red">
         <li :key="index" v-for="(item, index) in sellOrder" :class="item.color">
           <st-row class="background red" :class="{yellow: item.order_id}">
             <div class="item_hover"></div>
             <div class="item_bg" :style="{width: item.vol / sellMax * 100 + '%'}"></div>
              <st-row class="price-vol">
                <p @click="setPrice(item.price)">{{ item.price | splitFormat(com.priceUnit - 1) }}</p>
                <p @click="setVol(item.vol)">{{ item.vol|addCommom(coinUnit ? com.volUnit : com.valueUnit) }}</p>
                <p @click="setVol(item.sumVol)">{{ item.sumVol|addCommom(coinUnit ? com.volUnit : com.valueUnit) }}</p>
                <div class="hint"><p>{{ $t('newsDeal.ordereSellHover', {price: item.price, vol: item.orderVol, unit: coinUnit ? $t('common.pieces') : productInfo.contract.base_coin}) }}</p></div>
              </st-row>
             <div class="cancel" @click="cancelOrders(item.order_id)">
                <div class="hint">
                 <p>{{ $t('newsDeal.cancelHover') }}</p>
               </div>
             </div>
           </st-row>
         </li>
       </ul>
       <st-row align="center" justify="center" class="entrust-list-price">
        <div>
         <h4 :class="isRose || 'red'">{{ ticker.last_price | splitFormat(com.priceUnit - 1) }} <span></span> </h4>
         <st-row align="center">
           <st-row class="price" align="center">
             <div class="hint-father hover">
               <nuxt-link target="_blank" :to="`/information/index/${productInfo.contract.index_id}`"><p>{{ ticker.index_price | splitFormat(com.priceUnit) }}</p></nuxt-link>
                <div class="hint">
                  <p>{{ $t('newsDeal.indexPriceOne') }}</p>
                  <p>{{ $t('newsDeal.indexPriceTwo', {name: productInfo.contract.name}) }}</p>
                  <p>{{ $t('common.seeMore') }}</p>
                </div>
             </div>
              <div>&nbsp; / &nbsp;</div>
             <div class="hint-father">
                <p><a target="_blank" style="font-weight: 700;text-decoration: underline;" :href="`https://support.bbx.com/hc/${locale}/articles/360009104013-%E5%BC%95%E5%85%A5%E5%90%88%E7%90%86%E4%BB%B7%E6%A0%BC%E7%9A%84%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%88%B6`">{{ ticker.fair_price | splitFormat(com.priceUnit) }}</a></p>
                 <div class="hint">
                    <p>{{ $t('newsDeal.fairPriceOne') }}</p>
                    <p>{{ $t('common.seeMore') }}</p>
                    <!-- <p>{{ $t('newsDeal.fairPriceTwo') }}</p> -->
                </div>
             </div>
           </st-row>
           <div class="hint-father">
            <a target="_blank" :href="`https://support.bbx.com/hc/${locale}/articles/360007975194-%E8%87%AA%E5%8A%A8%E5%87%8F%E4%BB%93%E7%B3%BB%E7%BB%9F-ADL-`">
             <div class="warning">
             <span :class="{active: bl}" :key="index" v-for="(bl, index) in getPnls()"></span>
             <!-- <span class="active"></span>
             <span class="active"></span>
             <span class="active"></span>
             <span class="active"></span> -->
             </div>
             </a>
             <div class="hint">
                     <p>{{ $t('newsDeal.ADLHoverOne') }}</p>
                    <p>{{ $t('newsDeal.ADLHoverTwo') }}</p>
                    <p>{{ $t('common.seeMore') }}</p>
                    <!-- <p>{{ $t('newsDeal.fairPriceTwo') }}</p> -->
                </div>
          </div>
        </st-row>
        </div>
       </st-row>
       <ul>
         <li :key="index" v-for="(item, index) in buyOrder" :class="item.color">
           <st-row class="background" :class="{yellow: item.order_id}">
             <div class="item_hover"></div>
             <div class="item_bg" :style="{width:  item.vol / buyMax * 100 + '%'}"></div>
             <st-row class="price-vol">
                <p @click="setPrice(item.price)">{{ item.price|splitFormat(com.priceUnit - 1) }}</p>
                <p @click="setVol(item.vol)">{{ item.vol|addCommom(coinUnit ? com.volUnit : com.valueUnit) }}</p>
                <p @click="setVol(item.sumVol)">{{ item.sumVol|addCommom(coinUnit ? com.volUnit : com.valueUnit) }}</p>
                <div class="hint"><p> {{ $t('newsDeal.orderBuyHover', {price: item.price, vol: item.orderVol, unit: coinUnit ? $t('common.pieces') : productInfo.contract.base_coin}) }}</p></div>
             </st-row>
              <div class="cancel" @click="cancelOrders(item.order_id)">
                <div class="hint">
                 <p>{{ $t('newsDeal.cancelHover') }}</p>
               </div>
             </div>
           </st-row>
         </li>
       </ul>
       </div>
  </div>
</template>
<script>
  import Formula from '../../assets/js/formula/index.js'
  import Utils from '../../assets/js/util.js'
  export default {
    name: 'entrust-list',
    data() {
      return {
        isRose: true,
        buyMax: 0,
        sellMax: 0,
        buyOrder: [],
        sellOrder: [],
        buyOld: [],
        sellOld: [],
        sellTime: null,
        buyTime: null
      }
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      },
      coinUnit() {
        return this.$store.state.market.coinUnit
      },
      pnls() {
        return this.$store.state.market.pnls
      },
      com() {
        return this.$store.state.com
      },
      cabinList() {
        return this.$store.state.market.cabinList
      },
      curryEntrustList() {
        return this.$store.state.market.curryEntrustList
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      ticker() {
        return this.$store.state.market.ticker
      },
      sell() {
        return this.$store.state.market[this.productInfo.contract.contract_id + '_Order'] ? (this.$store.state.market[this.productInfo.contract.contract_id + '_Order'].sells || []) : []
      },
      buy() {
        return this.$store.state.market[this.productInfo.contract.contract_id + '_Order'] ? (this.$store.state.market[this.productInfo.contract.contract_id + '_Order'].buys || []) : []
      }
    },
    watch: {
      ticker(value, oldValue) {
        if (value.last_price && oldValue.last_price && (value.last_price !== oldValue.last_price)) {
          this.isRose = Number(value.last_price) > Number(oldValue.last_price)
        }
      },
      curryEntrustList(value, oldValue) {
        // this.getDate()
        // 如果用户委托没有变化就不更新深度
        let value_len = value.length
        let oldValue_len = oldValue.length
        if (value_len === 0 && oldValue_len === 0) {
          return false
        }
        let bl = false
        if (value_len === oldValue_len) {
          bl = true
          for (; value_len--;) {
            if (value[value_len].order_id !== oldValue[value_len].order_id) {
              bl = false
              break
            }
          }
        }
        if (bl) {
          return false
        }
        this.getBuy()
        this.getSell()
      },
      buy() {
        // this.getDate()
        clearTimeout(this.buyTime)
        this.buyTime = setTimeout(() => {
          this.getBuy(true)
        }, 100)
      },
      sell() {
        clearTimeout(this.sellTime)
        this.sellTime = setTimeout(() => {
          this.getSell(true)
        }, 100)
      },
      coinUnit() {
        this.getBuy()
        this.getSell()
        // this.getDate()
      }
    },
    methods: {
      getSell(bl) {
        let obj = this.getShowData(this.sell)
        // bl 为true表示深度推送过来的数据变化了
        if (bl) {
          this.compare(obj.newList, this.sellOld)
          this.sellOld = [...obj.newList]
        }
        this.sellMax = obj.max
        this.sellOrder = obj.newList.reverse()
      },
      getBuy(bl) {
        let obj = this.getShowData(this.buy, true)
        if (bl) {
          this.compare(obj.newList, this.buyOld)
          this.buyOld = [...obj.newList]
        }
        this.buyMax = obj.max
        this.buyOrder = obj.newList
      },
      // 对比价格和量的变化
      compare(list, oldList) {
        let list_len = list.length
        let odlList_len = oldList.length
        let i, bl, item, info
        if (!list_len || !odlList_len || list_len !== odlList_len) {
          return false
        }
        for (; list_len--;) {
          i = odlList_len
          bl = false
          item = list[list_len]
          for (; i--;) {
            info = oldList[i]
            if (Number(item.price) === Number(info.price)) {
              if (Number(item.vol) !== Number(info.vol)) {
                if (Number(item.vol) > Number(info.vol)) {
                  list[list_len].color = oldList[i].color === 'am_green_1' ? 'am_green_2' : 'am_green_1'
                } else {
                  list[list_len].color = oldList[i].color === 'am_red_1' ? 'am_red_2' : 'am_red_1'
                }
              }
              bl = true
              odlList_len = i
              break
            }
          }
          if (!bl) {
            if (Number(oldList[list_len].price) > Number(item.price)) {
              list[list_len].color = oldList[list_len].color === 'am_red_1' ? 'am_red_2' : 'am_red_1'
            } else {
              list[list_len].color = oldList[list_len].color === 'am_green_1' ? 'am_green_2' : 'am_green_1'
            }
          }
        }
      },
      // 获取展示数据
      getShowData(list, way) {
        // 叠加总量
        let total = 0
        // 需要多少条
        let len = Math.min(list.length, 7)
        // 7条数据中量最大的
        let max = 0
        // 转换后的集合
        let newList = []
        // 当前索引
        let index = 0
        // 当前委托长度
        let curryEntrustLen = this.curryEntrustList ? this.curryEntrustList.length : 0
        let obj, item, lenTwo
        for (;index < len; index++) {
          obj = {...list[index]}
          obj.vol = Number(this.coinUnit ? obj.vol : this.changUnitGetVol(obj.vol, obj.price))
          max < Number(obj.vol) && (max = Number(obj.vol))
          total = Utils.precision.plus(total, Number(obj.vol))
          obj.sumVol = total
          lenTwo = curryEntrustLen
          if (lenTwo) {
            for (;lenTwo--;) {
              item = this.curryEntrustList[lenTwo]
              // && [3, 4].indexOf(item.category)
              if (obj.price === item.price && item.origin !== 'SYSTEM') {
                if (obj.order_id) {
                  obj.order_id.push(item.order_id)
                } else {
                  obj.order_id = [item.order_id]
                  obj.orderVol = 0
                }
                let vol = item.vol - item.done_vol
                obj.orderVol += Number(this.coinUnit ? vol : this.changUnitGetVol(vol, obj.price))
              }
            }
          }
          newList.push(obj)
        }
        return {newList, max}
      },
      // 张和base_coin单位的切换
      changUnitGetVol(vol, price) {
        return Formula.CalculateContractBasicValue(vol, price, Formula.contractObj.getContract(this.productInfo.contract))
      },
      cancelOrders(order_id) {
        let nonce = parseInt(Date.now() / 1000)
        this.swapsApi.cancelOrders({orders: [{contract_id: this.productInfo.contract.contract_id, orders: order_id}], nonce})
        .then(res => {
          if (res.errno === 'OK') {
            this.$alert('s', this.$t('common.cancelSuccess'))
          }
        })
      },
      setPrice(price) {
        this.$store.commit('market/SET_MARKET', {
          key: 'price',
          data: price
        })
        this.$store.commit('market/SET_MARKET', {
          key: 'priceTwo',
          data: price
        })
      },
      setVol(vol) {
        this.$store.commit('market/SET_MARKET', {
          key: 'vol',
          data: this.coinUnit ? vol : Utils.retainDecimals(vol, {decimal: this.com.valueUnit})
        })
      },
      // 获取合约对象
      getContractInfo() {
        return {
          FeeConfig: {TakerFee: Number(this.productInfo.fee_config.taker_fee)},
          Contract: Formula.contractObj.getContract(this.productInfo.contract),
          RiskLimit: Formula.contractObj.getRiskLimit(this.productInfo.risk_limit)
        }
      },
      // 获取单一方向的仓位
      positionFn(longOrSort) {
        let position
        position = this.cabinList.filter(item => {
          return item.position_type === (longOrSort ? 1 : 2) // 仓位类型,1:开多,2:开空
        })[0]
        if (position) {
          position = {HoldVol: position.hold_vol, HoldAvgPrice: position.hold_avg_price, position_id: position.position_id, FreezeVol: position.freeze_vol, IM: Number(position.im)}
        }
        return position
      },
      // 获取亮灯
      getPnls() {
        let Pnls = Array(5)
        if (!this.cabinList.length || !this.pnls) {
          return Pnls
        }
        let longPosition = this.positionFn(true)
        let sortPosition = this.positionFn(false)
        let longValue = 0
        if (longPosition) {
          longValue = this.getPnlsPositions(true, longPosition) || 0
        }
        let sortValue = 0
        if (sortPosition) {
          sortValue = this.getPnlsPositions(false, sortPosition) || 0
        }
        if (!longValue && !sortValue) {
          return Pnls
        }
        let len = 0
        let i = 0
        len = longValue > sortValue ? longValue : sortValue
        // if (longValue > sortValue) {
        //   len = Formula.CalculateQuantile(longValue, this.pnls.long_pnls.length)
        // } else {
        //   len = Formula.CalculateQuantile(sortValue, this.pnls.short_pnls.length)
        // }
        if (len < 0) {
          len = 0
        } else if (len > 100) {
          len = 100
        }
        for (; len;) {
          len -= 20
          Pnls[i++] = true
          if (len <= 0) {
            break
          }
        }
        return Pnls
      },
          // 获取开多或者开空方向的Pnls
      getPnlsPositions(bl, position) {
        let long = Formula.CalculatePNL(position, Number(this.com.haveAssert), Number(this.ticker.fair_price), this.getContractInfo(), bl)
        let list = this.pnls[bl ? 'long_pnls' : 'short_pnls']
        let len = list.length
        let info, value
        for (; len--;) {
          info = list[len]
          if (long >= Number(info.min_pnl) && long < Number(info.max_pnl)) {
            value = info.quan_tile
            break
          }
        }
        return value
      }
      // getOrder(list, len) {
      //   let total = list[index].number
      //   for (;index--;) {
      //     total += list[index].number
      //   }
      //   return total
      // }
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.entrust-list{
  margin-right: 10px;
  width: 256px;
  height: 480px;
  background-color: @bbFooterBackground;
  border-radius: 2px;
  h3 {
    padding-left: 12px;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    font-weight: 300;
    background-color:  rgba(23,26,37, 0.2);
    color: @bbxGray;
  }
  .entrust-list-centent {
    .entrust-list-title {
      padding: 8px;
      h6 {
       width: 80px;
       font-size: 12px;
       color:  @bbxBlue1;
        &:nth-child(n+2) {
         text-align: right;
       }
      }
    }
  }
  ul {
    margin-bottom: 0px;
    min-height: 161px;
    p {
          font-weight: 500;
    }
    &.red li {
      border-right: 4px solid rgba(184, 58, 58, .1);
      .price-vol {
        &>p:first-child {
          margin-left: 8px;
          color: @bbxRed; 
        }
      }
    } 
    li {
      padding: 2px 0;
      border-right: 4px solid rgba(49, 158, 92, .1);
      cursor: pointer;
       &:hover {
         border-color: rgba(49,58,86, .3);
        .background {
         .item_bg {
           display: none;
         }
         .item_hover {
          background-color: rgba(49,58,86, .3);
        }
       }
      }
      &.am_red_1,&.am_red_2 {
        .item_hover {
          animation: changeColor_red .5s linear 0s 1;
        }
      }
      &.am_green_1,&.am_green_2 {
       .item_hover {
          animation: changeColor_green .5s linear 0s 1;
        }
      }
      .price-vol {
         &>p {
             position: relative;
             margin-bottom: 0px;
             height: 19px;
             width: 80px;
             line-height: 19px;
             font-size: 12px;
             color: @bbxGray;
             &:nth-child(n+2) {
               text-align: right;
             }
             &:first-child {
               margin-left: 8px;
               color: @bbxGreen;
             }
            }
      }
      .yellow {
        .price-vol>p {
           &:nth-child(n+2) {
            color: #d9a959;
          }
        }
        .price-vol:hover {
           .hint {
             display: block;
            //  color: @acountTextColor2;
             font-size: 12px;
           }
         }
        &:hover {
          .price-vol p:nth-child(2) {
            width: 66px;
          }
          .cancel {
            display: block;
            // position: relative;
            &:hover .hint {
              display: block;
              font-size: 12px;
            }
          }
        }
      }
      .background {
        .cancel {
          position: relative;
          display: none;
          flex: 1;
          height: 19px;
          background: url('../../assets/img/icon-close_nor.png') no-repeat center center;
          &:hover {
            background-image: url('../../assets/img/icon-close_sel.png');
          }
        }
      }
    }
  }
  .entrust-list-price {
    margin: 10px 8px;
    height: 48px;
    background-color: @bbxLineColor;
    h4 {
      font-size: 16px;
      color: @bbxGreen;
      margin-bottom: 0px;
      text-align: center;
      font-weight: 600;
      margin-bottom: -6px;
      &.red {
        color: @bbxRed;
      }
      span {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: text-top;
        background: url("../../assets/img/up.png")
      }
      &.red span{
        background: url("../../assets/img/down.png")
      }
    }
    p {
      margin-bottom: 0px;
      font-size: 12px;
      color: @bbxGray;
    }
    .warning {
      margin: 2px 0 0 10px;
      span{
        display: inline-block;
        margin-right: 3px;
        width: 4px;
        height: 10px;
        background-color: #4F5D7C;
        border-radius: 1px;
        &.active {
          &:nth-child(1) {
            background-color: #319e5c;
          }
           &:nth-child(2) {
            background-color: #319E39;
          }
           &:nth-child(3) {
            background-color: #5b9e31;
          }
           &:nth-child(4) {
            background-color: #adb941;
          }
           &:nth-child(5) {
            background-color: #bb763c;
          }
        }
      }
    }
  }
  .background {
    position: relative;
    .item_bg {
      position: absolute;
      right: 0;
      height: 19px;
      width: 100%;
      background-color: rgba(49, 158, 92, .1);
    }
    &.red {
      .item_bg {
        background-color: rgba(184, 58, 58, .1);
      }
    }
    .item_hover {
      position: absolute;
      right: 0;
      height: 19px;
      width: 100%;
    }
  }
}
.price {
  div,a {
    color: @acountTextColor2;
  }
}
@keyframes changeColor_red {
  0% {
    background-color: rgba(184, 58, 58, 0);
  }
  50% {
    background-color: rgba(184, 58, 58, .3);
  }
  100% {
    background-color: rgba(184, 58, 58, 0);
  }
}
@keyframes changeColor_green {
  0% {
    background-color: rgba(49, 158, 92, 0);
  }
  50% {
    background-color: rgba(49, 158, 92, .3);
  }
  100% {
    background-color: rgba(49, 158, 92, 0);
  }
}
</style>
