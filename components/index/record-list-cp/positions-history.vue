loss<template>
      <div class="record-list-data">
        <table >
          <thead>
              <tr>
               <th>{{ $t('common.table.contract') }}</th>
               <th style="width: 280px;">{{ $t('record.cp.unwindTime') }}</th>
               <th style="width: 280px;" >
                 <div class="hint-father hover">
                     <p style="text-align: right;"><span>{{ $t('record.cp.onMoney') }}</span></p>
                     <div class="hint">
                       <p>{{ $t('record.cp.onMoneyOne') }}</p>
                     </div>
                 </div>
               </th>
              </tr>
            </thead>
            <tbody class="current-entrust">
                  <tr :key="item.position_id" v-for="item in list">
                    <td class="btn" style="cursor: pointer;" @click="IdCopy(item.position_id)" :title="'ID:' + item.position_id + $t('common.table.clickCopy')">{{ productInfo.contract.name }}</td>
                    <td>{{ item.updated_at|timeFormat }}</td>
                    <!-- <td style="text-align: right;">{{ item.realised_profit|retainDecimals({decimal: com.valueUnit}) }}</td> -->
                    <td style="text-align: right;" class="on-money"><span>{{ item.realised_profit|retainDecimals({decimal: com.valueUnit}) }} </span><i class='fee-q' @click="positionFeeShow(item)"></i></td>
                </tr>
            </tbody>
       </table>
        <st-row direction="column" v-if="!list || !list.length" align="center" class="no-data">
            <img src="../../../assets/img/no-data.png" alt="">
            <p>{{ $t('record.noData') }}</p>
       </st-row>
        <popup :title="'资金费用明细'" width="600" v-if="showPositionFee" :callback="positionFeeColse">
            <position-fee-window :close="positionFeeColse" :contractId="contractId" :positionId="positionId"></position-fee-window>
       </popup>
      </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import Popup from '../../bx-ui/popup'
import positionFeeWindow from './position-fee-window'
export default {
  components: {
    Popup,
    positionFeeWindow
  },
  data() {
    return {
      list: [],
      offset: 0,
      showPositionFee: false,
      contractId: 0,
      positionId: 0
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
    getList() {
      this.swapsApi.getUserPositions(this.productInfo.contract.contract_id, 4, this.offset, 10).then(res => {
        this.list = res.data.positions
      })
    },
    // 打开资金费用明细窗口
    positionFeeShow(item) {
      this.contractId = item.contract_id
      this.positionId = item.position_id
      this.showPositionFee = true
      // console.log('positionFeeShow####', item)
    },
    // 关闭资金费用明细窗口
    positionFeeColse() {
      this.showPositionFee = false
    }
  },
  created() {
    if (this.token) {
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
@import "./list";
.record-list-data {
   tr {
       height: 50px;
      .on-money {
        *{
          vertical-align: middle;
        }
        i {
          display: inline-block;
          vertical-align: sub;
          width: 12px;
          height: 12px;
          background: url('../../../assets/img/icon-Q_nor.png') no-repeat;
          background-size: 100% 100%;
          margin-left: 2px;
          cursor: pointer;
          &:hover {
            background: url('../../../assets/img/icon-Q_sel.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
   }
}
</style>
