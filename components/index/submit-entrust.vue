<template>
    <div class='submit-entrust'>
        <st-row class="submit-entrust-title" justify="between" align="center">
          <h3 >{{ $t('submitEntrust.submitEntrust') }}</h3>
          <st-row v-show="way" class="leverage">
            <div class="hint-father hover">
              <p>{{ $t('submitEntrust.leverage') }}</p>
               <div class="hint">
                   <p>{{ $t('submitEntrust.leverageHover') }}</p>
               </div>
            </div>
            <div class="leverage-sel">
              <div class="Sel-mask" v-if="leverageShow" @click="leverageShow = false"></div>
                 <span class="Sel-name"  @click="way && (leverageShow = !leverageShow)">
                   <span>{{ leverageInfo.name === 'allCabin' ? $t('submitEntrust.allCabin') : leverageInfo.name}}</span>
                 </span>
                 <ul class="Sel-list" v-if="leverageShow">
                    <li  :key="item.name" v-for="item in leverageList" :class="item.name === leverageInfo.name ? 'active' : '' " @click="changeLeverage(item.name)">
                       {{ item.name === 'allCabin' ? $t('submitEntrust.allCabin') : item.name}}
                    </li>
                 </ul>
            </div>
          </st-row>
       </st-row>
       <div class='submit-entrust-content'>
          <st-row justify="between" class='submit-entrust-content-storehouse'><a :class="{active: way}" @click="changWay(true)">{{ $t('submitEntrust.open') }}</a><span></span><a :class="{active: !way}"  @click="changWay(false)">{{ $t('submitEntrust.unwind') }}</a></st-row>
          <st-row justify="between" align="center" class="submit-entrust-content-entrust-type">
            <p>{{ $t('submitEntrust.entrustType') }}</p>
              <div class="leverage-sel">
              <div class="Sel-mask" v-if="entrusTypeShow" @click="entrusTypeShow = false"></div>
                 <span class="Sel-name" @click="entrusTypeShow = !entrusTypeShow">
                   <span>{{ $t(`submitEntrust.price${entrusTypeId}`) }}</span>
                 </span>
                 <ul class="Sel-list" v-if="entrusTypeShow">
                    <li  :key="item" v-for="item in entrusTypeList" :class="item === entrusTypeId ? 'active' : '' " @click="changeEntrusType(item)">
                       <!-- {{item.name}} -->
                       {{ $t(`submitEntrust.price${item}`) }}
                    </li>
                 </ul>
            </div>
          </st-row>
          <!-- 计划委托 -->
          <div v-if="entrusTypeId === 3"  class="submit-entrust-content-input plan">
            <st-row justify="between">
              <p>{{ $t('submitEntrust.marketSet') + $t('newsDeal.price') }}</p>
              <div>
                <input maxlength="16" @input="triggerPriceChange" v-model="triggerPrice" type="text">
                <span>{{productInfo.contract.quote_coin}}</span>
              </div>
            </st-row>
            <st-row justify="between">
              <p>{{ $t('submitEntrust.strategy_' + planInfo.strategyValue) }}</p>
              <div class="marketPrice" v-if="planInfo.strategyValue === 2">{{ $t('submitEntrust.marketPrice') }}</div>
              <div v-else>
                <input maxlength="16" @input="priceChange" v-model="price" type="text">
                <span>{{productInfo.contract.quote_coin}}</span>
              </div>
            </st-row>
            <st-row justify="between">
              <p>{{ $t('submitEntrust.performNumber') }}</p>
              <div>
                <input maxlength="16" @input="volChange" v-model="vol" type="text">
                <span>{{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }}</span>
              </div>
            </st-row>
          <p>≈ {{openValue(!this.coinUnit)|addCommom(6) }}  {{(coinUnit ? productInfo.contract.base_coin : $t('common.pieces'))}}</p>
            <st-row class="set" justify="end">
              <a @click="planSetShow = true"><span></span>{{ $t('submitEntrust.set') }}</a>
            </st-row>
          </div>
          <!-- 普通委托 -->
          <div v-else class="submit-entrust-content-input">
            <st-row justify="between">
              <p>{{ $t('submitEntrust.price') }}</p>
              <div class="marketPrice" v-if="entrusTypeId === 2">{{ $t('submitEntrust.curryMarket') }}</div>
              <div v-else>
                <input maxlength="16" @input="priceChange" v-model="price" type="text">
                <span>{{productInfo.contract.quote_coin}}</span>
              </div>
            </st-row>
            <st-row justify="between">
              <p>{{ $t('submitEntrust.positions') }}</p>
              <div>
                <input maxlength="16" @input="volChange" v-model="vol" type="text">
                <span>{{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }}</span>
              </div>
            </st-row>
          <p>≈ {{openValue(!this.coinUnit)|addCommom(6) }}  {{(coinUnit ? productInfo.contract.base_coin : $t('common.pieces'))}}</p>
          </div>
          <!-- 开仓 -->
          <div v-if="way" class="submit-entrust-content-button">
            <a @click="openWindow(true)">
              <st-row justify="between">
                <span>{{ $t('submitEntrust.buy') }}</span><span>{{ $t('submitEntrust.seeRose') }}</span>
              </st-row>
            </a>
            <st-row justify="between"><p>{{ $t('submitEntrust.margin') }}: <span>{{ openPositionsCost(true)|addCommom }} {{ com.marginUnit }}</span></p><p class="cus" @click="setSumVol(CalculateVolume(true, coinUnit))">{{ $t('submitEntrust.onOpen') }}: <span>{{ CalculateVolume(true, coinUnit)|addCommom(coinUnit ? 0 : com.valueUnit) }} {{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }}</span></p></st-row>
             <a @click="openWindow(false)" class="red">
              <st-row justify="between">
                <span>{{ $t('submitEntrust.sell') }}</span><span>{{ $t('submitEntrust.sellFall') }}</span>
              </st-row>
            </a>
            <st-row justify="between"><p>{{ $t('submitEntrust.margin') }}: <span>{{ openPositionsCost()|addCommom }} {{ com.marginUnit }}</span></p><p class="cus" @click="setSumVol(CalculateVolume(false, coinUnit))">{{ $t('submitEntrust.onOpen') }}: <span>{{  CalculateVolume(false, coinUnit)|addCommom(coinUnit ? 0 : com.valueUnit) }} {{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }}</span></p></st-row>
          </div>
          <!-- 开仓 -->
          <!-- 平仓 -->
         <div v-else class="submit-entrust-content-button">
            <a @click="openWindow(false)">
              <st-row justify="center">
                <span>{{ $t('submitEntrust.buyClose') }}</span>
              </st-row>
            </a>
            <st-row justify="between"><p>{{ $t('submitEntrust.sortClose') }}: <span>{{ (coinUnit ? getCanPositionVol() : changUnitGetVol(getCanPositionVol())) | addCommom(coinUnit ? 0 : com.valueUnit) }}  {{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }}</span></p><p class="cus" @click="setSumVol(coinUnit ? getCanClosePositionVol() : changUnitGetVol(getCanClosePositionVol()))">{{ $t('submitEntrust.canClose') }}: <span>{{ (coinUnit ? getCanClosePositionVol() : changUnitGetVol(getCanClosePositionVol()))|addCommom(coinUnit ? 0 : com.valueUnit) }} {{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }}</span></p></st-row>
             <a @click="openWindow(true)" class="red">
              <st-row justify="center">
                <span>{{ $t('submitEntrust.sellClose') }}</span>
              </st-row>
            </a>
            <st-row justify="between"><p>{{ $t('submitEntrust.longClose') }}: <span>{{ coinUnit ? getCanPositionVol(true) : changUnitGetVol(getCanPositionVol(true)) | addCommom(coinUnit ? 0 : com.valueUnit) }}  {{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }}</span></p><p class="cus" @click="setSumVol(coinUnit ? getCanClosePositionVol(true) : changUnitGetVol(getCanClosePositionVol(true)))">{{ $t('submitEntrust.canClose') }}: <span>{{ coinUnit ? getCanClosePositionVol(true) : changUnitGetVol(getCanClosePositionVol(true))|addCommom(coinUnit ? 0 : com.valueUnit) }} {{ coinUnit ? $t('common.pieces') : productInfo.contract.base_coin }}</span></p></st-row>
          </div>
          <!-- 平仓 -->
          <st-row align="center" justify="between" class="submit-entrust-content-balance">
            <div class="hint-father hover">
              <p>{{ $t('submitEntrust.balance') }}</p>
               <div class="hint">
                   <p>{{ $t('submitEntrust.balanceHover') }}</p>
               </div>
            </div>
            <h6>{{ com.haveAssert| addCommom(com.valueUnit) }} {{ com.marginUnit }}</h6>
          </st-row>
          <st-row class="submit-entrust-content-money" justify="end">
            <a @click="transferShowFn"><i></i>{{ $t('submitEntrust.money') }}</a>
          </st-row>
       </div>
        <popup :title="$t('submitEntrust.confirmYouEntrust')"  width="440" :callback="confirmEntrustClose" v-if="showConfirmEntrust">
            <confirm-entrust-window :info="info" @submitOrder="submitOrder" :close="confirmEntrustClose"></confirm-entrust-window>
       </popup>
        <popup :title="$t('common.unEntrust')"   width="440" :callback="unwindClose" v-if="showUnwind">
            <unwind-window :info="info" @submitOrder="submitOrder" :close="unwindClose"></unwind-window>
       </popup>
        <popup :title="$t('submitEntrust.money')"  width="600" :callback="transferClose" v-if="transferShow">
           <transfer-window :close="transferClose"></transfer-window>
       </popup>
        <popup :title="$t('submitEntrust.planSet')"  width="440" :callback="planSetClose" v-if="planSetShow">
           <set-plan-window @changePlan="changePlan" :close="planSetClose"></set-plan-window>
       </popup>
        <popup :title="deviation ? $t('submitEntrust.max') : $t('submitEntrust.min')"  width="440" :callback="deviationClose" v-if="deviationShow">
           <confirm-plan-window @submitOrder="submitPlanOrder" :deviation="deviation" :close="deviationClose"></confirm-plan-window>
       </popup>
    </div>
