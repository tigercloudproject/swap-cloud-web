<template>
      <div ref="dt" class="record-list-data">
        <table >
          <thead>
              <tr>
               <th class="width-560">{{ $t('common.table.contract') }}</th>
               <th>{{ $t('common.table.direction') }}</th>
               <th class="width-750">{{ $t('common.table.quantity') }}</th>
               <th>{{ $t('common.table.dealQuantity') }}</th>
               <th class="width-750">{{ $t('common.table.entrustPrice') }}</th>
               <th>{{ $t('common.table.averagePrice') }}</th>
               <th>{{ $t('common.table.entrustedValue', {name: com.marginUnit}) }}</th>
               <th class="width-750">{{ $t('common.table.type') }}</th>
               <th>{{ $t('common.table.status') }}</th>
               <th class="width-750">{{ $t('common.table.source') }}</th>
               <th class="width-750" style="width: 150px;">{{ $t('common.table.time') }}</th>
               <th>{{ $t('common.table.options') }}</th>
              </tr>
            </thead>
            <tbody class="current-entrust">
                  <tr :key="item.order_id" v-for="item in list">
                    <td class="width-560 btn" style="cursor: pointer;" @click="IdCopy(item.order_id)" :title="'ID:' + item.order_id + $t('common.table.clickCopy')"><st-row align="center"><i :class="~[1, 2].indexOf(item.way) ? 'green' : 'red'"></i> <span>{{ productInfo.contract.name }}</span></st-row></td>
                    <td>{{ $t(`common.positions_${item.way}`) }}</td>
                    <td class="width-750">{{ item.vol }}</td>
                    <td>{{ item.done_vol }}</td>
                    <td class="width-750" v-if="isBlowing(item.category, item.make_fee) || getType(item.category) === 2">--</td>
                    <td class="width-750" v-else>{{ item.price|retainDecimals({decimal: com.priceUnit}) }}</td>
                    <td v-if="isBlowing(item.category, item.make_fee)">--</td>
                    <td v-else>{{ item.done_avg_price|retainDecimals({decimal: com.priceUnit}) }}</td>
                    <td>{{ getPositionsValue(item.done_vol, item.done_avg_price)|retainDecimals({decimal: com.valueUnit}) }}</td>
                    <td class="width-750">{{ $t(`common.priceType_${getType(item.category)}`) }}</td>
                    <td>
                    <st-row align="center">
                    <span>{{ item.errno ? $t(`common.orderCancelT${item.errno === 1 ? (item.done_vol === '0' ? 1 : 4) : (item.done_vol === '0' ? 2 : 3)}`) : $t(`common.orderStatus${item.status}`)}}</span>
                    <div v-if="item.errno && item.errno !== 1" class="hint-father hover">
                      <i style="margin-left: 4px;" class="iconfont icon-wenhao"></i>
                      <div class="hint">
                        <p>{{ $t(`common.orderCancel${item.errno}`) }}</p>
                      </div>
                    </div>
                    </st-row>
                    </td>
                    <td class="width-750" v-if="item.origin">{{ $t(`common.table.${~item.origin.indexOf('PLAN') ? 'PLAN' : item.origin}`) }} </td>
                    <td class="width-750" v-if="!item.origin"></td>
                    <td class="width-750">
                        {{ item.created_at|timeFormat }}
                        <!-- <p>2018/03/08</p>
                        <p>12:30:55</p> -->
                    </td>
                    <td class="options">
                      <a v-if="isStrong(item.category, item.make_fee)" @click="showBlowingUpFn(item.order_id, item.way, true)">{{ $t('common.table.minusPositions') }}</a>
                       <a v-else-if="isBlowing(item.category, item.make_fee)" @click="showBlowingUpFn(item.order_id, item.way)">{{ $t('common.table.according') }}</a>
                      <a class="width-750" v-else-if="Number(item.done_vol)" @click="seeShow(item.order_id)">{{$t('common.table.see')}}</a>           
                    </td>
                </tr>
            </tbody>
       </table>
         <st-row direction="column" v-if="!list || !list.length" align="center" class="no-data">
            <img src="../../../assets/img/no-data.png" alt="">
            <p>{{ $t('record.noData') }}</p>
       </st-row>
        <popup :title="isStrongOrBlow ? $t(`common.table.minusPositions`) : $t('record.cp.blowingUp')"  width="320" :callback="blowingUpClose" v-if="showBlowingUp">
            <blowing-up-window :isStrongOrBlow="isStrongOrBlow" :way="way" :orderId="orderId" :close="blowingUpClose"></blowing-up-window>
       </popup>
        <popup :title="$t('common.unEntrust')"   width="600" :callback="seeClose" v-if="showSee">
            <see-window :orderId="orderId" :close="seeClose"></see-window>
       </popup>
      </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import Formula from '../../../assets/js/formula/index.js'
import Popup from '../../bx-ui/popup'
import SeeWindow from './see-window'
import BlowingUpWindow from './blowing-up-window'
export default {
  components: {
    BlowingUpWindow,
    SeeWindow,
    Popup
  },
  data() {
    return {
      list: [],
      offset: 0,
      // 是否已经完成一次请求
      isOk: true,
      showBlowingUp: false,
      showSee: false,
      positionType: '',
      orderId: 0,
      // 自动减仓还是爆仓
      isStrongOrBlow: true
    }
  },
  computed: {
    com() {
      return this.$store.state.com
    },
    token() {
      return this.$store.state.auth.token
    },
    productInfo() {
      return this.$store.state.market.productInfo
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
    // 获取订单的基本类型
    getType(category) {
      return parseInt(category.toString(2).slice(-5), 2)
    },
    // 是否是自动减仓
    isStrong(category, make_fee) {
      let n = Math.pow(2, 9)
      return ((n & category) === n) && Number(make_fee)
    },
    // 是否是爆仓
    isBlowing(category, make_fee) {
      let n = Math.pow(2, 7)
      let m = Math.pow(2, 8)
      let l = Math.pow(2, 9)
      return ((n & category) === n) || ((m & category) === m) || (((l & category) === l) && !Number(make_fee))
    },
    blowingUpClose() {
      this.showBlowingUp = false
    },
    seeClose() {
      this.showSee = false
    },
    seeShow(orderId) {
      this.orderId = orderId
      this.showSee = true
    },
    getList() {
      this.swapsApi.getUserOrders(this.productInfo.contract.contract_id, 4, this.offset, 10).then(res => {
        if (res.data.orders && res.data.orders.length) {
          this.isOk = res.data.orders.length === 10
          this.list = [...this.list, ...res.data.orders]
        } else {
          this.isOk = false
        }
      })
    },
    getPositionsValue(vol, price) {
      return Formula.CalculateContractValue(vol, price, Formula.contractObj.getContract(this.productInfo.contract))
    },
    showBlowingUpFn(orderId, way, bl) {
      this.isStrongOrBlow = bl
      this.orderId = orderId
      this.way = way
      this.showBlowingUp = true
    }
  },
  mounted() {
    if (this.token) {
      this.getList()
      this.$refs.dt.onscroll = (e) => {
        if (this.isOk && e.target.scrollHeight > e.target.offsetHeight && e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight < 20) {
          this.isOk = false
          this.offset += 10
          this.getList()
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../bx-ui/font/iconfont.css";
@import "./list";
.record-list-data .current-entrust {
   tr {
       height: 50px;
       td {
           p {
               text-align: center;
           }
       }
        .options {
            width: 70px;
          a {
            display: block;
            margin: 0 auto;
            text-align: center;
            width: 60px;
            height: 20px;
            line-height: 18px;
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
</style>
