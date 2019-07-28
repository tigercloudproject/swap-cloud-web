
<template>
  <div class="confirm-plan-window">
    <p>{{content}}</p>
    <st-row class="btn" justify="between">
      <a @click="close" >{{ $t('submitEntrust.cancel') }}</a>
       <a @click="submit">{{ $t('record.cp.confirm') }}</a>
    </st-row>
  </div>
</template>

<script>
  export default {
    name: 'secondary-confirmation',
    props: ['close', 'deviation', 'submitOrder', 'content'],
    data() {
      return {
      }
    },
    methods: {
      submit() {
        this.$emit('submitOrder')
        this.close()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../assets/css/base";
.confirm-plan-window {
  .btn {
    padding: 0 40px;
  }
  p {
    margin: 40px 80px 10px;
    color: @bbxBackground1;
    text-align: center;
  }
      a {
        margin-top: 30px;
        // margin-left: 37px;
        display: block;
        width: 160px;
        height: 48px;
        background-color: @windowButton;
        font-size: 18px;
        text-align: center;
        line-height: 48px;
        color: @bbxWhite;
        border-radius: 2px;
        &:hover {
            background-color: @windowButtonHover;
        }
        &:first-child {
          background-color: #ECF2F7;
          border: 1px solid @windowButton;
          color: @windowButton;
          &:hover {
            border-color: @windowButtonHover;
            color: @windowButtonHover;
          }
        }
    }
}
</style>
