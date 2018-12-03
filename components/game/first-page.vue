<template>
   <div class="game-bottom">
         <div class="active-main">
           <!-- <h3></h3> -->
           <!-- <h4>活动总奖池</h4> -->
           <h6>
             <!-- <p>2,000,000</p>
             <p>奖池将不断注入新奖励</p> -->
            <st-row justify="center">
             <span>20万USDT</span>
             <span>100万TNB</span>
             <span>200万RATING</span>
           </st-row>
           </h6>
         </div>
         <div class="set">
          <st-row class="team-title" justify="center" align="center">
             <p></p>
              <h4>奖项设置</h4>
             <p></p>
            </st-row>
            <div class="prize">
               <h6>特别奖</h6>
               <div><img src="../../assets/img/game/TD.png" alt=""></div>
               <div class="prize-message">
                 <p>活动期间，用户实盘合约账户充值100USDT，获得100倍收益</p>
                 <p>奖励5个BTC</p>
               </div>
            </div>
            <st-row class="prize-list">
            <div class="prize person-one">
               <h6 class="max">
                 个人奖
               </h6>
               <st-row class="nav" justify="between">
                   <a :class="rankType === 'mouth' && 'active'" @click="rankType = 'mouth'">月榜</a>
                   <a :class="rankType === 'week' && 'active'" @click="rankType = 'week'">周榜</a>
                   <a :class="rankType === 'day' && 'active'" @click="rankType = 'day'">日榜</a>
                 </st-row>
               <div class="prize-three">
                 <img src="../../assets/img/game/1-3.png" alt="">
                 <template v-if="rankType === 'mouth'">
                     <div>
                   <P>8000</P>
                    <P>USDT</P>
                 </div>
                 <div>
                   <P>10000</P>
                    <P>USDT</P>
                 </div>
                 <div>
                   <P>5000</P>
                    <P>USDT</P>
                 </div>
                 </template>
                <template v-else-if="rankType === 'week'">
                     <div>
                   <P>5000</P>
                    <P>TNB</P>
                 </div>
                 <div>
                   <P>10000</P>
                    <P>TNB</P>
                 </div>
                 <div>
                   <P>2000</P>
                    <P>TNB</P>
                 </div>
                 </template>
                 <template v-else-if="rankType === 'day'">
                     <div>
                   <P>5000</P>
                    <P>RATING</P>
                 </div>
                 <div>
                   <P>100000</P>
                    <P>RATING</P>
                 </div>
                 <div>
                   <P>5000</P>
                    <P>RATING</P>
                 </div>
                 </template>
               </div>
               <div class="prize-ranking" v-if="rankType === 'mouth'">
                 <P>第<span>4</span>名：10000元的USDT</P>
                 <P>第<span>5</span>名：9000元的 USDT</P>
                 <P>第<span>6</span>名：8000元的 USDT</P>
                 <P>第<span>7</span>名：5000元的 USDT</P>
                 <P>第<span>8</span>名：4000元的 USDT</P>
                 <P>第<span>9</span>名：3000元的 USDT</P>
                 <P>第<span>10</span>名：1000元的 USDT</P>
               </div>
                <div class="prize-ranking" v-if="rankType === 'week'">
                 <P>第<span>4</span>名：5000 TNB</P>
                 <P>第<span>5</span>名：5000 TNB</P>
                 <P>第<span>6</span>名：2000 TNB</P>
                 <P>第<span>7</span>名：2000 TNB</P>
                 <P>第<span>8</span>名：2000 TNB</P>
                 <P>第<span>9</span>名：2000 TNB</P>
                 <P>第<span>10</span>名：2000 TNB</P>
               </div>
                <div class="prize-ranking" v-if="rankType === 'day'">
                 <P>第<span>4</span>名：5000 RATING</P>
                 <P>第<span>5</span>名：5000 RATING</P>
                 <P>第<span>6</span>名：2000 RATING</P>
                 <P>第<span>7</span>名：2000 RATING</P>
                 <P>第<span>8</span>名：2000 RATING</P>
                 <P>第<span>9</span>名：2000 RATING</P>
                 <P>第<span>10</span>名：2000 RATING</P>
               </div>
            </div>
            <div class="prize person-one">
               <h6>特别奖</h6>
               <div class="prize-three">
                 <img src="../../assets/img/game/1-3.png" alt="">
                 <div >
                   <P>1.2万个</P>
                    <P>USDT</P>
                 </div>
                 <div>
                   <P>1.5万个</P>
                    <P>USDT</P>
                 </div>
                 <div>
                   <P>1万个</P>
                    <P>USDT</P>
                 </div>
                </div>
                 <div class="prize-ranking">
                 <P>第<span>4</span>名：4万人民币的 USDT</P>
                 <P>第<span>5</span>名：2万人民币的 USDT</P>
               </div>
               <p class="captain">
                 符合条件的团长，可以创建自己的团队，团队将在BBX官网页面予以展示。团长需要给予团队成员“永续合约的操作指导”，带领团队成员取得更高的收益。
               </p>
            </div>
            <div class="prize">
               <h6>空投糖果</h6>
               <div><img src="../../assets/img/game/KT.png" alt=""></div>
               <div class="prize-message">
                 <p>参与交易的前2000名活跃用户（每天至少有一笔交易），活动结束后（每月为一个周期）</p>
                 <p>瓜分74万个TNB</p>
               </div>
            </div>
            <div class="prize">
               <h6>普惠奖</h6>
               <div><img src="../../assets/img/game/PH.png" alt=""></div>
               <div class="prize-message">
                 <p>所有报名参赛的用户，均可获得该奖励</p>
                 <p>可获得10 USDT的奖励</p>
               </div>
            </div>
            </st-row>
         </div>
         <div class="reles">
            <st-row class="team-title" justify="center" align="center">
             <p></p>
              <h4>活动规则</h4>
             <p></p>
            </st-row>
            <div class="reles-message">
              <div class="reles-message-item">
                <h5>活动时间</h5>
                <div>
                  <p>2018年11月21日15:00-2019年1月17日15:00。</p>
                  <p>（1）11月21日-12月 1日， 团长招募。</p>
                  <p>（2）12月1日-12月17日， 团长组队，个人报名参赛。</p>
                  <p>（3）12月18日-1月17日， 比赛时间。</p>
                  <p>（4）1月18日-1月25日， 奖项发放。 </p>
                </div>
              </div>
              <div class="reles-message-item">
                 <h5>报名入口</h5>
                 <div>
                    <P>（1）指定币世界为唯一报名入口</P>
                    <P>（2）团员报名：即将公布</P>
                    <P>（3）团长报名：币世界报名</P>
                    <img src="../../assets/img/game/fbj-sm.png" alt="">
                 </div>
              </div>
              <div class="reles-message-item">
                <h5>比赛办法</h5>
                <div>
                  <p>（1）用户注册BBX即可获得10000 BUSD虚拟本金，通过币世界链接报名，可额外获得5000个 BUSD的虚拟本金。</p>
                  <p>（2）每个参赛用户报名之后可获得邀请链接，每邀请一个人报名参赛，奖励200 BUSD的虚拟本金。</p>
                  <p>（3）本次比赛按照参赛用户或者团队的收益金额，从高到低排名。 </p>
                  <p>（4）个人奖，以日、周、月为单位，选出收益额排行榜前10名用户进行奖励。 </p>
                  <p>（5）团队奖，按照比赛结束结束后，团队的总收益金额排名，取前5名予以奖励。</p>
                  <p>（6）获胜的团队，团长获得团队奖金的30%，剩余70%团队成员平分。</p>
                  <p>（7）活动期间，用户实盘合约账户充值100USDT，第一个获得100倍收益的用户，奖励5个BTC。</p>
                </div>
              </div>
              <div class="reles-message-item">
                <h5>收益额计算规则</h5>
                <div>
                  <p>（1）日排名：当日盈亏=从活动开始到当前的总盈亏 - 昨日盈亏 （每天15:00统计并快照）。</p>
                  <p>（2）周排名：当周盈亏=从活动开始到当前的总盈亏 - 上周盈亏（每周五15:00统计并快照）。</p>
                  <p>（3）月排名：从活动开始到当月结束时的总盈亏 （每月的最后一天15:00统计并快照）。 </p>
                </div>
              </div>
              <div class="reles-message-item">
                <h5>活动说明</h5>
                <div>
                  <p>（1）BUSD为本次合约模拟交易大赛的虚拟本金，1:1锚定美元，只作用比赛，不能提现。</p>
                  <p>（2）比赛期间，你的初始本金输光，可以通过下载币世界、邀请好友参赛，获得更多虚拟本金。</p>
                  <p>（3）周赛及月赛获奖用户均发放平台特制带编号的荣誉证书，将成为个人在合约交易上代表自身水平的象征。</p>
                  <p>（4）每个参赛用户只能使用一个账号，使用多个账号操作者取消比赛成绩。</p>
                  <p>（5）比赛结束7天内（遇节假日顺延），官方客服人员通过注册邮箱联系获奖用户发放奖金、奖品和证书，奖金将直接打入获奖用户的平台账户中。</p>
                  <p>（6）本届大赛由BBX期货合约模拟交易大赛组委会负责运行，大赛的规则以及各项事项由大赛组委会负责解释。大赛组委会对本次大赛拥有最终解释权。</p>
                </div>
              </div>
            </div>
         </div>
         <div class="partner">
             <st-row class="team-title" justify="center" align="center">
             <p></p>
              <h4>合作伙伴</h4>
             <p></p>
            </st-row>
            <st-row class="partner-list" justify="center">
              <a target="_blank" href="http://bishijie.com/?src=bbx.com"><img style="width: 100%" src="../../assets/img/game/bsj-logo.png" alt=""></a>
              <a target="_blank" href="https://www.dprating.com/?src=bbx.com"><img src="../../assets/img/game/DPRating_logo.png" alt=""></a>
              <a target="_blank" href="http://www.linkvc.com/?src=bbx.com"><img style="width: 100%;height: 100%" src="../../assets/img/game/link-vc.png" alt=""></a>
              <a href="#"><img style="width: 100%;margin-top: 32px;" src="../../assets/img/game/tiger_cloud.png" alt=""></a>
            </st-row>
         </div>
      </div>
