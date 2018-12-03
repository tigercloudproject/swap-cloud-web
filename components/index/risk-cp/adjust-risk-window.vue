
<template>
  <div class="adjust-risk-window">
    <div class="adjust-risk-window-message">
      <p>{{$t('risk.cp.messageOne')}}</p>
      <p>{{$t('risk.cp.messageThree')}} <a href="">{{$t('risk.cp.messageFore')}}</a></p>
    </div>
    <div class="adjust-risk-window-title">
      <h4>{{$t('risk.cp.changeRisk')}}（XBT）</h4>
      <st-row align="center" class="rectangle">
          <drag @getDrag="getDrag" :isMove="false" :list="list"></drag>
      </st-row>
    </div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>{{$t('risk.risk')}}</th>
          <th>{{$t('risk.cp.hold')}}</th>
          <th>{{$t('risk.cp.start')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{$t('risk.cp.curry')}}</td>
          <td>200 XBT</td>
          <td>0.5%</td>
          <td>1%</td>
        </tr>
        <tr>
          <td>{{$t('risk.cp.news')}}</td>
          <td>200 XBT</td>
          <td>0.5%</td>
          <td>1%</td>
        </tr>
      </tbody>
    </table>
    <st-row justify="between" class="adjust-risk-window-bottom">
      <a @click="close">{{$t('risk.cp.cancel')}}</a><a href="">{{$t('risk.cp.selNews')}}</a>
    </st-row>
  </div>
</template>

<script>
  import Drag from '../../bx-ui/drag'
  export default {
    name: 'adjust-risk-window',
    props: ['close'],
    components: {
      Drag
    },
    data() {
      return {
        list: [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100]
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      getDrag(rate, value) {
        console.log(rate, value)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 @import "../../../assets/css/base";
.adjust-risk-window {
  padding: 0 20px;
  .adjust-risk-window-message {
    margin: 16px 0 22px;
    p {
      text-align: center;
    }
  }
  .adjust-risk-window-title {
    h4 {
       height: 60px;
      border-top: 1px solid rgba(151,176,214,.5);
      line-height: 59px;
      font-weight: 600;
      font-size: 20px;
      text-align: center;
    }
    .rectangle {
      width: 560px;
      height: 80px;
      border: 1px solid #cfd7e0;
      background-color: @bbxWhite;
    }
  }
  table {
    width: 100%;
    margin: 30px 0;
    border-bottom: 1px solid rgba(151,176,214,.5);
    tr {
      height: 50px;
      border-top: 1px solid rgba(151,176,214,.5);
      th {
        font-weight: 300;
        color: #8e99b6;
      }
      td {
        color: #6b7493; 
      }
      th, td:nth-child(n + 2) {
        text-align: center;
      }
      &:nth-child(2) td:nth-child(n + 2){
        color: #1890ff;
      }
      td:first-child {
        padding-left: 16px;
      }
    }
  }
  .adjust-risk-window-bottom {
    padding: 0 30px;
    a {
      width: 240px;
      height: 50px;
      text-align: center;
      line-height: 48px;
      font-size: 20px;
      &:first-child {
        border: 1px solid @windowButton;
        color: @windowButton;
        &:hover {
           border-color: @windowButtonHover;
           color: @windowButtonHover;
        }
      }
      &:last-child {
          background-color: @windowButton;
          color: @bbxWhite;
        &:hover {
           background-color: @windowButtonHover;
        }
      }
    }
  }
}
</style>
