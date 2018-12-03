<template>
 <footer class="pc-footer">
            <section class="pc-footer-content">
              <st-row class="pc-footer-top" justify="between">
                <div class="footer-top-left">
                  <div>
                    <img  src="../../assets/img/bbx_logo.svg" class="width-760-min footer-logo" />
                    <img  src="../../assets/img/m/header/BBX-logo.svg" class="width-760-max footer-logo" />
                  </div>
                  <p>{{$t('footer.webDesc')}}</p>
                </div>
                <div class="footer-top-middle">
                  <dl>
                    <dt>{{$t('footer.supportTitle')}}</dt>
                    <dd><a :href="`https://support.bbx.com/hc/${locale}`" target="_blank">{{$t('footer.helper')}}</a></dd>
                    <dd><a :href="`https://support.bbx.com/hc/${locale}/articles/360000537814-BBX%E4%BA%A4%E6%98%93%E6%9C%8D%E5%8A%A1%E8%B4%B9-%E4%BD%A3%E9%87%91-`" target="_blank">{{$t('footer.supportFee')}}</a></dd>
                    <dd><a :href="`https://support.bbx.com/hc/${locale}/requests/new`" target="_blank">{{$t('footer.supportFeedback')}}</a></dd>
                    <dd><a :href="`https://support.bbx.com/hc/${locale}/sections/360000113794-%E5%B8%81%E7%A7%8D%E4%BB%8B%E7%BB%8D`" target="_blank">{{$t('footer.supportAsset')}}</a></dd>
                  </dl>
                  <dl>
                    <dt>{{$t('footer.aboutTitle')}}</dt>
                    <dd><a :href="`https://support.bbx.com/hc/${locale}/categories/360000051514-%E5%85%AC%E5%91%8A%E4%B8%AD%E5%BF%83`" target="_blank">{{$t('footer.aboutAnnouncement')}}</a></dd>
                    <dd><a :href="`https://support.bbx.com/hc/${locale}/articles/360000638773-BBX%E9%A6%96%E6%9C%9F%E4%B8%8A%E5%B8%81%E7%94%B3%E8%AF%B7`" target="_blank">{{$t('footer.aboutApply')}}</a></dd>
                  </dl>
                  <dl>
                    <dt>{{$t('footer.legalTitle')}}</dt>
                    <dd><a target="_blank" :href="`https://www.bbx.com/terms?lang=${locale}`">{{ $t('footer.legalAgreement') }}</a></dd>
                    <dd><a target="_blank" :href="`https://www.bbx.com/risk?lang=${locale}`">{{ $t('footer.legalRisk') }}</a></dd>
                  </dl>
                </div>
                <div class="footer-top-right">
                  <div class="contact-us">
                    {{ $t('footer.contactUs') }}
                  </div>
                  <p class="lx">
                      {{ $t('footer.kf') }}
                      <span>
                        <img src="../../assets/img/footer/icon-wechat.svg">
                        <img src="../../assets/img/footer/kf-wx.jpg">
                      </span>
                  </p>
                  <p class="lx">
                      {{ $t('footer.sw') }}
                      <span>
                        <img src="../../assets/img/footer/icon-wechat.svg">
                        <img src="../../assets/img/footer/sw-wx.jpeg">
                      </span>
                   </p>
                  <ul>
                    <li>
                      <a href="https://t.me/bbx_en" target="_blank"><img src="../../assets/img/footer/icon-Telegram.png" /></a>
                    </li>
                    <li>
                      <a href="https://t.me/bbx_cn" target="_blank"><img src="../../assets/img/footer/icon-Telegram-cn.png" /></a>
                    </li>

                    <li>
                      <a href="https://twitter.com/bbxcom" target="_blank"><img src="../../assets/img/footer/icon-Twitter.png" /></a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/bbxcom/" target="_blank"><img src="../../assets/img/footer/icon-Facebook.png" /></a>
                    </li>

                    <li>
                      <a href="https://medium.com/@bbxcom" target="_blank"><img src="../../assets/img/footer/icon-wechat.png" /></a>
                    </li>
                    <!-- <li>
                      <a href="mailto:contact@bbx.com" target="_blank"><img src="../../assets/img/footer/icon-Email.png" /></a>
                    </li> -->
                  </ul>

                   <ul>
                    <li>
                    <a href="https://weibo.com/bbxcom/" target="_blank" ><img src="../../assets/img/footer/icon-weibo.svg" alt="weibo" /></a>
                    </li>
                    <!-- <li>
                      <a target="_blank"  href="https://support.bbx.com/hc/zh-cn/articles/360007465494">
                        <img src="../../assets/img/footer/icon-wechat.svg" alt="weixin" />
                        <img src="../../assets/img/footer/wechat_code.jpg" alt="wechat-code" class="wechat-code" />
                      </a>
                    </li> -->
                    <li>
                      <a href="http://qun.qzone.qq.com/group#!/428907848/" target="_blank" ><img src="../../assets/img/footer/icon-QQ.svg" alt="email"/></a>
                    </li>
                    <li>
                      <a href="https://www.toutiao.com/c/user/101244777374/" target="_blank" ><img src="../../assets/img/footer/icon-toutiao.svg" alt="toutiao"/></a>
                    </li>
                    <li>
                      <a href="https://www.zdpvt.com/web/userDetail/5b4d747e402b5b798525e626/" target="_blank" >
                        <img src="../../assets/img/footer/icon-zhidian.svg" alt="facebook"/>
                      </a>
                    </li>
                  </ul>
                  <!-- <div class="weixin-box">
                    <div class="weixin">
                      <img src="../../assets/img/footer/weixin.jpg" />
                      <p>{{ $t('footer.wechat') }}</p>
                    </div>
                  </div> -->
                </div>
              </st-row>
              <section class="pc-footer-middle">
                <span>{{ $t('footer.linksTitle') }}</span>
                <a href="http://www.linkvc.com/?src=bbx.com" target="_blank">{{ $t('footer.LinkVC') }}</a>
                  <a href="https://www.zdpvt.com/?src=bbx.com" target="_blank">{{ $t('footer.zd') }}</a>
                  <a href="http://www.jinse.com/?src=bbx.com" target="_blank">{{ $t('footer.linksInc1') }}</a>
                  <a href="http://www.aicoin.com/?src=bbx.com" target="_blank">{{ $t('footer.linksInc2') }}</a>
                  <a href="https://www.bishijie.com/?src=bbx.com" target="_blank">{{ $t('footer.Bishijie') }}</a>
                  <a href="https://www.bitkeep.com/?src=bbx.com" target="_blank">BitKeep</a>
                  <a href="http://www.dprating.com/?src=bbx.com" target="_blank">{{ $t('footer.DPRating') }}</a>
                  <a href="https://www.chainfor.com/?src=bbx.com" target="_blank">{{ $t('footer.linksInc3') }}</a>
                  <!-- <a href="https://www.7234.cn/?src=bbx.com" target="_blank">{{ $t('footer.linksInc4') }}</a>
                  <a href="http://www.chaindd.com/?src=bbx.com" target="_blank">{{ $t('footer.linksInc5') }}</a> -->
                  <a href="http://www.feixiaohao.com/?src=bbx.com" target="_blank">{{ $t('footer.linksInc6') }}</a>
                  <a href="https://cobo.com/?src=bbx.com" target="_blank">{{ $t('footer.Cobo') }}</a>
                  <a href="https://www.bbex.io/?src=bbx.com" target="_blank">{{ $t('footer.BBEX') }}</a>
                  <a href="https://beshare.io/?src=bbx.com" target="_blank">{{ $t('footer.Beshare') }}</a>
                  <a href="http://www.bpop.io/?src=bbx.com" target="_blank">{{ $t('footer.Bpop') }}</a>
                  <a href="http://www.dappx.com/?src=bbx.com" target="_blank">{{ $t('footer.DappX') }}</a>
                  <a href="https://niuyan.com/exchanges/bbx" target="_blank">{{ $t('footer.linksInc8') }}</a>
                  <a href="http://www.wankenet.cn/?src=bbx.com" target="_blank" >{{ $t('footer.linksInc9') }}</a>
                  <a href="https://www.wangxin.name/" target="_blank" >{{ $t('footer.linksInc10') }}</a>
              </section>
              <section class="pc-footer-bottom">
                <p>Copyright2018@Link Future  Investment Consulting Corporation All Rights Reserved.</p>
              </section>
            </section>
          </footer>
