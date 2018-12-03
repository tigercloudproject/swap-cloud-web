<template>
  <section class="team-info">
    <st-row direction="column" align="center">
    <div class="team-info-top">
       <st-row class="logo" align="center" justify="center">
         <img :src="info.imgurl" alt="">
       </st-row>
       <div class="team-name">
        <h4>{{ info.name }}</h4>
        <p>BBX&币世界模拟交易大赛</p>
       </div>
       <st-row class="team-detial" justify="between">
          <div>
            <img src="../../../assets/img/game/icon-open.png" alt="">
            <h6>{{ info.captain }}</h6>
            <p>队长</p>
          </div>
           <div>
             <img src="../../../assets/img/game/icon-giving.png" alt="">
            <h6>{{ info.total }} <p>BUSD</p></h6>
            <p>战队收益额</p>
          </div>
           <div>
             <img src="../../../assets/img/game/icon-competition.png" alt="">
            <h6>
              {{ info.ranking }}
            </h6>
            <p>当前名额</p>
          </div>
           <div>
             <img src="../../../assets/img/game/icon-invitation.png" alt="">
            <h6>{{ info.crew }}/500</h6>
            <p>团员</p>
          </div>
       </st-row>
       <div class="team-message">
          <st-row class="team-title" justify="center" align="center">
             <p></p>
              <h4>战队宣言</h4>
             <p></p>
           </st-row>
           <div class="team-message-section">
                {{ info.manifesto }}
           </div>
       </div>
        <div class="team-message">
           <st-row class="team-title" justify="center" align="center">
             <p></p>
              <h4>战队介绍</h4>
             <p></p>
           </st-row>
           <div class="team-message-section">
                <p :key="item" v-for="item in info.introduce">{{ item }}</p>
           </div>
       </div>
       <div class="team-bottom">
         <h4><a href="">加入此战队参事，领取10,000 BUDS操盘基金</a></h4>
         <p><a href="">关于模拟交易大赛</a></p>
         <p>2018年全球首届永续合约模拟大赛由币世界和BBX.COM联合举办</p>
       </div>
     </div>
     <div class="team-info-bottom">
      <st-row class="team-title" justify="center" align="center">
             <p></p>
              <h4>规则详情</h4>
             <p></p>
      </st-row>
      <div class="team-info-bottom-title">
       <h4>比赛方法：</h4>
       <p>（1）用户注册BBX即可获得10000 BUSD虚拟本金，通过币世界链接报名，可额外获得5000个 BUSD的虚拟本金。</p>
       <p>（2）每个参赛用户报名之后可获得邀请链接，每邀请一个人报名参赛，奖励200 BUSD的虚拟本金。</p>
       <p>（3）本次比赛按照参赛用户或者团队的收益金额，从高到低排名。</p>
       <p>（4）个人奖，以日、周、月为单位，选出收益额排行榜前10名用户进行奖励。</p>
       <p>（5）团队奖，按照比赛结束结束后，团队的总收益金额排名，取前5名予以奖励。</p>
       <p>（5）团队奖，按照比赛结束结束后，团队的总收益金额排名，取前5名予以奖励。</p>
       <p>（7）活动期间，用户实盘合约账户充值100USDT，第一个获得100倍收益的用户，奖励5个BTC。</p>
      </div>
       <div class="team-info-bottom-title">
        <h4>收益额计算规则：</h4>
        <p>（1）日排名：当日盈亏=从活动开始到当前的总盈亏 - 昨日盈亏 （每天15:00统计并快照）。</p>
        <p>（2）周排名：当周盈亏=从活动开始到当前的总盈亏 - 上周盈亏（每周五15:00统计并快照）。</p>
        <p>（3）月排名：从活动开始到当月结束时的总盈亏 （每月的最后一天15:00统计并快照）。</p>
      </div>
       <div class="team-info-bottom-title">
        <h4>奖项设置：</h4>
        <st-row justify="between">
          <div class="item">
            <h5>【个人奖】</h5>
            <section>
               <h6>（1）日排名</h6>
               <p>第1名：10000 RATING</p>
               <p>第2-5名：5000 RATING</p>
               <p>第6-10名：2000 RATING</p>
               <h6>（2）周排名</h6>
               <p>第1名：10000 TNB + 电子证书</p>
               <p>第2-5名：5000 TNB + 电子证书</p>
               <p>第6-10名：2000 TNB + 电子证书</p>
                <h6>（3）月排名</h6>
               <p>第1名：1万 USDT + 电子证书</p>
               <p>第2名：8000 USDT + 电子证书</p>
               <p>第3名：5000 USDT+电子证书</p>
                <p>第4名：1万元 的 USDT +电子证书</p>
               <p>第5名：9000元的 USDT +电子证书</p>
               <p>第6名：8000元的 USDT +电子证书</p>
                <p>第7名：5000元的 USDT +电子证书</p>
               <p>第8名：4000元的 USDT +电子证书</p>
               <p>第9名：3000元的 USDT +电子证书</p>
                <p>第10名：1000元的 USDT +电子证书</p>
            </section>
          </div>
          <div class="item">
            <h5>【团队奖】</h5>
            <section>
             <p style="margin-bottom: 30px">符合条件的团长，可以创建自己的团队，团队将在BBX官网页面予以展示。团长需要给予团队成员“永续合约的操作指导”，带领团队成员取得更高的收益。</p>
             <p>一等奖：1.5万个USDT</p>
             <p>二等奖：1.2万个 USDT</p>
             <p>三等奖：1万个 USDT</p>
             <p>四等奖：4万元的 USDT</p>
             <p>五等奖：2万 的 USDT</p>
            </section>
          </div>
           <div class="item">
            <h5>【特别奖】</h5>
            <section>
              <p>活动期间，用户实盘合约账户充值100USDT，第一个获得100倍收益的用户，<span>奖励5个BTC。</span></p>
            </section>
          </div>
           <div class="item">
            <h5>【普惠奖】</h5>
            <section>
              <p>所有报名参赛的新用户，<span>均可获得10 USDT的奖励。</span>可用作实盘交易，收益可提现。</p>
            </section>
          </div>
        </st-row>
      </div>
     </div>
    </st-row>
  </section>
