<template>
      <div class="record-list-data">
        <table >
          <thead>
              <tr>
               <th class="width-560" style="width: 150px;">{{ $t('common.table.contract') }}</th>
               <th>{{ $t('common.table.direction') }}</th>
               <th>{{ $t('common.table.setPrice') }}</th>
               <th>{{ $t('common.table.entrustPrice') }}</th>
               <th>{{ $t('common.table.status') }}</th>
               <th class="width-750" style="width: 150px;">{{ $t('common.table.endTime') }}</th>
               <th>{{ $t('common.table.options') }}</th>
              </tr>
            </thead>
            <tbody class="current-entrust">
                  <tr :key="item.order_id" v-for="item in list">
                    <td class="width-560 btn" style="cursor: pointer;" @click="IdCopy(item.order_id)" :title="'ID:' + item.order_id + $t('common.table.clickCopy')"><st-row align="center"><i :class="~[1, 2].indexOf(item.way) ? 'green' : 'red'"></i> <span>{{ productInfo.contract.name }}</span></st-row></td>
                    <td>{{ $t(`common.positions_${item.way}`) }}</td>
                    <td>{{ item.price }}</td>
                     <td>{{ item.executive_price }}</td>
                    <td>{{ $t(`common.table.planStatus_${item.status}`) }}</td>
                    <td class="width-750">
                      {{new Date(item.created_at).getTime() + item.life_cycle * time|timeFormat}}
                    </td>
                    <td class="options">
                        <a @click="cancelOrders(item.order_id)">{{ $t('common.table.cancel') }}</a>
                    </td>
                </tr>
                  <!-- <tr>
                    <td><st-row align="center"><i class="red"></i> <span>XBTUSD</span></st-row></td>
                    <td>平仓开多</td>
                    <td>-1,000,000</td>
                    <td>10,000</td>
                    <td>10,000</td>
                    <td>1,000,00</td>
                    <td>100.0000</td>
                    <td>限价</td>
                    <td>安卓</td>
                    <td>
                        <p>2018/03/08</p>
                        <p>12:30:55</p>
                    </td>
                    <td class="options">
                        <a class="green" href="">{{ $t('common.table.cancel') }}</a>
                    </td>
                </tr> -->
            </tbody>
       </table>
          <st-row direction="column" v-if="!list || !list.length" align="center" class="no-data">
            <img src="../../../assets/img/no-data.png" alt="">
            <p>{{ $t('record.noData') }}</p>
       </st-row>
      </div>
</template>
<script>
import ClipboardJS from 'clipboard'
export default {
  data() {
    return {
      offset: 0,
      list: [],
      time: 3600 * 1000
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
    com() {
      return this.$store.state.com
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
      this.swapsApi.userPlanOrders(this.productInfo.contract.contract_id, this.offset, 3)
      .then(res => {
        this.list = res.data.orders
      })
    },
    confirmEntrustClose() {
      this.showConfirmEntrust = false
    },
    unwindClose() {
      this.showUnwind = false
    },
    cancelOrders(order_id) {
      let nonce = parseInt(Date.now() / 1000)
      this.swapsApi.cancelPlanOrders({orders: [{contract_id: this.productInfo.contract.contract_id, orders: [order_id]}], nonce})
      .then(res => {
        if (res.errno === 'OK') {
          this.getList()
          this.$alert('s', this.$t('common.cancelSuccess'))
        }
      })
    }
  },
  mounted() {
    if (this.token) {
      this.getList()
    }
  }
  // created() {
  //   console.log(this.curryEntrustList)
  // }
}
</script>

<style lang="less" scoped>
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