</template>
<script>
export default {
  data() {
    return {
      rankType: 'mouth'
    }
  }
}
</script>
<style lang="less" scoped>
@import './game.less';
  .game-bottom {
    background-image: url(../../assets/img/game/BG02.png);
    background-size: 100%  3563px;
    padding: 50px 0 100px;
    .active-main {
      // h3 {
      //   a {
      //     margin: 0px auto 0;
      //     width: 160px;
      //     height: 40px;
      //     display: block;
      //     color: #00addb;
      //     line-height: 40px;
      //     text-align: center;
      //     background-color: #05151b;
      //     border: 1px solid #00addb;
      //   }
      // }
      h4 {
          height: 116px;
          line-height: 116px;
          font-size: 26px;
          text-align: center;
          .font_color_gradient()
      }
      h6 {
        position: relative;
        margin: 0 auto;
        height: 600px;
        width: 996px;
        background-image: url("../../assets/img/game/zjc.png");
        background-size: 100%  600px;
        // p:first-child {
        //     font-size: 106px;
        //     text-align: center;
        //    .font_color_gradient()
        // }
        // p:last-child {
        //   margin: 0 auto;
        //   width: 260px;
        //   height: 40px;
        //   text-align: center;
        //   line-height: 40px;
        //   border: 1px solid #253e4b;
        //   background: #1c2329;
        //    color: #fff;
        //    font-size: 16px;
        // }
      div {
        position: absolute;
        bottom: 100px;
        margin: 0 auto;
        width: 996px;
        span {
          color: @game_color;
          font-size: 16px;
          &:nth-child(n+2) {
            margin-left: 210px;
          }
        }
      }
      }
    }
    .team-title {
      .team-title()
    }
    .partner {
      .partner-list {
        padding-top: 40px;
        a {
           height: 138px;
           width: 260px;
           color: #202e35;
           text-align: center;
           line-height:138px;
           font-size: 24px; 
           border: 2px solid #202e35;
           box-shadow: #000 3px 3px 3px;
           &:nth-child(n+2) {
             margin-left: 32px;
           }
           background-color: #fff;
           img {
             display: block;
           }
          //  img {
          //    background-color: #fff;
          //  }
        }
      }
    }
    .set {
      .prize{
        margin: 0 auto;
        padding-top: 30px;
        height: 560px;
        width: 360px;
        background-image: url(../../assets/img/game/JX-bg.png);
        background-size: 100% 560px;
        h6 {
          width: 80%;
          margin: 0 auto 10px;
          height: 60px;
          font-size: 26px;
          text-align: center;
          line-height: 60px;
          .font_color_gradient();
          &::after {
            width: 100%;
            height: 14px;
            display: block;
            content: '';
            background-image: url(../../assets/img/game/zs-02.png);
            background-size: 100%;
            background-position: top;
            background-repeat: no-repeat;
          }
        }
        div {
          text-align: center;
          img {
            margin: 20px 0;
            // width: 40%;
          }
        }
        .prize-message {
          p {
            margin: 0 auto 20px;
            width: 70%;
            &:last-child {
              padding: 10px 0;
              color: #ffbc00;
              font-size: 16px;
              border-top: 1px solid #515a69;
              border-bottom: 1px solid #515a69;
            }
            &:first-child {
              line-height: 30px;
              color: #edf4ff;
              font-size: 12px;
            }
          }
        }
      }
      .prize-list {
        margin: 0 auto;
        width: 1200px;
        .prize {
          width: 320px;
        }
        .person-one {
          position: relative;
          h6.max {
            position: relative;
            margin: 0 auto;
            height: 110px;
            &::after {
              position: absolute;
              bottom: 0px;
            }
          }
          .nav {
            position: absolute;
            top: 90px;
            width: 100%;
            padding: 0 40px;
            a {
                height: 25px;
                width: 54px;
                font-size: 14px;
                text-align: center;
                line-height: 25px;
                color: @game_color;
                &.active {
                  color: #fff;
                  background-color: #1e4053;
                }
              }
          }
          .prize-three {
            position: relative;
            color: #fff;
            font-size: 14px;
            div {
              position: absolute;
              text-align: center;
              &:nth-child(2) {
                  top: 126px;
                  left: 56px;
              }
               &:nth-child(3) {
                  top: 100px;
                  left: 125px;
              }
               &:nth-child(4) {
                  top: 130px;
                  left: 190px;
              }
            }
          }
          .prize-ranking {
            margin-top: -10px;
            p {
              height: 26px;
              line-height: 26px;
              font-size: 12px;
              color: #edf4ff;
              &:nth-child(2n - 1) {
                margin: 0 auto;
                width: 80%;
                background-color: rgba(33,51,61, .3);
              }
              span {
                display: inline-block;
                margin: 0 6px;
                width: 20px;
                height: 20px;
                line-height: 20px;
                background-color: #171f2a;
                border-radius: 50%;
                vertical-align: middle;
              }
            }
          }
          .captain {
            margin: 10px auto;
            width: 60%;
            line-height: 24px;
            font-size: 12px;
            text-align: center;
            color: @game_color;
          }
        }
      }
    }
    .reles {
      .reles-message {
        margin: 60px auto;
        padding: 40px 0 0 100px;
        width: 1200px;
        height: 968px;
        background-image: url(../../assets/img/game/bg-k-3.png);
        background-size: 100%  968px;
        .reles-message-item {
          margin: 10px; 
          div {
            padding-left: 16px;
          }
          h5 {
            padding-left: 16px;
            position: relative;
            line-height: 28px;
            font-size: 14px;
            &::before {
              position: absolute;
              content: '';
              left: 0px;
              top: 8px;
              display: block;
              height: 6px;
              width: 6px;
              background-color: @game_color;
              border-radius: 50%;
            }
          }
          p {
            line-height: 24px;
            font-size: 12px;
          }
          img {
            margin: 10px;
            display: block;
            width: 100px;
            height: 100px;
            background-color: #fff;
          }
          color: @game_color;
        }
      }
    }
  }
</style>
