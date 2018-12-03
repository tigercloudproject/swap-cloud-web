<template>
      <div class="record-list-data">
        <table >
          <thead>
              <tr>
               <th class="width-560">{{ $t('common.table.contract') }}</th>
               <th class="width-750">{{ $t('common.table.positionQsuantityTwo') }}</th>
               <th class="hint-father hover width-750">
                 <p><span>{{ $t('common.table.positionsPrice', {coinName: coinUnit ? getPositionUnit() : productInfo.contract.base_coin}) }}</span></p>
                 <div class="hint">
                   <p>{{ $t('record.cp.positionsPriceOne') }}</p>
                 </div>
               </th>
               <th  class="hint-father hover width-750">
                 <p><span>{{ $t('common.table.openPrice') }}</span></p>
                 <div class="hint">
                    <p>{{ $t('record.cp.openPriceHover') }}</p>
                 </div>
               </th>
               <th class="hint-father hover">
                 <p><span>{{ $t('common.table.unwindPrice') }}</span></p>
                  <div class="hint">
                   <p>{{ $t('record.cp.unwindPriceOne') }}</p>
                   <p>{{ $t('record.cp.unwindPriceTwo') }}</p>
                   <p>{{ $t('record.cp.unwindPriceThree') }}</p>
                 </div>
               </th>
               <th  class="hint-father hover">
                 <p><span>{{ $t('common.table.margin') }}</span></p>
                 <div class="hint">
                   <p>{{ $t('record.cp.marginHoverOne') }}</p>
                    <p>{{ $t('record.cp.marginHoverTwo') }}</p>
                 </div>
               </th>
               <th class="hint-father hover">
                 <p><span>{{ $t('common.table.rate') }}</span></p>
                 <div class="hint">
                   <p>{{ $t('submitEntrust.message.b1') }}</p>
                 </div>
               </th>
               <th class="width-750">
                  <st-row class="hint-father hover">
                     <p><span>{{ $t('record.cp.onMoney') }}</span></p>
                     <div class="hint" style="right: 0px;">
                       <p>{{ $t('record.cp.onMoneyTwo') }}</p>
                     </div>
                 </st-row>
               </th>
               <th class="width-560">{{ $t('common.table.unwind') }}</th>
              </tr>
            </thead>
            <tbody class="positions" ref="dt">
                  <tr :key="item.position_id" v-for="item in list">
                    <td class="width-560 btn" style="cursor: pointer;" @click="IdCopy(item.position_id)" :title="'ID:' + item.position_id + $t('common.table.clickCopy')">
                      <st-row align="center">
                        <i :class="item.position_type === 1 ? 'green' : 'red'"></i>
                        <p>{{ productInfo.contract.name }}</p>
                      </st-row>
                      <p style="font-size: 11px;color:rgba(151,176,214, 0.7);margin-left: 6px;">{{ $t(`submitEntrust.${item.open_type === 2 ? 'allCabin' : 'partCabin'}`) }}({{$t(`common.position_type_${item.position_type}`)}})</p>
                    </td>
                    <td  class="hover width-750" @click="setVol($event, item.on_vol)">{{ item.on_vol }}/{{ item.hold_vol }}</td>
                    <td class="width-750">{{ (coinUnit || IsReverse()) ? item.positionValue : (item.positionValue / ticker.fair_price)|retainDecimals({decimal: com.valueUnit}) }}</td>
                    <td class="width-750">{{ item.hold_avg_price|retainDecimals({decimal:com.priceUnit}) }}</td>
                    <td >{{ item.liquidatePrice|addCommom(com.priceUnit) }}</td>
                    <td class="margin">
                      <a v-if="item.open_type === 1" @click="showEditMargin(item)"><i></i> {{ item.im|retainDecimals({decimal: com.valueUnit})}}({{ getLeverage(item) }})</a>
                      <template v-else>
                        {{ item.im|retainDecimals({decimal: com.valueUnit})}}({{ getLeverage(item) }})
                      </template>
                    </td>
                    <td :class="item.money < 0 ? 'red' : 'green'">{{ LongOrSort(item.money, item.im) }}</td>
                    <td class="width-750" :class="item.realised_profit < 0 ? 'red' : 'green'">{{ item.realised_profit|retainDecimals({decimal: com.valueUnit}) }}</td>
                    <td class="positions-unwind width-560">
                        <div class="positions-unwind-one">
                            <st-row class="positions-unwind-two" justify="between" align="center">
                                <span>{{ $t('common.table.onePrice') }}</span>
                                <div>
                                    <input class="price" @input="iptChange($event, true)" type="text">
                                    <span>{{productInfo.contract.quote_coin}}</span>
                                </div>
                                <a class="green"  @click="closePosition(item, true, $event)">{{ $t('record.cp.limitPricePosition') }}</a>
                            </st-row>
                             <st-row class="positions-unwind-two" justify="between" align="center">
                                <span>{{ $t('common.table.positionsQsuantity') }}</span>
                                <div>
                                    <input class="vol" @input="iptChange($event)" type="text">
                                    <span>{{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }}</span>
                                </div>
                                <a class="red"  @click="closePosition(item)">{{ $t('common.table.marketPriceUnwind') }}</a>
                            </st-row>
                        </div>
                    </td>
                </tr>
            </tbody>
       </table>
       <st-row direction="column" v-if="!cabinList || !cabinList.length" align="center" class="no-data">
            <img src="../../../assets/img/no-data.png" alt="">
            <p>{{ $t('record.noData') }}</p>
       </st-row>
         <popup :title="$t('common.unEntrust')"   width="440" :callback="unwindClose" v-if="showUnwind">
            <unwind-window :info="info" :isAll="isAll" @submitOrder="submitOrder" :close="unwindClose"></unwind-window>
       </popup>
        <popup :title="$t('record.cp.eidtMargin')"   width="600" :callback="editMarginColse" v-if="showEditMargn">
            <edit-margin-window @getLiquidate="getLiquidate" :info="marginInfo" :close="editMarginColse"></edit-margin-window>
       </popup>
      </div>
