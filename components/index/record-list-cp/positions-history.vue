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
                    <td style="text-align: right;">{{ item.realised_profit|retainDecimals({decimal: com.valueUnit}) }}</td>
                </tr>
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
      list: [],
      offset: 0
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

   }
}
</style>
