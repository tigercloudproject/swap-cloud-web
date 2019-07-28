
<template>
  <div class="see-window">
     <div class="position-fee-scroll">
        <table>
            <thead>
                <tr>
                    <th>{{$t('record.cp.createTime')}}</th>
                    <th>{{$t('record.cp.charges')}}({{positionCoin}})</th>
                    <th>{{$t('record.cp.positionQsuantity')}}</th>
                    <th>{{$t('record.cp.canPrice')}}({{positionCoin}})</th>
                </tr>
            </thead>
            <tbody v-if="list!==null">
                <tr :key="item.trade_id" v-for="item in list" >
                    <td>
                        {{item.created_at | timeFormat('YMD')}}
                        {{item.created_at | timeFormat('HMS')}}
                        <!-- <p>
                            {{item.created_at | timeFormat('YMD')}}
                        </p> -->
                        <!-- <p>

                        </p> -->
                    </td>
                    <td :class="item.fee>0?'green':'red'">{{item.fee >= 0 ? '+' : ''}}{{item.fee | retainDecimals({decimal: com.valueUnit})}}</td>
                    <!-- <td :class="item.fee>0?'green':'red'">{{item.fee >= 0 ? '+' : ''}}{{item.fee}}</td> -->
                    <td>{{item.vol}}</td>
                    <!-- <td>{{getPositionsValue(item.deal_vol, item.deal_price) |retainDecimals({decimal: com.valueUnit})}}</td> -->
                    <td>{{item.fair_price| retainDecimals({decimal: com.priceUnit})}}</td>
                    <!-- <td>{{item.fair_price}}</td> -->
                </tr>
            </tbody>
        </table>
     </div>

     <div v-if="list===null || list.length<1" class="no-data">
         <span v-if="list!==null && list.length<1">{{$t('record.noData')}}</span>
         <img v-if="list===null" src="../../../assets/img/loadding.gif" alt=""/>
     </div>
     <div class="care">
         {{$t('record.cp.detailsOfFundingFeesCare')}}
     </div>
  </div>
</template>

<script>
//   import Formula from '../../../assets/js/formula/index.js'
  export default {
    name: 'see-window',
    props: ['close', 'contractId', 'positionId', 'positionCoin'],
    data() {
      return {
        isShow: false,
        list: null
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
    //   getPositionsValue(vol, price) {
    //     return Formula.CalculateContractValue(vol, price, Formula.contractObj.getContract(this.productInfo.contract))
    //   },
    //   getList() {
    //     this.swapsApi.orderTrades(this.productInfo.contract.contract_id, this.orderId).then(res => {
    //       this.list = res.data.trades
    //     })
    //   }
      getList() {
        this.swapsApi.positionFee(this.contractId, this.positionId).then(res => {
          this.list = res.data
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


    .no-data {
        width: 100%;
        text-align: center;
        // padding-bottom: 20px;
        color: #313A56;
        height: 290px;
        img {
            width: 50px;
        }
    }
    &::-webkit-scrollbar-thumb:vertical{
      height: 2px;
      background-color: #4D5D8E;
      -webkit-border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb:horizontal{
        width: 2px;
        background-color: #4D5D8E;
        -webkit-border-radius: 2px;
    }
    .position-fee-scroll {
        max-height: 360px;
        overflow: auto;
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
                        padding-right: 10px;
                    }
                    &:first-child {
                        padding-left: 10px;
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
               padding-right: 10px;
            }
            td:first-child {
                padding-left: 10px;
            }
            color: #313A56;
            td.red{
                color: @bbxRed;
            }
            td.green {
                color: @bbxGreen;
            }
        }
        }
    }
    .care{
        color: #5c6a97;
        font-size: 12px;
    }

}
</style>
