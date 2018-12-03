<template>
      <div ref="dt" class="record-list-data">
        <table >
          <thead>
              <tr>
               <th>{{ $t('common.table.contract') }}</th>
               <th>{{ $t('common.table.direction') }}</th>
               <th>{{ $t('common.table.dealQuantity') }}</th>
               <th>{{ $t('common.table.dealPrice') }}</th>
               <th style="text-align: right; width: 180px;">{{ $t('common.table.time') }}</th>
               <!-- <th>{{ $t('common.table.options') }}</th> -->
              </tr>
            </thead>
            <tbody class="current-entrust">
                  <tr :key="index" v-for="(item, index) in list">
                    <td class="btn" style="cursor: pointer;" @click="IdCopy(item.trade_id)"  :title="'ID:' + item.trade_id + $t('common.table.clickCopy')"><st-row align="center"><i :class="~[1, 2].indexOf(item.way) ? 'green' : 'red'"></i> <span>{{ productInfo.contract.name }}</span></st-row></td>
                    <td>{{ $t(`common.positions_${item.way}`) }}</td>
                    <td>{{ item.deal_vol }}</td>
                    <td>{{ item.deal_price }}</td>
                    <td align="right">
                        {{ item.created_at|timeFormat}}
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
                        <a @click="showSee = !showSee">{{ $t('common.table.see') }}</a>
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
    name: 'deal-record',
    components: {
    },
    data() {
      return {
        offset: 0,
        isOk: true,
        list: []
      }
    },
    computed: {
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
        this.swapsApi.userTrades(this.productInfo.contract.contract_id, this.offset, 10)
        .then(res => {
          if (res.data.trades && res.data.trades.length) {
            this.isOk = res.data.trades.length === 10
            this.list = [...this.list, ...res.data.trades]
          } else {
            this.isOk = false
          }
        })
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
