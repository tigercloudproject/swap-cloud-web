
<template>
  <div class="see-window">
     <table>
         <thead>
             <tr>
                 <th>{{ $t('record.cp.clinchTime') }}</th>
                 <th>{{ $t('record.cp.clinchPrice') + `(${productInfo.contract.quote_coin})` }}</th>
                 <th>{{ $t('record.cp.clinchNumber') }}</th>
                 <th>{{ $t('record.cp.clinchMoney') + `(${com.marginUnit})` }}</th>
                 <th>{{ $t('record.cp.fee') + `(${com.marginUnit})` }}</th>
             </tr>
         </thead>
         <tbody>
             <tr :key="item.trade_id" v-for="item in list">
                 <td>
                     <p>
                        {{item.created_at|timeFormat('YMD')}}
                     </p>
                     <p>
                      {{item.created_at|timeFormat('HMS')}}
                     </p>
                 </td>
                 <td>{{item.deal_price}}</td>
                 <td>{{item.deal_vol}}</td>
                 <td>{{getPositionsValue(item.deal_vol, item.deal_price) |retainDecimals({decimal: com.valueUnit})}}</td>
                 <td>{{(Number(item.take_fee) ? (item.take_fee) : (-item.make_fee))}}</td>
             </tr>
         </tbody>
     </table>
  </div>
</template>

<script>
  import Formula from '../../../assets/js/formula/index.js'
  export default {
    name: 'see-window',
    props: ['close', 'orderId'],
    data() {
      return {
        isShow: false,
        list: []
      }
    },
    mounted() {
      this.getList()
    },
    computed: {
      com() {
        return this.$store.state.com
      },
      productInfo() {
        return this.$store.state.market.productInfo
      }
    },
    methods: {
      getPositionsValue(vol, price) {
        return Formula.CalculateContractValue(vol, price, Formula.contractObj.getContract(this.productInfo.contract))
      },
      getList() {
        this.swapsApi.orderTrades(this.productInfo.contract.contract_id, this.orderId).then(res => {
          this.list = res.data.trades
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 @import "../../../assets/css/base";
.see-window {
    padding: 0 20px;
    max-height: 390px;
    overflow: auto;
    &::-webkit-scrollbar-thumb:vertical{
      height: 5px;
      background-color: #4D5D8E;
      -webkit-border-radius: 6px;
    }
    table {
        margin-bottom: 20px;
        width: 100%;
        color: #4D5D8E;
        thead {
            height: 50px;
            tr {
                line-height: 50px;
                border-bottom: 1px solid rgba(151,176,214,.5);
                th {
                    font-weight: 300;
                    &:last-child {
                        text-align: right;
                    }
                }
            }
        }
        tbody {
        tr {
            height: 60px;
            border-bottom: 1px solid rgba(151,176,214,.5);
            td:last-child {
               text-align: right;
           }
          color: #313A56;
        }
        }
    }
}
</style>
