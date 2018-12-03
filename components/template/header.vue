<template>
<header class="pc-header">
    <div class="pc-header-web">
                  <a :href="apiConfig.mainDomain + `?lang=${locale}`" class="logo"><img src="../../assets/img/bbx_logo.svg" /></a>
            <a class="exchange one"  :href="`${apiConfig.mainDomain}/exchange?coinPair=XDAG/USDT&lang=${locale}`">{{$t('header.EXCHANGE')}}</a>
            <nuxt-link class="exchange" :style="$route.path === '/' && 'color: #5f8ed4'" to="/" >{{ $t('header.trade') }}<span class="huo"></span></nuxt-link>
            <a class="exchange"  :href="`${apiConfig.mainDomain}/c2c_trade?lang=${locale}`">{{$t('header.c2c')}}</a>
            <!-- <nuxt-link class="exchange" :style="$route.path === '/bonus' && 'color: #5f8ed4'" to="/bonus" >{{ $t('bonus.bonus') }}<span class="huo"></span></nuxt-link> -->
            <nuxt-link class="exchange" :style="$route.path === '/bonus' && 'color: #5f8ed4'" to="/game" >{{ $t('game.hyds') }}<span class="huo"></span></nuxt-link>
            <a class="exchange" :href="token ? `${apiConfig.mainDomain}/assets/rebate?lang=${locale}` : 'https://support.bbx.com/hc/zh-cn/articles/360004879913'" target="_blank">{{ $t('header.invitation') }}</a>
            <nav class="pc-nav clearfix">
              <div class="jump-list">
                 <a class="exchange" :href="`https://support.bbx.com/hc/${locale}/sections/360001701593`" >{{$t('header.swapStudent')}}<span class="huo"></span></a>
                <a :href="`${apiConfig.mainDomain}/download`" >{{$t('header.DOWNLOAD')}}</a>
                <a target="_blank" :href="`https://support.bbx.com/hc/${locale}`">{{$t('header.HELP')}}</a>
                <a target="_blank" :href="`https://support.bbx.com/hc/${locale}/categories/360000051514-%E5%85%AC%E5%91%8A%E4%B8%AD%E5%BF%83`">{{$t('header.ANNOUNCEMENT')}}</a>
                <a v-if="token" :href="`${apiConfig.mainDomain}/contract_asset/balance/contract?lang=${locale}&coin=${com.marginUnit}`">{{$t('header.ASSETS')}}</a>
                <!-- /contract_asset/balance/contract -->
              </div>
             <div v-if="token" class="avatar-box"><UserInfo></UserInfo></div>
            <div v-else class="no-login">
              <a @click="getUrl('register')"  class="sign-in">{{$t('header.SIGNUP')}}</a>
              <a @click="getUrl('login')"  class="log-in">{{$t('header.LOGIN')}}</a> 
            </div>
              <div class="language">
                <SwitchLanguage />
              </div>
            </nav>
    </div>
    <div class="pc-header-m">
             <div class="pc-header-h5">
                  <div class="menu">
                    
                    <img class="icon-close" src="../../assets/img/m/header/H5-ICON-close.svg" v-if="h5MenuShow"  @click="h5MenuShow = !h5MenuShow">
                    <img class="icon-menu" src="../../assets/img/m/header/H5-ICON-Setting.svg" v-else  @click="h5MenuShow = !h5MenuShow">
                     <a :href="apiConfig.mainDomain + `?lang=${locale}`" class="logo"><img src="../../assets/img/m/header/BBX-logo.svg" /></a>
                     <a v-if="token" :href="`${apiConfig.mainDomain}/usercenter/account_information/list`">
                     <img  class="avatar" src="../../assets/img/m/header/H5-heads-1.svg" alt="avatar"/>
                     </a>
                      <a v-else @click="getUrl('login')">
                        <img  class="avatar" src="../../assets/img/m/header/H5-ICON-my1.svg" alt="avatar"/>
                      </a>
                    
                  </div>
                  <ul v-if="h5MenuShow" class="nav-h5" @click="h5MenuShow = false">
                    <li><a  :href="apiConfig.mainDomain + `?lang=${locale}`">{{$t('header.first')}}</a></li>
                    <li> <a  :href="`${apiConfig.mainDomain}/exchange?coinPair=XDAG/USDT&lang=${locale}`">{{$t('header.EXCHANGE')}}</a></li>
                    <li><nuxt-link  :style="$route.path === '/' && 'color: #5f8ed4'" to="/" >{{ $t('header.trade') }}</nuxt-link></li>
                    <li><a  :href="`${apiConfig.mainDomain}/c2c_trade?lang=${locale}`">{{$t('header.c2c')}}</a></li>
                    <li> <nuxt-link :style="$route.path === '/bonus' && 'color: #5f8ed4'" to="/bonus" >{{ $t('bonus.bonus') }}</nuxt-link></li>
                    <li>
                       <a :href="token ? `${apiConfig.mainDomain}/assets/rebate?lang=${locale}` : 'https://support.bbx.com/hc/zh-cn/articles/360004879913'" target="_blank">{{ $t('header.invitation') }}</a>
                    </li>
                    <li>
                     <a :href="`${apiConfig.mainDomain}/download`" >{{$t('header.DOWNLOAD')}}</a>
                    </li>
                    <li>
                     <a target="_blank" :href="`https://support.bbx.com/hc/${locale}`">{{$t('header.HELP')}}</a>
                    </li>
                    <li>
                      <a target="_blank" :href="`https://support.bbx.com/hc/${locale}/categories/360000051514`">{{$t('header.ANNOUNCEMENT')}}</a>
                    </li>
                    <li v-if="token">
                      <a  :href="`${apiConfig.mainDomain}/contract_asset/balance/contract?lang=${locale}&coin=${com.marginUnit}`">{{$t('header.ASSETS')}}</a>
                    </li>
                    <li :key="item.value" v-for="item in list"  @click="changeLang(item.value)">
                      {{item.name}}
                    </li>
                  </ul>
                </div>
    </div>
