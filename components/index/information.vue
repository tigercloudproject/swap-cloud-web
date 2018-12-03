<template>
    <div class='information'>
       <st-row class="information-market-title" justify="between" align="center">
          <h3 >{{ $t('information.information') }}</h3>
       <a class="little" target="_blank" :href="`https://support.bbx.com/hc/${locale}/categories/360000757313-%E5%90%88%E7%BA%A6%E4%BA%A4%E6%98%93`">{{ $t('information.little') }}<i></i></a>
       </st-row>
       <ul>
         <li>
           <st-row justify="between" align="center">
                <nuxt-link target="_blank" :to="`/information/index/${productInfo.contract.index_id}`">{{ $t('information.indexSource') }}</nuxt-link>
                <p :title="memberString">{{ memberString }}</p>
           </st-row>
         </li>
         <li>
           <st-row justify="between" align="center">
             <p >
                {{ $t('information.constructorSize') }}
             </p>
             <p>
               {{ productInfo.contract.contract_size + productInfo.contract.price_coin }}
             </p>
           </st-row>
           <!-- <nuxt-link target="_blank" :to="`/information/index/${productInfo.contract.index_id}`">{{ $t('information.trade') }}</nuxt-link> -->
        </li>
         <li>
           <st-row justify="between" align="center">
             <p>
                {{ $t('information.moneyFee') }}
             </p>
             <p>
               {{ ticker.funding_rate * 100 | retainDecimals({decimal: 4}) }}%
             </p>
           </st-row>
           <!-- <nuxt-link target="_blank" :to="`/information/index/${productInfo.contract.index_id}`">{{ $t('information.trade') }}</nuxt-link> -->
        </li>
        <li>
           <st-row justify="between" align="center">
             <p>
                {{ $t('information.maxLeverage') }}
             </p>
             <p>
               {{ productInfo.contract.max_leverage }}X
             </p>
           </st-row>
           <!-- <nuxt-link target="_blank" :to="`/information/index/${productInfo.contract.index_id}`">{{ $t('information.trade') }}</nuxt-link> -->
        </li>
       </ul>
     </div>
</template>
<script>
  export default {
    data() {
      return {
        // 指数集合
        indexList: [],
        // 当前指数数据源
        memberString: ''
      }
    },
    computed: {
      ticker() {
        return this.$store.state.market.ticker
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      locale() {
        return this.$store.state.auth.locale
      }
    },
    watch: {
      productInfo() {
        this.getInfo()
      }
    },
    methods: {
      getIndex() {
        this.swapsApi.getIndexList()
        .then(res => {
          this.indexList = res.data
          this.getInfo()
        })
      },
      getInfo() {
        let info = this.indexList.filter(item => {
          return item.index_id === this.productInfo.contract.index_id
        })[0] || {}
        if (info.member) {
          let member = info.member.filter(item => item.coin_code === info.base_coin)[0]
          let memberList = member ? member.market : []
          this.memberString = memberList.map(item => {
            return item.market_name
          }).join(',')
        }
      }
    },
    mounted() {
      this.getIndex()
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
  .information {
      // margin: 0 10px;
      width: 280px;
      min-height: 260px;
      margin-top: 10px;
      height: 260px;
      background-color: @bbFooterBackground;
      border-radius: 2px;
      .information-market-title {
            padding: 0 12px;
            height: 42px;
            font-weight: 300;
            background-color:  rgba(23,26,37, 0.2);
            h3 {
               margin-bottom: 0px;
               color: @bbxGray;
               font-size: 16px;
            }
            a {
              color: @bbxGray;
              &.little {
               i {
                margin-left: 4px;
                width: 10px;
                height: 11px;
                display: inline-block;
                background-image: url("../../assets/img/icon-more_nor.png");
                &:hover {
                  background-image: url("../../assets/img/icon-more_sel.png");
                }
              }
            }
            }
        }
        ul li {
          padding-left: 18px;
          padding-right: 10px;
          padding-top: 10px;
          height: 30px;
          p {
            color: @bbxGray;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            max-width: 180px;
             &:first-child {
              color: @bbxBlue1;
            }  
          }
          a {
            // padding-left: 10px;
            position: relative;
            font-size: 14px;
            // line-height: 30px;
            color: @bbxBlue1;
            border-bottom: 1px dotted @bbxBlue1;
            &:hover {
              color: @bbxBlue2;
            }
            // &:after {
            //   content: '';
            //   display: block;
            //   position: absolute;
            //   left: 0px;
            //   top: 50%;
            //   margin-top: -2px;
            //   width: 4px;
            //   height: 4px;
            //   background-color: @bbxBlue1;
            //   border-radius: 50%;
            // }
          }
        }
    }
    @media screen and (max-width:750px) and (min-width: 560px){
      .information {
        height: 394px;
      }
    }
</style>
