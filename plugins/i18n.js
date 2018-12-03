import Vue from 'vue'
import VueI18n from 'vue-i18n'

import CN from '~/locales/cn.json'
import EN from '~/locales/en.json'
import ko from '~/locales/ko.json'
Vue.use(VueI18n)
export default ({ app, store, req }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and trade asyncData/fetch
  if (req && req.locale) {
    store.commit('auth/SET_LOCALE', {
      locale: req.locale
    })
  }
  let locale = store.state.auth.locale
  let messages = {
    'zh-cn': {...CN},
    'en-us': {...EN},
    'zh-tw': {...EN},
    'ko-kr': {...ko}
  }
  if (!locale || !messages[locale]) {
    locale = 'zh-cn'
  }
  // let language = (cookie.getCookie('locale') && global.sessionStorage.language) ? global.sessionStorage.language : 'cn'
  app.i18n = new VueI18n({
    locale: locale,
    messages
  })
  Vue.$i18n_t = (key) => { return app.i18n.t(key) }
}
