export const state = () => ({
  token: null,
  uid: null,
  ssid: null,
  locale: 'zh-cn',
  userInfo: null,
  accounts: null
})

export const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload.token
  },
  SET_UID(state, payload) {
    state.uid = payload.uid
    state.ssid = payload.ssid
  },
  SET_LOCALE(state, payload) {
    payload.locale && (state.locale = payload.locale)
  },
  SAVE_USERINFO(state, payload) {
    state.userInfo = payload.data
  },
  SET_ACCOUNTS(state, payload) {
    state.accounts = payload.data
  }
}
