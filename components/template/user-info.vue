<template>
     <div class="header-user-info-box">
                <div class="header-mask" v-if="show" @click="show = false" ></div>
                <img src="../../assets/img/icon-heads.png" class="header-avatar" @click="show = true"/>
                <div class="header-user-info" v-if="show" @click="show = false">
                    <a :href="`${apiConfig.mainDomain}/usercenter/account_information/list`">
                        <div class="account-info">
                            <h3>{{$t('header.header_account')}}</h3>
                            <div class="account">
                                {{userInfo.account_type == 2 ? userInfo.phone :userInfo.email}}
                            </div>
                            <div class="orange">{{userInfo.status == 1 ? $t('header.header_inactive') : ''}}</div>
                        </div>
                    </a>
                    <!-- <a :href="`${apiConfig.mainDomain}/assets/balance/coin`">
                        <div class="account-balance">
                            <h3>{{$t('header.header_blance')}}</h3>
                            <p>{{ 0}} USD</p>
                        </div>
                    </a> -->
                    <a class="exit" @click="logout">
                        {{$t('header.header_exit')}}
                    </a>
                </div>
            </div>
</template>
<script>
  import Cookie from '../../assets/js/cookie'
  import ApiConfig from '../../config/api.config'
  export default {
    name: 'common-header',
    components: {
    },
    data() {
      return {
        apiConfig: ApiConfig,
        show: false,
        balance: 0
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.auth.userInfo
      }
    },
    methods: {
      logout() {
        this.swapsApi.userLogout().then(res => {
          Cookie.clearCookie('tocken', this.apiConfig.domain)
          Cookie.clearCookie('uid', this.apiConfig.domain)
          window.location.reload()
        })
      }
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";

.header-user-info-box {
    position: relative;
    .header-mask {
        position: fixed;
        left:0;
        right: 0;
        bottom: 0;
        top: 0;
        //background: rgba(0,0,0,0.5);
    }
    .header-avatar {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
    .header-user-info {
        min-width: 200px;
        position: absolute;
        padding: 0px 10px;
        text-align: center;
        color: #cad2dc;
        background: #1f2636;
        font-size: 12px;
        left: -77px;
        top: 60px;
        border: 1px solid #313a56;
        border-radius: 6px;
        >a{
            display: block;
            text-decoration: none;
            color: #cad2dc;
            cursor: pointer;
            &:hover {
                background: rgba(49,58,86,30.3);
            }
        }
        &::before {
            content: "";
            width: 0;
            height: 0;
            border-width: 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent #313a56;
            position: absolute;
            margin-left: -12px;
            top: -10px;
        }
        .account-info {
            border-bottom: 1px solid #2c354d;
            padding: 10px 0px;
            .uid {
                color: #89919d;
            }
            .orange {
                color: @bbxOrange;
            }
            .red {
                color: @bbxRed;
            }
            h3 {
                padding: 0;
                margin: 0;
                font-weight: normal;
                color: #8b929f;
            }
        }
        .account-balance {
            padding: 10px 0px;
            border-bottom: 1px solid #2c354d;
            h3 {
                padding: 0;
                margin: 0;
                font-weight: normal;
                color: #8b929f;
            }
            p {
                margin: 0;
                padding: 0;
                font-size: 14px;
                white-space: nowrap;
            }
        }
        .exit {
            display: block;
            color: #cdd5df;
            padding: 10px 0px;
        }
        .settings{
            display: block;
            color: #cdd5df;
            padding: 10px 0px;
            border-bottom: 1px solid #2c354d;
            cursor: pointer;
        }
    }
}
</style>
