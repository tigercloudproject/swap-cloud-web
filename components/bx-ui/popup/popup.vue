<template>
  <st-row class="popup" justify="center" align="center">
    <div class="popup-box" :style="`width:${width}px;minHeight:${height}px` ">
      <div class="header" justify="between" align="center">
        <h3>{{ title }}</h3>
        <a @click="close"></a>
      </div>
      <slot></slot>
    </div>
  </st-row>
</template>

<script>
// import StRow from '../row'

export default {
  name: 'popup',
  components: {
    // StRow
  },
  props: {
    title: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      required: true
    },
    width: {
      type: String
    },
    height: {
      default: 260
    }
  },
  methods: {
    close() {
      this.callback()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10010;
    .popup-box {
      width: 440px;
      // min-height: 260px;
      padding-bottom: 30px;
      background-color: #ECF2F7;
      border-radius: 2px;
      // overflow: hidden;
      .header {
        position: relative;
        padding: 0 20px;
        h3 {
          line-height: 70px;
          font-size: 20px;
          text-align: center;
          border-bottom: 1px solid rgba(151,176,214,.5);
          color: #1F2636;
        }
        a {
          position: absolute;
          right: 0px;
          top: 0px;
          margin-right: -16px;
          margin-top: -16px;
          display: block;
          width: 32px;
          height: 32px;
          background: url("./icon-close.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
