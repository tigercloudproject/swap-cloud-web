<template>
 <section>
    <st-row class="team-list" wrap="wrap" justify="between">
      <div class="team-info" :key="item.id" v-for="item in list">
          <div class="logo">
            <img :src="item.img_url" alt="">
          </div>
          <h4>{{ item.name }}</h4>
          <h6>{{ item.manifesto }}</h6>
          <st-row class="number">
            <div>
              <p>{{ item.crew }}</p>
              <p>当前盈利额</p>
            </div>
             <div>
              <p>{{ item.total }}</p>
              <p>人数</p>
            </div>
          </st-row>
          <nuxt-link :to="'/game/team/' + item.id">加入战队</nuxt-link>
      </div>
  </st-row>
 </section>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 2,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 3,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 4,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 5,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 6,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 7,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 8,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 9,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 10,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 11,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 12,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 13,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        },
        {
          id: 14,
          name: '博建薅羊毛',
          total: 10000,
          crew: 100,
          manifesto: '大吉大利，几万吃鸡',
          img_url: '/favicon.ico'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import './game.less';
section {
  padding-bottom: 160px;
  background-image: url("../../assets/img/game/TD-BG01.png");
  .team-list {
    width: 1200px;
    margin: 0 auto;
  .team-info {
    position: relative;
    margin-top: 92px;
    padding-top: 84px;
    width: 280px;
    height: 336px;
    background-image: url("../../assets/img/game/TD-BG02.png");
    .logo {
      position: absolute;
      top: -54px;
      left: 50%;
      margin-left: -52px;
      padding: 8px;
      width: 104px;
      height: 104px;
      border-radius: 50%;
      background-image: url("../../assets/img/game/TD-logo.png");
      background-size: 100% 100%;
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    h4 {
      color: #fff;
      font-size: 18px;
      text-align: center;
    }
    h6 {
      font-size: 14px;
     color: @game_color;
     text-align: center;
    }
    .number {
      margin: 16px auto;
      width: 218px;
      height: 68px;
      background-color: rgba(8,8,8, .3);
      border: 1px solid #1b2a34;
      div {
        position: relative;
        padding-top: 12px;
        width: 109px;
        &:last-child::after {
          position: absolute;
          left: 0px;
          top: 12px;
          content: '';
          display: block;
          width: 1px;
          height: 40px;
          background-color: #1b2a34;
        }
        p {
          &:first-child {
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
          }
          &:last-child {
            color: @game_color;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
    a {
      display: block;
      margin: 0 auto;
      width: 212px;
      height: 60px;
      text-align: center;
      line-height:  50px;
      color: #fff;
      font-size: 16px;
      background-image: url("../../assets/img/game/TD-BT-1_nor.png");
      &:hover {
        background-image: url("../../assets/img/game/TD-BT-1_sel.png");
      }
    }
  }
}
}
</style>
