import axios from 'axios'
// import qs from 'qs'
import cookie from './cookie'
// import Config from '../../config/api.config'
import Md5 from './md5'
// import VueX from 'vuex'
import Alert from '../../components/bx-ui/alert/index'
// import Vue from 'vue'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
class AxiosClass {
  constructor(url, isInternal = true) {
    this.service = axios.create({ baseURL: url })
    this.isInternal = isInternal
    this.intercept()
    this.error()
    return this.service
  }
  intercept() {
    // 拦截器
    this.service.interceptors.request.use(config => {
      // post方法并且数据不是formData，序列化参数
      // if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
      //   config.data = qs.stringify(config.data)
      // }
      let body = ''
      if (config.method === 'post') {
        body = config.data || ''
      }
      let timestamp = new Date().valueOf()
      let nonce = timestamp + '000'
      // config.headers.common['Bbx-Ver'] = '1.0'
      // config.headers.common['Bbx-Dev'] = 'web'
      config.headers.common['Bbx-Ts'] = nonce
      config.headers.common['Content-Type'] = 'application/json'
      // config.headers.common['Access-Control-Max-Age'] = '60'
      try {
        cookie.setCookie('token', '461581496df9211abeaddf3cb108129a', '', '/', 'test.com')
        cookie.setCookie('expired_ts', '1544165433', '', '/', 'test.com')
        cookie.setCookie('access_key', 'ebb1b16a-3556-45b3-ad00-13d3120ba834', '', '/', 'test.com')
        // let ssid = cookie.getCookie('ssid')  cookie.getCookie('token') ||
        let token = cookie.getCookie('token') // secret
        // let locale = cookie.getCookie('lang')
        let expired_ts = cookie.getCookie('expired_ts') // expired_ts 超时时间
        let access_key = cookie.getCookie('access_key')// api_key
        // let version = cookie.getCookie('version')
        // let options = cookie.getCookie('options')
        // if (version && options) {
        //   config.headers.common['Bbx-Ver'] = version
        //   config.headers.common['Bbx-Dev'] = options
        // }
        // if (!locale || ~locale.indexOf('en')) {
        //   locale = 'en'
        // }
        // console.log(config.url, new Date())
        // console.log(document.cookie, 33, token)
        // 需要第三方服务器生成 m = md5(sercet_key + 商家唯一标识 + 时间戳)
        if (token) {
          // token = new Md5(token + 'bbx' + nonce)
          let _body = body && JSON.stringify(body)
          config.headers.common['Bbx-Sign'] = (new Md5(_body + token + nonce)).hash()
        }
        if (expired_ts) {
          config.headers.common['Bbx-ExpiredTs'] = expired_ts
        }
        if (access_key) {
          config.headers.common['Bbx-Accesskey'] = access_key
        }
        // config.headers.common['Bbx-Language'] = locale
      } catch (err) {
      }
      // if (~config.url.indexOf('?')) {
      //   config.url = config.url + '&t=' + Date.now()
      // } else {
      //   config.url = config.url + '?t=' + Date.now()
      // }
      return config
    }, error => {
      return Promise.reject(error)
    })
  }
  error() {
    this.service.interceptors.response.use(res => {
      // let token = res.headers['bbx-token']
      // let uid = res.headers['bbx-uid']
      // if (token) {
      //   cookie.setCookie('token', token, 1, '/', config.domain)
      // }
      // if (uid) {
      //   cookie.setCookie('uid', uid, 1, '/', config.domain)
      // }
      if (this.isInternal) {
        if (parseInt(res.status) === 204) { return res }
        if (parseInt(res.status) !== 200) return Promise.reject(res)
      /*
       * 状态码0判断，成功返回，失败则根据error.status判断是请求成功还是请求失败
       * error.status为true，则表示请求成功，此时根据后台返回状态码编写回调逻辑
       * error.status不存在，则表示请求失败（网络原因、请求状态不为200等原因）
       */
        if (res.data.errno === 'OK') return res.data
        if (process.client && !~['FORBIDDEN', 'ACCESS_TOO_OFTEN'].indexOf(res.data.errno)) {
          Alert(res.data.message)
        } else {
          console.log(res.data.message)
        }
        return Promise.reject(res.data)
      } else {
        if (parseInt(res.status) !== 200) return Promise.reject(res)
        return res.data
      }
    }, error => {
      return Promise.reject(error)
    })
  }
}

export default AxiosClass