</template>
<script>
  import ClipboardJS from 'clipboard'
  import Popup from '../../bx-ui/popup'
  import UnwindWindow from './unwind-window'
  import Utils from '../../../assets/js/util.js'
  import Formula from '../../../assets/js/formula/index.js'
  import EditMarginWindow from './edit-margin-window'
  export default {
    name: 'deal-record',
    components: {
      Popup,
      UnwindWindow,
      EditMarginWindow
    },
    data() {
      return {
        showUnwind: false,
        showEditMargn: false,
        offset: 0,
        info: {},
        isAll: false,
        marginInfo: {},
        list: []
      }
    },
    computed: {
      pnlPriceUnit() {
        return this.$store.state.market.pnlPriceUnit
      },
      setPrice() {
        return this.$store.state.market.priceTwo
      },
      coinUnit() {
        return this.$store.state.market.coinUnit
      },
      com() {
        return this.$store.state.com
      },
      ticker() {
        return this.$store.state.market.ticker
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      cabinList() {
        return this.$store.state.market.cabinList
      },
      liquidateAssertLong() {
        return this.$store.state.com.liquidateAssertLong
      },
      liquidateAssertSort() {
        return this.$store.state.com.liquidateAssertSort
      }
    },
    watch: {
      setPrice() {
        if (this.setPrice) {
          document.querySelectorAll('table input.price').forEach(element => {
            element.value = this.setPrice
          })
          this.$store.commit('market/SET_MARKET', {
            key: 'priceTwo',
            data: 0
          })
        }
      },
      ticker() {
        this.operationCabinList()
      },
      cabinList() {
        this.operationCabinList()
      },
      coinUnit() {
        document.querySelectorAll('table input').forEach(element => {
          element.value = ''
        })
      },
      pnlPriceUnit() {
        this.operationCabinList()
      },
      liquidateAssertLong() {
        this.operationCabinList()
      }
    },
    methods: {
      // 复制id
      IdCopy(id) {
        this.copy = new ClipboardJS('.btn', {
          text: function () {
            return id
          }
        })
        this.$alert('s', this.$t('bonus.copyMessage'))
      },
      // 对仓位的强平价格等进行运算
      operationCabinList() {
        this.list = this.cabinList.map(item => {
          // 计算仓位的未实现盈亏
          item.money = this.ticker.fair_price ? Formula.LongOrSort(item.hold_vol, item.hold_avg_price, this.pnlPriceUnit ? this.ticker.fair_price : this.ticker.last_price, Formula.contractObj.getContract(this.productInfo.contract), item.position_type === 1) : 0
          item.liquidatePrice = this.getLiquidate(item.position_type, item.open_type)
          // 仓位价值
          item.positionValue = this.CalculateContractValue(item.hold_vol, item.hold_avg_price, Formula.contractObj.getContract(this.productInfo.contract))
          item.on_vol = Utils.precision.minus(item.hold_vol, item.freeze_vol)
          return item
        }).sort((a, b) => a.position_type - b.position_type)
      },
      // 修改保证金弹窗关闭
      editMarginColse() {
        this.showEditMargn = false
      },
      // 是否是反向合约
      IsReverse() {
        return Formula.IsReverse(this.productInfo.contract.quote_coin, this.productInfo.contract.price_coin)
      },
      showEditMargin(item) {
        this.marginInfo = item
        this.showEditMargn = true
      },
      iptChange(e, isPrice) {
        e.target.value = Utils.retainDecimals(e.target.value, {integer: 8, decimal: isPrice ? (this.com.priceUnit - 1) : (this.coinUnit ? 0 : this.com.valueUnit)}) || ''
      },
      setVol(e, vol) {
        e.target.parentNode.querySelector('.vol').value = vol
      },
      // 获取张数
      getVol(vol) {
        return this.coinUnit ? vol : Formula.CalculateContractBasicValue(vol, this.ticker.fair_price, Formula.contractObj.getContract(this.productInfo.contract), true)
      },
      unwindClose() {
        this.showUnwind = false
      },
      getPositionUnit() {
        return Formula.MarginCoin(this.productInfo.contract.base_coin, this.productInfo.contract.quote_coin, this.productInfo.contract.price_coin)
      },
      // 算仓位价值
      CalculateContractValue(vol, price) {
        return Formula.CalculateContractValue(vol, price, Formula.contractObj.getContract(this.productInfo.contract))
      },
      // 未实现盈亏
      LongOrSort(money, im) {
        if (!money) {
          return 0
        }
        return `${Utils.retainDecimals(money, {decimal: this.com.valueUnit})}(${Utils.retainDecimals(money / im * 100, {decimal: 2})}%)`
      },
      closePosition(item, type, e) {
        let elements
        if (type) {
          elements = e.target.parentNode.parentNode
          this.info.price = elements.querySelector('.price').value
          this.info.vol = this.getVol(elements.querySelector('.vol').value)
          this.info.category = 1
          // this.showConfirmEntrust = true
        } else {
          this.isAll = true
          this.info.category = 2
          this.info.vol = item.hold_vol - item.freeze_vol
        }
        this.info.contract_id = item.contract_id
        this.info.position_id = item.position_id
        this.info.way = item.position_type // === 1 ? 3 : 2  // 仓位类型,1:开多,2:开空  // way 订单方向 1:开多,2:平空,3:平多,4:开空
        if (!this.validation(this.info)) {
          return false
        }
        // 记住用户是否设置了不再显示弹窗的用户偏好
        let isConfirm = window.localStorage['isConfirm']
        if (isConfirm === '1' && !type) {
          this.submitOrder()
        } else {
          this.showUnwind = true
        }
      },
      submitOrder() {
        this.unwindClose()
        // category 订单类型 1:限价单,2:市价单
        // way 订单方向 1:开多,2:平空,3:平多,4:开空
        // open_type 开仓方式 1:逐仓,2:全仓
        this.info.way = this.info.way === 1 ? 3 : 2
        this.info.nonce = parseInt(Date.now() / 1000) // new Date().valueOf() + '000'
        this.swapsApi.submitOrder(this.info).then(res => {
          if (res.errno === 'OK') {
            this.$store.dispatch('getUserDate', this.info.contract_id)
            this.$alert('s', this.$t('submitEntrust.message.a7'))
          }
        })
      },
      // 获取可平量 freeze_vol
      getCanClosePositionVol(way) {
        let vol = 0
        let position = this.positionFn(way)
        if (position && position.HoldVol) {
          vol = position.HoldVol - position.FreezeVol
        }
        return vol
      },
      // 获取单一方向的仓位
      positionFn(way, addIM) {
        let position
        let that = this.$store.state.market
        position = that.cabinList.filter(item => {
          return item.position_type === way // 仓位类型,1:开多,2:开空
        })[0]
        if (position) {
          position = {HoldVol: position.hold_vol, HoldAvgPrice: position.hold_avg_price, position_id: position.position_id, FreezeVol: position.freeze_vol, IM: Number(position.im) + addIM, MM: Number(position.mm)}
        }
        return position
      },
      // 获取合约对象
      getContractInfo() {
        return {
          FeeConfig: {TakerFee: Number(this.productInfo.fee_config.taker_fee)},
          Contract: Formula.contractObj.getContract(this.productInfo.contract),
          RiskLimit: Formula.contractObj.getRiskLimit(this.productInfo.risk_limit)
        }
      },
      // 计算强评价
      getLiquidate(way, open_type, addIM = 0, info = {liquidatePrice: 0}) {
        info.liquidatePrice = Formula.CalculatePositionLiquidatePrice(this.positionFn(way, addIM), open_type === 1 ? 0 : Number(way === 1 ? this.liquidateAssertLong : this.liquidateAssertSort), this.getContractInfo(), way === 1)
        return info.liquidatePrice
      },
      validation(info) {
        if (info.category === 1 && (!info.vol || !info.price)) {
          this.$alert(this.$t('submitEntrust.message.a1'))
          return false
        }
        if (!this.getCanClosePositionVol(info.way)) {
          this.$alert(this.$t('submitEntrust.message.a8'))
          return false
        }
        return true
      },
      // 获取杠杆
      getLeverage(item) {
        let fm = item.open_type === 2 ? (Number(item.money) > 0 ? (Number(this.com.haveAssert) + Number(item.money)) : Number(this.com.haveAssert)) : Number(item.money)
        fm += Number(item.im)
        return Math.ceil(item.positionValue / fm) + 'x'
      },
      // 动态修改盈利
      editPositions(long, sort) {
        let list = []
        let obj = {
          position_id: 0,
          // 当前持有量
          hold_vol: 0,
          //  冻结量
          freeze_vol: 0,
          // 已平仓量
          close_vol: 0,
          // 开仓均价
          hold_avg_price: 0,
          // 开仓保证金
          im: '1.4096810457344',
          // 维持保证金
          mm: '0.09253671715',
          // 以实现盈亏
          realised_profit: 0,
          // 仓位类型,1:开多,2:开空
          position_type: 1,
          // 开仓方式,1:逐仓,2:全仓
          open_type: 1
        }
        let zj
        if (long) {
          zj = Object.assign({}, obj)
          for (let item in long) {
            zj[item] = long[item]
          }
          let value = this.CalculateContractValue(Number(zj.hold_vol), Number(zj.hold_avg_price))
          zj.realised_profit = value * this.productInfo.fee_config.taker_fee
          let margin = this.marginRate(value)
          zj.im = value * Math.max(margin.initial, 1 / zj.leverage)
          zj.mm = zj.im / 2
          list.push(zj)
        }
        if (sort) {
          zj = Object.assign({}, obj)
          zj.position_id = 1
          for (let item in sort) {
            zj[item] = sort[item]
          }
          zj.position_type = 2
          let value = this.CalculateContractValue(Number(zj.hold_vol), Number(zj.hold_avg_price))
          let margin = this.marginRate(value)
          zj.im = value * Math.max(margin.initial, 1 / zj.leverage)
          zj.realised_profit = value * this.productInfo.fee_config.taker_fee
          zj.mm = zj.im / 2
          list.push(zj)
        }
        this.$store.commit('market/SET_CABINLIST', {
          data: list
        })
        this.operationCabinList()
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
      }
    },
    mounted() {
      this.operationCabinList()
      // 测试
      window.position_test = this.editPositions
    }
  }
</script>
<style lang="less" scoped>
@import "./list";
.record-list-data .positions {
   .margin {
     a {
       color: @bbxGray;
     }
     i {
       display: inline-block;
       vertical-align: sub;
       width: 14px;
       height: 14px;
       background: url('../../../assets/img/icon-adjust_nor.png') no-repeat;
       &:hover {
         background: url('../../../assets/img/icon-adjust_sel.png') no-repeat;
       }
     }
   }
   tr {
       height: 86px;
      .positions-unwind {
           width: 260px;
           .positions-unwind-one {
              margin: 8px 0;
              padding: 0 6px 0 10px;
              width: 260px;
              height: 70px;
              border-left: 1px solid @bbxLineColor;
              .positions-unwind-two {
                  &:last-child {
                      margin-top: 8px;
                  }
                  &>span {
                      width: 48px;
                      color: @bbxBlue1;
                  }
                  div {
                      position: relative;
                      input {
                          padding-left: 6px;
                          padding-right: 30px;
                          height: 30px;
                          width: 120px;
                          border: 1px solid #3e5983;
                          background-color: #253045;
                          color:  @bbxBlue1;
                      }
                      span {
                          position: absolute;
                          right: 6px;
                          top: 50%;
                          margin-top: -9px;
                          color: @bbxGray;
                      }
                  }
                  a {
                      width: 60px;
                      height: 22px;
                      text-align: center;
                      line-height: 20px;
                      &.red {
                        border: 1px solid #F6412B;
                        color: ：#F6412B;
                        &:hover {
                            border: 1px solid #F85644;
                            color: ：#F85644;
                        }
                      }
                      &.green {
                       border: 1px solid #2B93F6;
                       color: #2B93F6;
                       &.hover {
                          border: 1px solid #3C9FFB;
                          color:  #3C9FFB;
                       }
                      }
                      
                  }
              }
           }
      }
   } 
}
</style>
