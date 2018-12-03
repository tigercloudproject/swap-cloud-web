<template>
 <div class="lang-box">
        <div class="lang-mask" v-if="show" @click="show = false"></div>
        <span class="lang-name" @click="show = !show">
          <span>{{name}}</span>
        </span>
        <ul class="lang-list" v-if="show">
              <li  :key="item.value" v-for="item in list" :class="item.value === locale ? 'active' : '' " @click="changeLang(item.value)">
              {{item.name}}
             </li>
        </ul>
      </div>
</template>
<script>
  import cookie from '../../assets/js/cookie.js'
  import ApiConfig from '../../config/api.config.js'
  export default {
    name: 'switch-language',
    components: {
    },
    data() {
      return {
        show: false,
        name: '',
        list: [
           {name: '简体中文', value: 'zh-cn'},
           {name: '繁體中文', value: 'zh-tw'},
            {name: 'English', value: 'en-us'},
            {name: '한국어', value: 'ko-kr'}
        ]
      }
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
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
      getLocalenName() {
        let info = this.list.filter(item => {
          return item.value === this.locale
        })[0] || this.list[0]
        this.name = info.name
      },
      getBrowserLang() {
        var lang = navigator.language || navigator.userLanguage // 常规浏览器语言和IE浏览器
        // lang = lang.substr(0, 2) // 截取lang前2位字符
        if (!cookie.getCookie('lang') && lang) {
          if (lang === 'en') {
            lang = 'en-us'
          }
          this.$store.commit('auth/SET_LOCALE', {
            locale: lang
          })
          cookie.setCookie('locale', lang, 7, '/', ApiConfig.domain)
          this._i18n.locale = lang
        }
      }
    },
    mounted() {
      // this.getBrowserLang()
      this.getLocalenName()
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.lang-box {
    position: relative;
    
    .lang-name{
        display: inline-block;
        padding-right: 4px;
        cursor: pointer;
        &::after{
            content: '';
            position: relative;
            top: 12px;
            left: 2px;
            display: inline;
            border-width:6px 6px 0;
            border-style:solid;
            border-color:#cad2dc transparent transparent;/*灰 透明 透明 */
            vertical-align: middle;
        }
    }
    .lang-list {
        display: inline-block;
        position: absolute;
        border: 1px solid #313a56;
        border-top: none;
        background: #1f2636;
        width: 120px;
        text-align: center;
        right: -22px;
        top: 40px;
        font-size: 12px;
        z-index: 1000;
        li {
            height: 30px;
            line-height: 30px;
            cursor: pointer;
            color: #cad2dc;
            &:hover,&.active {
                background: rgba(49,58,86,30.3);
            }
        }
    }
    .lang-mask {
        position: fixed;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
    }
}
</style>
