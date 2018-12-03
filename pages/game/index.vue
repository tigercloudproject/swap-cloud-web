<template>
  <section class="game-index">
      <div class="game-top">
           <!-- <h2>2018 币世界&BBX联合举办全球首届永续合约模拟交易大赛</h2> -->
      </div>
      <st-row class="game-nav" justify="center">
         <nuxt-link to="/game/?nav=first" :class="nav === 'first' && 'active'" href="">活动主页</nuxt-link>
         <!-- <nuxt-link to="/game/?nav=team" :class="nav === 'team' && 'active'">战队列表</nuxt-link> -->
         <a target="_blank" href="https://www.bishijie.com/?src=bbx.com">币世界主场</a>
         <a  target="_blank" href="http://www.bishijie.com/app?recommend_type=2&channelCode=heyuejiaoyidasai">币世界APP</a>
         <nuxt-link class="exchange"  to="/bonus" >领取{{ $t('bonus.bonus') }}<span class="huo"></span></nuxt-link>
      </st-row>
      <first-page v-if="nav === 'first'"></first-page>
      <team-list v-else-if="nav === 'team'"></team-list>
  </section>
</template>
<script>
import FirstPage from '../../components/game/first-page'
import TeamList from '../../components/game/team-list'
export default {
  layout: 'active',
  components: {
    FirstPage,
    TeamList
  },
  data() {
    return {
      rankType: 'mouth'
    }
  },
  computed: {
    nav() {
      return this.$route.query.nav || 'first'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../components/game/game.less';
.game-index {
  // height: 4100px;
  min-width: 1200px;
  background-color: #0e1015;
  .game-top {
    height: 700px;
    padding-top: 580px;
    background-image: url(../../assets/img/game/BG01.png);
    background-position: center center;
    // background-size: 100%  700px;
    // h2 {
    //   // margin-top: 600px;
    //   font-size: 30px;
    //   text-align: center;
    //   .font_color_gradient()
    // }
  }
  .game-nav {
   a {
     position: relative;
    height: 48px;
    width: 140px;
    line-height: 48px;
    font-size: 16px;
    color: @game_color;
    text-align: center;
    line-height: 48px;
    &.active {
      color: #00addb;
    }
    &:nth-child(n+2)::after {
      position: absolute;
      left: 0px;
      top: 50%;
      height: 20px;
      margin-top: -10px;
      display: block;
      content: '';
      width: 1px;
      background-color: rgba(139,166,211, .5);
    }
   }
  }

}
</style>