</template>
<script>
  export default {
    name: 'common-footer',
    computed: {
      locale() {
        return this.$store.state.auth.locale
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";

.pc-footer {
    width: 100%;
    height: 385px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    min-width: 1200px;
    background: @bbFooterBackground;
    .width-760-max {
        display: none;
    }
    .pc-footer-content {
        // width: 1200px;
        margin: 0 32px;;
        color: @bbxFooterColor;
        font-size: 12px;
        .pc-footer-top {
            padding-top: 60px;
            .footer-logo {
                width: 94px;
            }
            .footer-top-left {
                // width: 344px;
                // float: left;
                flex: 1;
                p {
                    padding-left: 10px;
                    padding-right: 15px;
                    padding-top: 10px;
                }
            }
            .footer-top-middle {
                // width: 520px;
                // float: left;
                flex: 2;
                dl {
                    width: 33%;
                    float: left;
                    dt {
                        color: #cdd5df;
                        font-size: 14px;
                    }
                    dd,dt {
                        padding: 5px 0px;
                        a {
                            color: @bbxFooterColor;
                        }
                    }
                }
            }
            .footer-top-right {
                width: 336px;
                // float: right;
                .lx {
                  padding: 5px 0;
                  span {
                      position: relative;
                      img {
                          &:first-child {
                            width: 20px;
                            height: 20px;
                            margin-left: 5px;
                          }
                          &:last-child {
                            display: none;
                            width: 80px;
                            height: 80px;
                            position: absolute;
                            z-index: 1000;
                            left: -23px;
                            top: 25px;
                          }
                      }
                      &:hover {
                        img:last-child {
                           display: block;
                        }
                      }
                  }
                }
                .contact-us {
                    color: @bbxGray;
                    font-size: 14px;
                    padding: 5px 0px;
                }
                ul {
                    padding-top: 10px;
                    li {
                        display: inline-block;
                        font-size: 0;
                        padding-right: 20px;
                        position: relative;
                        img {
                            width: 32px;
                            height: 32px;
                        }
                        a {
                            .wechat-code {
                                display: none;
                                width: 80px;
                                height: 80px;
                                position: absolute;
                                left: -21px;
                                top: 36px;
                            }
                            &:hover {
                                .wechat-code {
                                    display: block;
                                }
                            }
                        }
                        
                    }
                }
                .weixin-box {
                    width: 100%;
                    padding-top: 10px;
                    padding-bottom: 20px;
                    .weixin {
                        width: 74px;
                        //height: 86px;
                        //background: #272d40;
                        //border: 1px solid #344260;
                        padding: 0px 4px;
                        img {
                            width: 100%;
                            cursor: pointer;
                        }
                        p {
                            padding-top: 2px;
                            text-align: center;
                            margin-bottom: 0px;
                        }
                    }
                }
            }
        }
          .pc-footer-middle {
            border-top: 1px solid #272d40;
            padding-top: 30px;
            padding-bottom: 30px;
            >span {
                padding-right: 10px;
            }
            >a {
                padding-right: 10px;
                color: @bbxFooterColor;
            }
        }
        .pc-footer-bottom {
            height: 30px;
            padding-top: 14px;
            //text-align: center;
            border-top: 1px solid #272d40;
        }
    }
}
@media screen and (max-width: 750px) {
    .pc-footer {
        min-width: 100%;
        height: 640px;
        padding-bottom: 15px;
        padding-top: 20px;
        .width-760-max {
            display: block;
        }
        .width-760-min {
            display: none;
        }
        .pc-footer-content { 
            margin: 0;
            padding: 0px 20px;
            color: @bbxFooterColor;
            font-size: 12px;
            .pc-footer-top {
                padding-top: 0px;
                display:block;
                .footer-logo {
                    width: 70px; 
                }
                .footer-top-left {
                    p {
                        padding-left: 10px;
                        padding-right: 15px;
                        padding-top: 10px;
                    }
                }
                .footer-top-middle {
                    dl {
                        width: 100%;
                        float: none;
                        dt {
                            color: @bbxGray;
                            font-size: 14px;
                        }
                        dd,dt {
                           
                            padding: 5px 0px;
                            margin-bottom: 0px;
                            a {
                                color: @bbxFooterColor;
                            }
                        }
                        dd {
                            display: inline-block;
                            margin-right: 20px;
                        }
                    }
                }
                .footer-top-right {
                    .contact-us {
                        color: @bbxGray;
                        font-size: 14px;
                        padding: 5px 0px;
                    }
                    p {
                        padding: 5px 0px;
                    }
                    ul {
                        padding-top: 10px;
                        li {
                            display: inline-block;
                            font-size: 0;
                            padding-right: 20px;
                            position: relative;
                            img {
                                width: 32px;
                                height: 32px;
                            }
                            a {
                                .wechat-code {
                                    display: none;
                                    width: 80px;
                                    height: 80px;
                                    position: absolute;
                                    left: -21px;
                                    top: 36px;
                                }
                                &:hover {
                                    .wechat-code {
                                        display: block;
                                    }
                                }
                            }
                            
                        }
                    }
                    .weixin-box {
                        width: 100%;
                        padding-top: 10px;
                        padding-bottom: 20px;
                        .weixin {
                            width: 74px;
                            padding: 0px 4px;
                            img {
                                width: 100%;
                                cursor: pointer;
                            }
                            p {
                                padding-top: 2px;
                                text-align: center;
                                margin-bottom: 0px;
                            }
                        }
                    }
                }
            }
            .pc-footer-middle {
                max-width: 100%;
                word-wrap : break-word;
                border-top: 1px solid #272d40;
                padding: 20px 0;
                // padding-bottom: 30px;
                >span {
                    padding-right: 10px;
                }
                >a {
                    padding-right: 10px;
                    color: @bbxFooterColor;
                }
            }
            .pc-footer-bottom {
                height: 30px;
                padding-top: 14px;
                border-top: 1px solid #272d40;
            }
        }
    }
    
}
@media screen and (max-width: 420px) {
    .pc-footer {
      height: 760px;
    }
}
</style>