</template>
<script>
export default {
  data() {
    return {
      info: {
        imgurl: '/favicon.ico',
        id: 1,
        name: '一颗小白菜',
        captain: '阿南',
        total: 2000,
        ranking: 1,
        crew: 190,
        manifesto: '一定是发射点发射点大师傅但是薇热望热望温热我热温热问问热舞',
        introduce: ['一个个闲的没事手动阀手动阀手动阀手动阀手动阀手动阀的', '我的身份手动阀手动阀手动我的身份手动阀手动阀手动阀手动阀手动阀魏汝稳热望认为认为热望而微软微软微软微软为热吻我魏汝稳热望认为人', '我的身份手动阀手动阀手动阀手动阀手动阀魏汝稳热望认为认为热望而微软微软微软微软为热吻我魏汝稳热望认为人']
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../components/game/game.less';
.team-info {
  height: 2700px;
  background-size: 100% 2700px;
  background-image: url("../../../assets/img/game/bg.png");
  .team-info-top {
    position: relative;
    padding-top: 180px;
    margin-top: 176px;
    height: 1400px;
    width: 1200px;
    background-size: 1200px 1400px;
    background-repeat: no-repeat;
    background-image: url("../../../assets/img/game/BG-2.png");
    .logo {
      position: absolute;
      left: 50%;
      top: -110px;
      margin-left: -120px;
      width: 240px;
      height: 240px;
      background-image: url("../../../assets/img/game/logo.png");
      img {
         width: 214px; 
         height: 214px; 
         background-color: red;
         border-radius: 50%;
      }
    }
    .team-name {
      text-align: center;
      color: #fff;
      h4 {
        font-size: 30px;
       .font_color_gradient()
      }
      p {
        margin-top: 5px;
        font-size: 20px;
      }
    }
    .team-detial {
      margin-top: 30px;
      padding: 0 100px;
      div {
        width: 238px;
        height: 286px;
        background-image: url("../../../assets/img/game/BG-3.png");
        text-align: center;
        img {
          margin-top:30px;
          height: 90px;
        }
        h6 {
          margin: 10px 0 12px;
          font-size: 20px;
          color: #fff;
          p  {
            color: #fff;
            font-size: 14px;
          }
        }
        p {
          color: @game_color;
          font-size: 16px;
        }
      }
    }
    .team-message {
      .team-message-section {
        position: relative;
        margin: 0 auto;
        // box-sizing: content-box;
        padding: 20px 60px;
        line-height: 34px;
        width: 80%;
        background-color: rgba(37,62,75, 0.3);
        border: 2px solid #253e4b;
        font-size: 16px;
        color: @game_color;
        p {
          position: relative;
          &::after {
            position: absolute;
            content: '';
            width: 6px;
            height: 6px;
            left: -18px;
            top: 14px;
            background-color: @game_color;
            border-radius: 50%;
          }
        }
        &::after {
          position: absolute;
          left: -2px;
          top: -2px;
          content: '';
          display: block;
          height: 30px;
          width: 30px;
          background-image: url("../../../assets/img/game/BG-2.png");
          background-position: -100px -100px;
          border-right: 2px solid #253e4b;
          border-bottom: 2px solid #253e4b;
          border-radius: 0 0 30px;
        }
         &::before {
          position: absolute;
          right: -2px;
          top: -2px;
          content: '';
          display: block;
          height: 30px;
          width: 30px;
          background-image: url("../../../assets/img/game/BG-2.png");
          background-position: -100px -100px;
          border-left: 2px solid #253e4b;
          border-bottom: 2px solid #253e4b;
          border-radius: 0 0 0 30px;
        }
      }
    }
    .team-bottom {
      margin-top: 40px;
      h4 {
        a {
          margin: 0 auto;
          display: block;
          width: 518px;
          height: 88px;
          text-align: center;
          line-height: 88px;
          color: #fff;
          font-size: 18px;
          font-weight: 500;
          background-image: url("../../../assets/img/game/BT-1_nor.png");
          &:hover {
            background-image: url("../../../assets/img/game/BT-1_sel.png");
          }
          &.no {
            background-image: url("../../../assets/img/game/BT-2_nor.png");
            &:hover {
            background-image: url("../../../assets/img/game/BT-2_sel.png");
            }
          }
        }
      }
      p {
        text-align: center;
        color: #fff;
        a {
          display: block;
          margin: 10px 0;
          color: #8ba6d3;
        }
        &:last-child {
          margin-top: 20px;
        }
      }
    }
  }
  .team-title {
    .team-title()
  }
  .team-info-bottom {
    width: 1200px;
    .team-info-bottom-title {
      h4 {
        position: relative;
        margin: 20px 0 10px;
        padding-left: 40px;
        font-size: 18px;
        color: #fff;
          &::after {
            position: absolute;
            content: '';
            width: 6px;
            height: 6px;
            left: 18px;
            top: 8px;
            background-color: #fff;
            border-radius: 50%;
          }
      }
      p {
        color: @game_color;
        padding-left: 50px;
        line-height: 24px;
        font-size: 14px;
      }
      .item {
        width: 276px;
        h5 {
          padding: 10px 0;
          font-size: 16px;
          color: #ff9226;
          text-align: center;
        }
        section {
        position: relative;
        margin: 0 auto;
        // box-sizing: content-box;
        padding: 20px;
        height: 530px;
        line-height: 34px;
        // width: 80%;
        background-color: rgba(37,62,75, 0.3);
        border: 2px solid #253e4b;
       
        h6 {
          color: #fff;
          font-size: 14px;
        }
        p {
          padding-left: 0px;
          span {
            color: #fff;
          }
        }
        &::after {
          position: absolute;
          left: -2px;
          top: -2px;
          content: '';
          display: block;
          height: 14px;
          width: 14px;
          background-image: url("../../../assets/img/game/BG-2.png");
          background-position: -100px -100px;
          border-right: 2px solid #253e4b;
          border-bottom: 2px solid #253e4b;
          border-radius: 0 0 30px;
        }
         &::before {
          position: absolute;
          right: -2px;
          top: -2px;
          content: '';
          display: block;
          height: 14px;
          width: 14px;
          background-image: url("../../../assets/img/game/BG-2.png");
          background-position: -100px -100px;
          border-left: 2px solid #253e4b;
          border-bottom: 2px solid #253e4b;
          border-radius: 0 0 0 30px;
        }
      }
      }
     
    }
  }
}
</style>