</template>
<script>
  import Popup from '../bx-ui/popup'
  import ConfirmEntrustWindow from './record-list-cp/confirm-entrust-window'
  import UnwindWindow from './record-list-cp/unwind-window'
  import TransferWindow from './submit-entrust-cp/transfer-window'
  import Utils from '../../assets/js/util.js'
  import Formula from '../../assets/js/formula/index.js'
  import ApiConfig from '../../config/api.config'
  import SetPlanWindow from './submit-entrust-cp/set-plan-window'
  import ConfirmPlanWindow from './submit-entrust-cp/confirm-plan-window'
  export default {
    name: 'submit-entrust',
    components: {
      Popup,
      ConfirmEntrustWindow,
      UnwindWindow,
      TransferWindow,
      SetPlanWindow,
      ConfirmPlanWindow
    },
    data() {
      let list = [
        {name: 'allCabin', value: 100},
        {name: '100x', value: 100},
        {name: '50x', value: 50},
        {name: '20x', value: 20},
        {name: '10x', value: 10}
      ]
      return {
        showConfirmEntrust: false, // 开仓弹窗
        showUnwind: false, // 平仓弹窗
        way: true, // true 开仓 false 平仓
        leverageInfo: null,
        leverageShow: false,
        leverageListSource: list,
        leverageList: list,
        entrusTypeId: 1,
        entrusTypeShow: false,
        entrusTypeList: [1, 2, 3],
        transferShow: false,
        planSetShow: false,
        price: '',
        vol: '',
        MarginCoin: Formula.MarginCoin,
        info: {},
        // 计划委托偏差， true为过大
        deviation: false,
        deviationShow: false,
        // 触发价
        triggerPrice: '',
        // 价格方向,1:看涨,2:看跌
        price_way: '',
        planInfo: {
          priceTypeValue: 1,
          strategyValue: 1,
          timeListValue: 24
        },
        // 多或者空，true为多
        options: true
      }
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      },
      token() {
        return this.$store.state.auth.token
      },
      com() {
        return this.$store.state.com
      },
      cabinList() {
        return this.$store.state.market.cabinList
      },
      ticker() {
        return this.$store.state.market.ticker
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      coinUnit() {
        return this.$store.state.market.coinUnit
      },
      accounts() {
        return this.$store.state.auth.accounts || {}
      },
      setPrice() {
        return this.$store.state.market.price
      },
      setVol() {
        return this.$store.state.market.vol
      }
    },
    watch: {
      productInfo() {
        this.editLeverage()
      },
      setPrice() {
        if (this.setPrice && this.isPrice()) {
          this.price = this.setPrice
          this.$store.commit('market/SET_MARKET', {
            key: 'price',
            data: 0
          })
        }
      },
      setVol() {
        if (this.setVol) {
          this.vol = this.setVol
          this.$store.commit('market/SET_MARKET', {
            key: 'vol',
            data: 0
          })
        }
      },
      coinUnit() {
        this.changeInit()
      }
    },
    methods: {
      changePlan(info) {
        this.planInfo = info
      },
      deviationClose() {
        this.deviationShow = false
      },
      planSetClose() {
        this.planSetShow = false
      },
      // 修改杠杆
      editLeverage() {
        if (!this.productInfo.contract.max_leverage) {
          return false
        }
        this.leverageList = this.leverageListSource.filter(item => {
          return (!~item.name.indexOf('x')) || item.value <= Number(this.productInfo.contract.max_leverage)
        })
        this.leverageList[0].value = this.leverageList[1].value
        this.leverageInfo = this.leverageList[0]
        this.$store.commit('com/SET_COMMON', {
          leverageList: this.leverageList.map(item => {
            return {name: item.name, value: item.value}
          })
        })
      },
      // 资金划转
      transferShowFn() {
        if (this.token) {
          this.transferShow = true
        } else {
          window.location.href = `${ApiConfig.mainDomain}/login?path=${escape(window.location.href)}&lang=${this.locale}`
        }
      },
      // // 给数字加逗号
      // addCommom(num, len) {
      //   console.log(num, len)
      //   return Utils.addCommom(num, len)
      // },
      // 设置数量
      setSumVol(vol) {
        vol = this.coinUnit ? vol : Utils.retainDecimals(vol, {decimal: this.com.valueUnit})
        this.vol = Number(vol) || ''
      },
      // 开仓弹窗
      confirmEntrustClose() {
        this.showConfirmEntrust = false
      },
      // 平仓弹窗
      unwindClose() {
        this.showUnwind = false
      },
      // 判断是否是限价
      isPrice() {
        return this.entrusTypeId === 1
      },
      // 平仓和开仓切换
      changWay(bl) {
        this.way = bl
        // this.changeInit()
      },
      changeLeverage(name) {
        this.leverageShow = false
        this.leverageInfo = this.leverageList.filter(item => { return item.name === name })[0]
        window.localStorage.setItem('leverage', name)
        // this.changeInit()
      },
      changeEntrusType(value) {
        this.entrusTypeShow = false
        this.entrusTypeId = value
        this.price = ''
        this.$store.commit('com/SET_COMMON', {
          isPlan: Number(value) === 3
        })
        // setTimeout(() => {
        //   this.$emit('move')
        // }, 50)
        // this.changeInit()
      },
      transferClose() {
        this.transferShow = false
      },
      // 获取开仓类型：全仓或逐仓
      openType() {
        return this.leverageInfo.name !== 'allCabin' ? 1 : 2 // 1:逐仓,2:全仓
      },
      // 打开弹窗
      openWindow(longOrSort) {
        this.options = longOrSort
        if (!this.validation(longOrSort)) {
          return false
        }
        // 处理计划委托
        if (this.entrusTypeId === 3) {
          switch (this.planInfo.priceTypeValue) {
            case 1:
              this.price_way = this.ticker.last_price
              break
            case 2:
              this.price_way = this.ticker.fair_price
              break
            case 4:
              this.price_way = this.ticker.index_price
              break
          }
          if (Math.abs(this.triggerPrice - this.price_way) < Number(this.productInfo.plan_order_config.min_scope)) {
            this.deviationShow = true
          } else {
            this.submitPlanOrder()
          }
          return false
        }
        // 记住用户是否设置了不再显示弹窗的用户偏好
        let isConfirm = window.localStorage['isConfirm']
        if (isConfirm === '1') {
          this.submitOrder(longOrSort)
        } else {
          let vol = this.getVol()
          this.info.vol = vol
          this.info.price = this.price
          this.info.category = this.entrusTypeId
          this.info.longOrSort = longOrSort
          if (this.way) {
            this.showConfirmEntrust = true
            this.info.way = longOrSort ? 1 : 4
            this.info.leverageName = this.leverageInfo.name
            this.info.leverage = this.leverageInfo.value
            this.info.jz = (this.coinUnit ? Utils.addCommom(this.openValue(false), this.com.valueUnit) : this.vol) + ' ' + this.productInfo.contract.base_coin
            this.info.cb = this.openPositionsCost(longOrSort) + ' ' + this.com.marginUnit
            this.info.ye = Utils.addCommom(this.com.haveAssert, this.com.priceUnit) + ' ' + this.accounts.coin_code
            this.info.size = Number(this.getCanPositionVol(longOrSort)) + Number(vol)
          } else {
            this.showUnwind = true
            this.info.way = longOrSort ? 3 : 2
          }
        }
      },
      // 获取张数
      getVol() {
        return this.coinUnit ? this.vol : Formula.CalculateContractBasicValue(this.vol, this.getPrice(), Formula.contractObj.getContract(this.productInfo.contract), true)
      },
      // 提交计划委托
      submitPlanOrder() {
        let obj = {}
        obj.nonce = parseInt(Date.now() / 1000)
        obj.contract_id = this.productInfo.contract.contract_id
        obj.category = this.planInfo.strategyValue
        obj.leverage = Number(this.leverageInfo.value)
        obj.price_type = this.planInfo.priceTypeValue
        // 价格方向,1:看涨,2:看跌
        obj.price_way = this.price_way < this.triggerPrice ? 1 : 2

        if (this.planInfo.strategyValue === 1) {
          obj.executive_price = this.price
        }
        obj.price = this.triggerPrice
        obj.vol = this.getVol()
        obj.life_cycle = this.planInfo.timeListValue
        if (this.way) {
          obj.way = this.options ? 1 : 4
          obj.open_type = this.openType()
        } else {
          obj.way = this.options ? 3 : 2
        }

        this.swapsApi.submitPlanOrder(obj).then(res => {
          if (res.errno === 'OK') {
            this.changeInit()
            this.$alert('s', this.$t('submitEntrust.message.a7'))
          }
        })
      },
      // 提交订单
      // longOrSort true 多 false 空
      submitOrder(longOrSort) {
        // category 订单类型 1:限价单,2:市价单
        // way 订单方向 1:开多,2:平空,3:平多,4:开空
        // open_type 开仓方式 1:逐仓,2:全仓
        let obj = {}
        obj.nonce = parseInt(Date.now() / 1000) // new Date().valueOf() + '000'
        obj.contract_id = this.productInfo.contract.contract_id
        // way 订单方向 1:开多,2:平空,3:平多,4:开空
        if (this.way) {
          obj.way = longOrSort ? 1 : 4
          obj.open_type = this.openType()
          obj.leverage = Number(this.leverageInfo.value)
        } else {
          obj.way = longOrSort ? 3 : 2
          obj.position_id = this.positionFn(longOrSort).position_id
        }
        obj.category = this.entrusTypeId
        obj.vol = this.getVol()
        if (this.entrusTypeId === 1 && this.isPrice()) {
          obj.price = this.price
        }
        this.way ? this.confirmEntrustClose() : this.unwindClose()
        this.swapsApi.submitOrder(obj).then(res => {
          if (res.errno === 'OK') {
            this.changeInit()
            this.$alert('s', this.$t('submitEntrust.message.a7'))
          }
        })
      },
      // 价格改变事件
      priceChange() {
        this.price = Utils.retainDecimals(this.price, {integer: 8, decimal: this.com.priceUnit - 1}) || ''
      },
      // 触发价改变事件
      triggerPriceChange() {
        this.triggerPrice = Utils.retainDecimals(this.triggerPrice, {integer: 8, decimal: this.com.priceUnit - 1}) || ''
      },
      // 量改变事件
      volChange() {
        let vol_unit = this.coinUnit ? 0 : this.com.valueUnit
        this.vol = Utils.retainDecimals(this.vol, {integer: 8, decimal: vol_unit}) || ''
      },
      // 仓位价值
      openValue(coinUnit) {
        let value = 0
        if (this.vol) {
          value = this.changUnitGetVol(this.vol, coinUnit)
        }
        return value
      },
      // 张和base_coin单位的切换
      changUnitGetVol(vol, coinUnit) {
        let ut = this.coinUnit
        if (typeof coinUnit === 'boolean') {
          ut = coinUnit
        }
        return Formula.CalculateContractBasicValue(vol, this.getPrice(), Formula.contractObj.getContract(this.productInfo.contract), ut)
      },
      // 开仓成本
      openPositionsCost(longOrSort) {
        let Price = this.price || this.ticker.fair_price
        if (!this.vol || !Price) {
          return 0
        }
        let vol = this.getVol()
        let order = {Vol: Number(vol), Price: Number(Price), Leverage: this.leverageInfo.value, TakeFeeRatio: this.productInfo.fee_config.taker_fee}
        let cb = Formula.CalculateAdvanceOpenCost(order, this.positionFn(longOrSort), this.openOrderSizeFn(longOrSort), Formula.contractObj.getContract(this.productInfo.contract), Formula.contractObj.getRiskLimit(this.productInfo.risk_limit), longOrSort)
        return Utils.retainDecimals(cb, {integer: 12, decimal: this.com.valueUnit})
      },
      // 获取单一方向的仓位
      positionFn(longOrSort) {
        let position
        if (!this.token || !this.cabinList) {
          return position
        }
        position = this.cabinList.filter(item => {
          return item.position_type === (longOrSort ? 1 : 2) // 仓位类型,1:开多,2:开空
        })[0]
        if (position) {
          position = {HoldVol: position.hold_vol, HoldAvgPrice: position.hold_avg_price, position_id: position.position_id, FreezeVol: position.freeze_vol}
        }
        return position
      },
      // 获取单一方向的委托
      openOrderSizeFn(longOrSort) {
        let openOrderSize
        if (!this.token) {
          return openOrderSize
        }
        // 只算委托中开多或开空单一方向
        let that = this.$store.state.market
        let way = longOrSort ? 1 : 4
        let entrustInfo = that.curryEntrustList.filter(item => {
          return item.way === way    // 1:开多,2:平空,3:平多,4:开空
        })
        if (entrustInfo.length) {
          let Vol = 0
          let Amount = 0
          entrustInfo.forEach(item => {
            Amount += item.price * (item.vol - item.done_vol)
            Vol += Number(item.vol)
          })
          openOrderSize = {Amount, Vol}
        }
        return openOrderSize
      },
      // 提交订单验证
      validation(longOrSort) {
        if (!this.token) {
          this.$alert(this.$t('submitEntrust.message.a9'))
          return false
        }
        let isPlan = this.entrusTypeId === 3
        if (!this.vol || (this.isPrice() && !this.price)) {
          this.$alert(this.$t('submitEntrust.message.a1'))
          return false
        }
        if (isPlan && !this.triggerPrice) {
          this.$alert(this.$t('submitEntrust.message.a1'))
          return false
        }
        if (this.way || isPlan) {
          let contract = this.productInfo.contract
          let vol = Number(this.getVol())
          if (Number(contract.max_vol) && vol < Number(contract.min_vol)) {
            this.$alert(this.$t('submitEntrust.message.a2', {minVol: contract.min_vol}))
            return false
          }
          if (Number(contract.max_vol) && vol > Number(contract.max_vol)) {
            this.$alert(this.$t('submitEntrust.message.b5', {maxVol: contract.max_vol}))
            return false
          }
          if (!isPlan) {
            let maxVol = this.CalculateVolume(longOrSort, true)
            if (vol > maxVol) {
              this.$alert(this.$t('submitEntrust.message.a3', { maxVol }))
              return false
            }
            let assert = Number(this.com.haveAssert)
            if (assert <= 0) {
              this.$alert(this.$t('submitEntrust.message.a4'))
              return false
            }
            let positionLiquidatePrice = Formula.CalculateOrderLiquidatePrice(this.getOrder(), assert, this.getContractInfo(), longOrSort)
            if (Formula.IsLiquidate(longOrSort, positionLiquidatePrice, Number(this.ticker.fair_price))) {
              this.$alert(this.$t('submitEntrust.message.a5'))
              return false
            }
          }
        } else {
          if (!this.getCanClosePositionVol(longOrSort)) {
            this.$alert(this.$t('submitEntrust.message.a6'))
            return false
          }
        }
        return true
      },
      // 获取持仓量
      getCanPositionVol(longOrSort) {
        let vol = 0
        let position = this.positionFn(longOrSort)
        if (position && position.HoldVol) {
          vol = position.HoldVol
        }
        return vol
      },
      // 获取可平量 freeze_vol
      getCanClosePositionVol(longOrSort) {
        let vol = 0
        let position = this.positionFn(longOrSort)
        if (position && position.HoldVol) {
          vol = position.HoldVol - position.FreezeVol
        }
        return vol
      },
      // 获取价格
      getPrice() {
        return Number(this.price) || this.ticker.fair_price
      },
      // 获取当前订单信息（验证）
      getOrder() {
        return {
          OpenType: this.leverageInfo.name === 'allCabin',
          Leverage: this.leverageInfo.value,
          Vol: this.vol,
          Price: this.getPrice()
        }
      },
      // 获取用户可用余额
      // getCanAssert() {
      //   let assert = this.accounts.available_vol
      //   let money = this.$store.state.market.longOptions + this.$store.state.market.sortOptions
      //   return money < 0 ? (assert - money) : assert
      // },
      // 获取精度
      gePrecision(value, unit, integer = 8) {
        let _unit = this.com[unit]
        return Utils.retainDecimals(value, {integer, decimal: _unit})
      },
      changeInit() {
        this.price = ''
        this.vol = ''
      },
      // 获取可开张数 bl 为true时求价值
      CalculateVolume(longOrSort, bl) {
        let Price = this.price || this.ticker.fair_price
        if (!this.accounts.available_vol || !Price) {
          return 0
        }
        let contractInfo = this.getContractInfo()
        // 获取可开张数
        let value = Formula.CalculateVolume(Number(this.gePrecision(this.com.haveAssert, 'valueUnit')), this.openOrderSizeFn(longOrSort), this.positionFn(longOrSort), Number(Price), contractInfo, longOrSort, this.leverageInfo.value)
        if (!bl) {
          value = Formula.CalculateContractBasicValue(value, this.getPrice(), Formula.contractObj.getContract(this.productInfo.contract))
          // value = value // Utils.retainDecimals(, {integer: 8, decimal: this.com.volUnit})
        }
        return value
      },
      // 获取合约对象
      getContractInfo() {
        return {
          FeeConfig: {TakerFee: Number(this.productInfo.fee_config.taker_fee)},
          Contract: Formula.contractObj.getContract(this.productInfo.contract),
          RiskLimit: Formula.contractObj.getRiskLimit(this.productInfo.risk_limit)
        }
      }
    },
    created() {
      this.leverageInfo = this.leverageList[0]
      this.entrusTypeId = this.entrusTypeList[0]
    },
    mounted() {
      let leverage = window.localStorage['leverage']
      this.editLeverage()
      if (leverage) {
        this.leverageInfo = this.leverageList.filter(item => {
          return item.name === leverage
        })[0] || this.leverageList[0]
      }
      let planInfo = window.localStorage.getItem('planInfo')
      if (planInfo) {
        this.planInfo = JSON.parse(planInfo)
      }
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.submit-entrust {
  // margin-left: 10px ;
  width: 280px;
  // height: 480px;
  background-color: @bbFooterBackground;
  border-radius: 2px;
  padding-bottom: 18px;
  .submit-entrust-title {
      padding: 0 12px;
      height: 42px;
      font-weight: 300;
      background-color:  rgba(23,26,37, 0.2);
      h3 {
         margin-bottom: 0px;
         color: @bbxGray;
         font-size: 16px;
      }
      .leverage {
        font-size: 14px;
        p {
          margin-right: 2px;
          color: @bbxBlue1;
        }
        .leverage-sel {
          position: relative;
          // padding-right: 20px;
          color: @bbxGray;
          cursor: pointer;
        }
      }
  }
  .submit-entrust-content {
    padding: 16px 10px 0;
    .submit-entrust-content-storehouse {
      span {
        display: block;
        width: 40px;
      }
       a {
          //  width: 126px;
           flex: 1;
           height: 34px;
           color: @bbxWhite;
           background-color: #313A56;
           text-align: center;
           line-height: 34px;
           border-radius: 2px;
          &.active {
             background-color: #1D72C9
           }
       }
    }
    .submit-entrust-content-entrust-type {
      height: 48px;
       p {
          margin-right: 12px;
          color: @bbxBlue1;
        }
        .leverage-sel {
          position: relative;
          // padding-right: 20px;
          color: @bbxGray;
          cursor: pointer;
        }
    }
    .submit-entrust-content-input {
      &>p {
        height: 34px;
        line-height: 34px;
        font-size: 12px;
        color:  @bbxBlue1;
        margin-left: 50px;
      }
      .set>a {
        color: @bbxGray;
        margin-bottom: 10px;
        span {
              display: inline-block;
              width: 22px;
              height: 22px;
              vertical-align: middle;
              background-image: url("../../assets/img/icon-Setup_nor.png");
          }
            &:hover {
                color: #1890ff;
                span {
                  background-image: url("../../assets/img/icon-Setup_sel.png");
                }
              }
      }
      .marketPrice {
        width: 210px;
        height: 34px;
        background-color: #313A56;
        color: @bbxGray;
        text-align: center;
        line-height: 34px;
      }
      &>div {
         &:nth-child(n + 2) {
            margin-top: 15px;
          }
          &.set {
            margin-top: 0;
          }
        p {
          height: 34px;
          line-height: 34px;
          color: @bbxBlue1;
        }
        div {
          position: relative;
          input {
            padding-left: 6px;
            padding-right: 30px;
            width: 210px;
            height: 34px;
            border: 1px solid #3e5983;
            background-color: #253045;
            color:  @bbxBlue1;
            // &:focus {
            //   border-color: #B8D7FF;
            // }
          }
          span {
             position: absolute;
             right: 6px;
             top: 50%;
             margin-top: -9px;
             color: @bbxBlue1;
          }
        }
      }
      &.plan>div {
        div {
          input {
            width: 170px;
          }
        }
        .marketPrice {
          width: 170px;
        }
      }
      &.plan>p {
        margin-left: 90px;
      }
    }
    .submit-entrust-content-button {
      p.cus {
        cursor: pointer;
      }
      &>a {
        display: block;
        padding: 0 16px;
        // width: 260px;
        height: 40px;
        line-height: 40px;
        border-radius: 2px;
        background-color: #319E5C;
        color: @bbxWhite;
        font-size: 16px;
        &:hover {
          background-color: #3CBE69;
        }
        &.red {
          background-color: #B83A3A;
          &:hover {
            background-color: #D54545;
          }
        }
      }
      &>div {
        height: 35px;
        line-height: 35px;
        font-size: 12px;
        p {
          color: @bbxBlue1;
          span {
            color: @bbxGray;
          }
        }
      }
    }
    .submit-entrust-content-balance {
      margin: 3px 0;
      p {
        color: @bbxBlue1;
        font-size: 14px;
      }
      h6 {
        color: @bbxGray;
        font-size: 14px;
      }
    }
    .submit-entrust-content-money {
      margin-top: 10px;
      a {
        i {
          display: inline-block;
          margin-right: 6px;
          width: 16px;
          height: 14px;
          background-image: url("../../assets/img/icon-funds_nor.png");
        }
        &:hover {
            i {
              background-image: url("../../assets/img/icon-funds_sel.png");
            }
        }
      }
    }
  }
}

   .Sel-name{
        position: relative;
        display: inline-block;
        width: 80px;
        padding-right: 20px;
        cursor: pointer;
        text-align: right;
        &::after{
            content: '';
            position: absolute;
            margin-left: 8px;
            top: 50%;
            right: 2px;
            margin-top: -2px;
            display: block;
            border-width:6px 6px 0;
            border-style:solid;
            border-color:#cad2dc transparent transparent;/*灰 透明 透明 */
        }
    }
    .Sel-list {
        display: inline-block;
        position: absolute;
        border: 1px solid #313a56;
        background: #1f2636;
        width: 70px;
        text-align: center;
        right: 50%;
        margin-right: -30px;
        top: 30px;
        font-size: 12px;
        z-index: 1000;
        li {
            height: 30px;
            line-height: 30px;
            cursor: pointer;
            color: #cad2dc;
            &:hover,&.active {
                background: rgba(49,58,86,30.3);
            }
        }
    }
    .Sel-mask {
        position: fixed;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
    }
</style>
