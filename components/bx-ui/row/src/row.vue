<template>
  <div :class="['flex-box', `flex-direction-${this.direction}`, `flex-justify-${this.justify}`, `flex-align-item-${this.align}`, `flex-wrap-${this.wrap}`]" @click="clickItem($event)">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'st-row',
    props: {
      direction: {
        // params: 'row', 'column'
        default: 'row'
      },
      justify: {
        // params: 'start', 'end', 'center', 'between'
        default: 'start'
      },
      align: {
        // params: 'start', 'end', 'center', 'baseline', 'stretch'
        default: 'start'
      },
      wrap: {
        // params: nowrap | wrap | wrap-reverse
        default: 'nowrap'
      }
    },
    methods: {
      clickItem(e) {
        this.$emit('callback', e)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../assets/css/theme';
  .flex-box {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }

  .flex-direction-row {
    .flex-direction(@direction: row);
  }
  .flex-direction-column {
    .flex-direction(@direction: column);
  }

  .flex-justify-start {
    .flex-justify(@justify: flex-start);
  }
  .flex-justify-end {
    .flex-justify(@justify: flex-end);
  }
  .flex-justify-center {
    .flex-justify(@justify: center);
  }
  .flex-justify-between {
    .flex-justify(@justify: space-between);
  }
  .flex-justify-around {
    .flex-justify(@justify: space-around);
  }
  .flex-align-item-start {
    .align-items(@alignItem: flex-start);
  }
  .flex-align-item-end {
    .align-items(@alignItem: flex-end);
  }
  .flex-align-item-center {
    .align-items(@alignItem: center);
  }
  .flex-align-item-baseline {
    .align-items(@alignItem: baseline);
  }
  .flex-align-item-stretch {
    .align-items(@alignItem: stretch);
  }
  .flex-wrap-nowrap {
    .flex-wrap(@wrap: nowrap);
  }
  .flex-wrap-wrap {
    .flex-wrap(@wrap: wrap);
  }
  .flex-wrap-reverse {
    .flex-wrap(@wrap: wrap-reverse);
  }
</style>
