<template>
  <div class='depth'>
      <canvas ref="deep"></canvas>
      <canvas class="tool-tips" ref="toolTips" @mousemove="mouseMove" @mouseout="mouseOut"></canvas>
  </div>
</template>
<script>
  import Deep from '../../assets/js/deep'
  export default {
    name: 'depth',
    data() {
      return {
        open: true,
        deep: null
      }
    },
    computed: {
      // 数字位数
      com() {
        return this.$store.state.com
      },
      productinfo() {
        return this.$store.state.market.productInfo
      },
      sell() {
        return this.$store.state.market[this.productinfo.contract.contract_id + '_Order'] ? this.$store.state.market[this.productinfo.contract.contract_id + '_Order'].sells : []
      },
      buy() {
        return this.$store.state.market[this.productinfo.contract.contract_id + '_Order'] ? this.$store.state.market[this.productinfo.contract.contract_id + '_Order'].buys : []
      },
      priceLabel() {
        return this.$t(`depth.priceLabel`)
      }
    },
    watch: {
      '$route'() {
        this.init()
      },
      buy(val) {
        this.deep.dataChange(this.buy, this.sell)
      },
      priceLabel() {
        this.deep.priceLabel = this.$t(`depth.priceLabel`)
        this.deep.sumLabel = this.$t(`depth.sumLabel`)
      }
    },
    methods: {
      init() {
        this.open = true
        this.deep = new Deep(this.$refs.deep, this.$refs.toolTips, this.buy, this.sell, this.$t(`depth.priceLabel`), this.$t(`depth.sumLabel`), {price: this.com.priceUnit ? this.com.priceUnit - 1 : this.com.priceUnit, size: this.com.volUnit}, Number(this.productinfo.contract.depth_bord))
      },
      toggle() {
        this.open = !this.open
      },
      mouseMove(e) {
        this.deep.mouseMove(e.offsetX)
      },
      mouseOut() {
        this.deep.clearTool()
      },
      resize() {
        this.deep.resize()
      }
    },
    mounted() {
      this.init()
      window.addEventListener('resize', this.resize, false)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resize)
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.depth {
    // margin-right: 10px;
    // flex: 1;
    height: 346px;
    background-color: @bbFooterBackground;
    border-radius: 2px;
    position: relative;
    canvas {
      width: 100%;
      min-width: 200px;
      height: 100%;
      &.tool-tips {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
}
</style>