</header>     
</template>

<script>
  import ApiConfig from '../../config/api.config'
  import UserInfo from './user-info'
  import SwitchLanguage from './switch-language'
  import cookie from '../../assets/js/cookie.js'
  export default {
    name: 'common-header',
    components: {
      UserInfo,
      SwitchLanguage
    },
    data() {
      return {
        apiConfig: ApiConfig,
        show: false,
        h5MenuShow: false,
        list: [
           {name: '简体中文', value: 'zh-cn'},
           {name: '繁體中文', value: 'zh-tw'},
            {name: 'English', value: 'en-us'}
        ]
      }
    },
    computed: {
      com() {
        return this.$store.state.com
      },
      token() {
        return this.$store.state.auth.token
      },
      locale() {
        return this.$store.state.auth.locale
      },
      path() {
        return this.$route.path
      }
    },
    watch: {
      locale() {
        window.Intercom('boot', {app_id: 'er2j1kdg', language_override: this.locale})
      }
    },
    methods: {
      changeLang(lang) {
        this.$store.commit('auth/SET_LOCALE', {
          locale: lang
        })
        cookie.setCookie('lang', lang, 7, '/', ApiConfig.domain)
        this._i18n.locale = lang
        this.getLocalenName()
        this.show = false
      },
      getUrl(type) {
        window.location.href = `${this.apiConfig.mainDomain}/${type}?path=${escape(window.location.href)}&lang=${this.locale}`
      }
    },
    mounted() {
      this.$store.dispatch('getUser')
      window.Intercom('boot', {app_id: 'er2j1kdg', language_override: this.locale})
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
 @import "../bx-ui/font/iconfont.css";
.pc-header {
  .pc-header-m {
    display: none;
  }
    width: 100%;
    // min-width: 1200px;
    height: 70px;
    padding: 0px 32px;
    box-sizing: border-box;
    background: @bbxNavBackground;
    color: @bbxGray;
    position: relative;
    z-index: 10010;
    .logo {
        text-align: center;
        float: left;
        img {
            margin-top: 12px;
            width: 94px;
        }
    }
    .exchange {
        position: relative;
        float: left;
        height: 70px;
        line-height: 70px;
        padding-left: 30px;
        font-size: 16px;
        color: #cdd5df;
        text-decoration: none;
        cursor: pointer;
        // &.one {
        //   padding-left: 60px;
        // }
        &:hover,&:active {
            color: #5f8ed4
        }
        .huo {
          position: absolute;
          top: 7px;
          right: -20px;
          background-image: url('../../assets/img/bonus/hot.svg');
          width: 42px;
          height: 16px;
        }
        .bate {
          position: absolute;
          top: 7px;
          right: -20px;
          background-image: url('../../assets/img/Beta.svg');
          width: 42px;
          height: 16px;
        }
    }
    .pc-nav {
        float: right;
        .jump-list {
            display:inline-block;
            height: 70px;
            line-height: 70px;
            padding-right: 5px;
            vertical-align: middle;

            a {
                padding: 0px 15px;
                font-size: 16px;
                color: #cdd5df;
                text-decoration: none;
                &:hover,&:active {
                    color: #5f8ed4
                }
            }
        }

        .no-login {
            display: inline-block;
        }
        
        .sign-in ,.log-in{
            display:inline-block;
            border: 1px solid #214063;
            background: #1f334d;
            //padding: 6px;
            min-width: 70px;
            height: 30px;
            line-height: 30px;
            color: @bbxGray;
            margin: 0px 10px;
            border-radius: 2px;
            cursor: pointer;
            outline: none;
            text-align: center;
            text-decoration: none;
            &.active {
                background: #2b93f6;
                color: #fff;
            }
        }
        .sign-in  {
            // margin-left: 20px;
        }

        .avatar-box {
            display: inline-block;
            width: 40px;
            height: 40px;
        }
         
        .language {
            display:inline-block;
            padding-left: 20px;
            //background: pink;
            
        }
    }
}
@media screen and (max-width:750px) {
  .pc-header {
    // min-width: 100%;
    height: 50px;
    padding:0px;
    .logo {
      img {
        margin-top: 4px;
        height: 30px;
      }
    }
    .pc-header-web {
      display: none;
    }
    .pc-header-m {
      display: block;
      .pc-header-h5 {
        width: 100%;
        height: 50px;
        padding: 0px 20px;
        box-sizing: border-box;
        background: @bbxNavBackground;
        color: @bbxGray;
        position: relative;
        z-index: 10010;
        border-bottom: 1px solid #313A56;
        .menu {
            display: flex;
            width: 100%;
            height: 50px;
            align-items: center;
            justify-content: space-between;
            // .icon-menu {

            // }
            .icon-menu,.icon-close {
                //font-size: 2rem;
                  width: 26px;
                  height: 26px;

            }
            .logo {
                height: 40px;
            }
            .avatar {
                height: 30px;
            }
        }
        .nav-h5 {
            width: 100%;
            background: @bodyBack;
            padding: 0px 20px;
            position: absolute;
            left: 0px;
            top: 50px;
            li {
                border-bottom: 1px solid @bbxNavBackground;
                
                height: 50px;
                line-height: 50px;
                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                    line-height: 50px;
                    color: @h5NavColor;
                }
            }
        }
    }
    }
  }
}
</style>
