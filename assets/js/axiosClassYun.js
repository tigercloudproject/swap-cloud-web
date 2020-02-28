import axios from 'axios'
// import qs from 'qs'
import cookie from './cookie'
// import Config from '../../config/api.config'
import Md5 from './md5'
// import VueX from 'vuex'
import Alert from '../../components/bx-ui/alert/index'
import BASE from '../../config/base'
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

      // =======================================================================
      // 更新 token、expired_ts、timestamp_val、access_key
      var token_val = '' || BASE.cloudToken
      var expired_ts_val = '' || (timestamp + BASE.cloudEffectiveTime * 60 * 1000) + '000' // 时间戳超时时效
      var timestamp_val = '' || timestamp + '000' // 微秒单位
      var access_key_val = '' || BASE.cloudAccessKey
      // =======================================================================

      config.headers.common['tc-Ver'] = '1.0'
      config.headers.common['tc-Dev'] = 'web'
      config.headers.common['tc-Ts'] = timestamp_val
      config.headers.common['Content-Type'] = 'application/json'
      // config.headers.common['Access-Control-Max-Age'] = '60'
      try {
        cookie.setCookie('token', token_val, '', '/', BASE.domain)
        cookie.setCookie('expired_ts', expired_ts_val, '', '/', BASE.domain)
        cookie.setCookie('access_key', access_key_val, '', '/', BASE.domain)

        let token = cookie.getCookie('token') // secret
        // let locale = cookie.getCookie('lang')
        let expired_ts = cookie.getCookie('expired_ts') // expired_ts 超时时间
        let access_key = cookie.getCookie('access_key') // api_key
        // let version = cookie.getCookie('version')
        // let options = cookie.getCookie('options')
        // if (version && options) {
        //   config.headers.common['tc-Ver'] = version
        //   config.headers.common['tc-Dev'] = options
        // }
        // if (!locale || ~locale.indexOf('en')) {
        //   locale = 'en'
        // }
        // console.log(config.url, new Date())
        // console.log(document.cookie, 33, token)
        // 需要第三方服务器生成 m = md5(sercet_key + 商家唯一标识 + 时间戳)
        if (token) {
          // token = new Md5(token + 'bbx' + timestamp_val)
          let _body = body && JSON.stringify(body)
          config.headers.common['tc-Sign'] = (new Md5(_body + token + timestamp_val)).hash()
        }
        if (expired_ts) {
          config.headers.common['tc-ExpiredTs'] = expired_ts
        }
        if (access_key) {
          config.headers.common['tc-Accesskey'] = access_key
        }
        // config.headers.common['tc-Language'] = locale
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
      // let token = res.headers['tc-token']
      // let uid = res.headers['tc-uid']
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
