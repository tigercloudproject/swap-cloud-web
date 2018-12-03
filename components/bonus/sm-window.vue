
<template>
  <div>
  <st-row v-if="locale === 'zh-cn'" class="sm-window" align="center" direction="column">
    <img v-if="num === 1" src="../../assets/img/bonus/sm-1.jpg" alt="">
    <img v-else-if="num === 2" src="../../assets/img/bonus/sm-2.png" alt="">
    <img v-else src="../../assets/img/bonus/sm-3.png" alt="">
    <p>{{ $t('bonus.smMessage') }}</p>
      <!-- <a target="_blank" @click="close">{{ 'info.hrefTitle' }}</a> -->
  </st-row>
  <st-row v-else class="sm-window" align="center" direction="column">
    <img  src="../../assets/img/bonus/sm-db.jpg" alt="">
    <a href="https://t.me/bbx_en">https://t.me/bbx_en</a>
    <p>Join the group and tell administrator your  BBX account to get 10 USDT</p>
      <!-- <a target="_blank" @click="close">{{ 'info.hrefTitle' }}</a> -->
    </st-row>
  </div>
</template>

<script>
  export default {
    name: 'sm-window',
    props: ['close'],
    data() {
      return {
        num: 1
      }
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      }
    },
    methods: {
      rdImg() {
        this.num = Math.ceil(Math.random() * 3)
      }
    },
    mounted() {
      this.rdImg()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../assets/css/base";
.sm-window {
    padding-top: 20px;
    img {
      width: 65%;
    }
    p {
      margin-top: 10px;
      margin-bottom: -10px;
      padding: 0 10px;
      color: #1F2636;
      font-size: 18px;
      text-align: center;
    }
    a {
      font-size: 18px;
    }
    // a {
    //     margin-top: 20px;
    //     margin-left: 37px;
    //     display: block;
    //     width: 366px;
    //     height: 50px;
    //     background-color: @windowButton;
    //     font-size: 18px;
    //     text-align: center;
    //     line-height: 50px;
    //     color: @bbxWhite;
    //     &:hover {
    //         background-color: @windowButtonHover;
    //     }
    // }
}
</style>
