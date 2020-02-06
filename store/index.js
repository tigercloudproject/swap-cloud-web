// import { aesEncrypy } from '../assets/js/aes.js'
// import { baseAxios } from '../assets/js/axiosConfig'
import SwapsApi from '~/assets/js/api/swapsApi'
import Formula from '../assets/js/formula/index.js'
import { MarginCoin } from '../assets/js/formula/common'
import Cookie from '../assets/js/cookie'
import ApiConfig from '../config/api.config'
import { aesEncrypy } from '../assets/js/aes.js'
import Md5 from '../assets/js/md5'
export const actions = {
  // 初始化配置
  async nuxtServerInit(store, { req }) {
    if (req.token) {
      store.commit('auth/SET_TOKEN', {
        token: req.token
      })
      // let nonce = new Date().valueOf() + '000'
      // baseAxios.defaults.headers['Bbx-Ts'] = nonce
      // req.ssid && (baseAxios.defaults.headers['Bbx-Ssid'] = req.ssid)
      // req.uid && (baseAxios.defaults.headers['Bbx-Uid'] = req.uid)
      // req.locale && (baseAxios.defaults.headers['Bbx-Language'] = req.locale)
      // req.token && (baseAxios.defaults.headers['Bbx-Sign'] = aesEncrypy(req.token, nonce))
    }
    // if (req.locale) {
    //   store.commit('auth/SET_LOCALE', {
    //     locale: req.locale
    //   })
    // }
    let initData = [
      store.dispatch('getProductList', req)
    ]
    await Promise.all(initData).catch(err => { console.log(err, 22) })
  },
  // 获取合约集合
  getProductList({commit, dispatch, state}, req) {
    if (productList.length && !req.news) {
      return dispatch('setContracts', {productList, id: req.contract_id})
    } else {
      return dispatch('getContracts', req.contract_id)
    }
  },
  getContracts({dispatch}, contract_id) {
    return SwapsApi.getContracts().then(res => {
      let dt = res.data.contracts
      productList = dt
      dispatch('setContracts', {productList: dt, id: contract_id})
    })
  },
  setContracts({commit, dispatch}, obj) {
    commit('market/SET_PRODUCTLIST', {
      data: obj.productList
    })
    dispatch('setProductInfo', obj.id)
    for (let i = 0; i < obj.productList.length; i++) {
      commit('market/SAVE_DEEP', {
        key: obj.productList[i].contract.contract_id + '_Order',
        data: []
      })
    }
  },
  // 修改合约类型
  setProductInfo({commit, state}, contract_id) {
    let productList = state.market.productList
    if (!productList) {
      return false
    }
    let info = productList[0]
    let len = productList.length
    if (contract_id) {
      for (;len--;) {
        if (productList[len].contract.contract_id === Number(contract_id)) {
          info = productList[len]
          break
        }
      }
    }
    commit('com/SET_COMMON', {
      priceUnit: info.contract.price_unit.length - info.contract.price_unit.indexOf('.') - 1,
      volUnit: info.contract.vol_unit.length - info.contract.vol_unit.indexOf('.') - 1,
      valueUnit: info.contract.value_unit.length - info.contract.value_unit.indexOf('.') - 1,
      marginUnit: MarginCoin(info.contract.base_coin, info.contract.quote_coin, info.contract.price_coin)
    })
    commit('market/SET_PRODUCT', {
      data: info
    })
  },
  // 获取所有数据
  getMarketDate({commit, dispatch, state}) {
    dispatch('clearDateTime')
    let contractID = state.market.productInfo.contract.contract_id
    // 获取深度
    let arr = [SwapsApi.depth({contractID, count: 100}), SwapsApi.getTickers(), SwapsApi.trades(contractID), SwapsApi.pnls(contractID)]
    Promise.all(arr)
    .then(res => {
      let contractID = state.market.productInfo.contract.contract_id
      commit('market/SAVE_DEEP', {
        key: contractID + '_Order',
        data: res[0].data
      })
      commit('market/SET_TICKER', {
        data: res[1].data.tickers ? res[1].data.tickers.filter(item => item.contract_id === contractID)[0] : []
      })
      commit('market/SET_MARKET', {
        key: 'tickerList',
        data: res[1].data.tickers || []
      })
      commit('market/SET_MARKET', {
        key: 'trades',
        data: res[2].data.trades
      })
      commit('market/SET_MARKET', {
        key: 'pnls',
        data: res[3].data.pnls && res[3].data.pnls[0]
      })
      let action = `"Depth:${contractID}","Trade:${contractID}","Ticker","PNL:${contractID}"`
      let errorFn = () => {
        clearTimeout(timeOut)
        if (window.webSocket_base.isConnection()) {
          window.webSocket_base.webSocketSend(`{"action":"subscribe","args":[${action}]}`)
        } else {
          timeOut = setTimeout(() => {
            dispatch('getMarketDate', contractID)
          }, 2000)
        }
      }
      window.webSocket_base.errorCallBackFunObj['Ticker'] = errorFn
      for (let item in window.webSocket_base.successFn) {
        if (~item.indexOf('Trade')) {
          delete window.webSocket_base.successFn[item]
        }
      }
      window.webSocket_base.successFn[`Trade:${contractID}`] = (res) => {
        // if (!~res.group.indexOf(contractID)) return false
        // if (res.data && state.market.trades && res.data[0] && state.market.trades[0]) {
        //   if (res.data[0].contract_id !== state.market.trades[0].contract_id) return false
        // }
        commit('market/SET_MARKET', {
          key: 'trades',
          data: [...res.data, ...state.market.trades]
        })
      }
      window.webSocket_base.successFn['Ticker'] = (res) => {
        let id = res.data.contract_id
        if (contractID === id) {
          commit('market/SET_TICKER', {
            data: res.data
          })
        }
        let tickerList = state.market.tickerList.map(item => {
          return item.contract_id === id ? res.data : item
        })
        commit('market/SET_MARKET', {
          key: 'tickerList',
          data: tickerList
        })
      }
      window.webSocket_base.successFn[`Depth:${contractID}`] = (res) => {
        let obj = {...state.market[contractID + '_Order']}
        obj[res.data.way === 1 ? 'buys' : 'sells'] = res.data.depths
        commit('market/SAVE_DEEP', {
          key: contractID + '_Order',
          data: obj
        })
      }
      window.webSocket_base.successFn[`PNL:${contractID}`] = (res) => {
        commit('market/SET_MARKET', {
          key: 'pnls',
          data: res.data
        })
      }
      themeOut = `{"action":"unsubscribe","args":[${action}]}`
      window.webSocket_base.webSocketSend(`{"action":"subscribe","args":[${action}]}`)
    }).catch(e => {
      clearTimeout(timeOut)
      timeOut = setTimeout(() => {
        dispatch('getMarketDate', contractID)
      }, 2000)
    })
  },
  getUser({commit, state}) {
    if (!state.auth.token) {
      return false
    }
    if (ApiConfig.isYun) {
      // 处理用户信息
      commit('auth/SAVE_USERINFO', { data: {
        account_type: 1,
        phone: 123,
        status: 1,
        user_assets: [{
          coin_code: 'USDT',
          available_vol: '100'
        }]
      } })
    } else {
      SwapsApi.getAssets().then(res => {
        commit('auth/SAVE_USERINFO', { data: res.data })
      })
    }
  },
  // 获取用户相关数据
  getUserDate({commit, state, dispatch}) {
    if (!state.auth.token) {
      return false
    }
    let contractID = state.market.productInfo.contract.contract_id
    // 获取用户资产 获取用户仓位 获取用户订单
    let productList = state.market.productList
    if (!productList) {
      return false
    }
    let len = productList.length
    let contract = state.market.productInfo.contract
    let valueUnit = state.com.marginUnit
    // SwapsApi.getAssets(),
    let arr = [SwapsApi.accounts(valueUnit), SwapsApi.getUserOrders(contractID, 3), SwapsApi.getUserPositions(contractID, 3)]
    let info
    for (;len--;) {
      info = productList[len].contract
      if (valueUnit === Formula.MarginCoin(info.base_coin, info.quote_coin, info.price_coin) && info.contract_id !== contract.contract_id) {
        arr.push(SwapsApi.getUserPositions(info.contract_id, 3))
        // break
      }
    }
    Promise.all(arr)
    .then(res => {
      // commit('auth/SAVE_USERINFO', { data: res[0].data })
      let account = res[0].data.accounts[0]
      commit('auth/SET_ACCOUNTS', {
        data: account
      })
      commit('com/SET_COMMON', {
        showOpenAccount: !account
      })
      commit('market/SET_CURRYENTRUSTLIST', {
        data: res[1].data.orders
      })
      commit('market/SET_CABINLIST', {
        data: res[2].data.positions || []
      })
      let list = []
      res.filter((item, index) => {
        return index > 2
      }).forEach(item => {
        if (item && item.data && item.data.positions) {
          list.push(...item.data.positions)
        }
      })
      commit('market/SET_CABINLIST_OTHER', {
        data: list
      })
      dispatch('positionCalculate')
    }).catch(e => {
      if (e.errno === 'FORBIDDEN') {
        commit('auth/SET_TOKEN', {
          token: null
        })
        Cookie.clearCookie('token', ApiConfig.domain)
        Cookie.clearCookie('uid', ApiConfig.domain)
        window.location.href = `${ApiConfig.mainDomain}/login?path=${escape(window.location.href)}&lang=${state.auth.locale}`
      } else if (e.errno === 'BAD_REQUEST') {
        Cookie.clearCookie('token', ApiConfig.domain)
        Cookie.clearCookie('uid', ApiConfig.domain)
        window.location.reload()
      } else {
        setTimeout(() => {
          dispatch('getUserDate', contractID)
        }, 2000)
      }
    })
  },
  positionCalculate({commit, state}) {
    let contractID = state.market.productInfo.contract.contract_id
    // 所有全仓的亏损
    let positionLoss = 0
    // 除本仓位的全仓亏损
    let otherLossLong = 0
    let otherLossSort = 0
    let PNL = 0
    let imTotal = 0
    let fair_price, contract
    // let haveAssert = state.auth.accounts ? Number(state.auth.accounts.available_vol) : 0
    // let liquidateAssertLong = haveAssert
    // let liquidateAssertSort = haveAssert
    // 接口新增字段: margin_balance 保证金余额，available_balance 可用余额，trans_out_balance 可划出余额，total_im 保证金总额
    let haveAssert = state.auth.accounts ? Number(state.auth.accounts.available_balance) : 0
    let liquidateAssertLong = Number(state.auth.accounts.margin_balance)
    let liquidateAssertSort = Number(state.auth.accounts.margin_balance)
    let list = [...state.market.cabinListOther, ...state.market.cabinList]
    let len = list.length
    for (;len--;) {
      let item = list[len]
      if (item) {
        fair_price = Number(state.market.tickerList.filter(info => info.contract_id === item.contract_id)[0].fair_price)
        contract = state.market.productList.filter(info => info.contract.contract_id === item.contract_id)[0].contract
        item.loss = (Number(Formula.LongOrSort(item.hold_vol, item.hold_avg_price, fair_price, Formula.contractObj.getContract(contract), item.position_type === 1)) || 0)
        // 计算所有的未实现盈亏和
        PNL += item.loss
        // 计算所有的开仓保证金和
        // imTotal += Number(item.im)
        imTotal = Number(state.auth.accounts.total_im)
        // 处理全仓情况下仓位亏损
        if (item.open_type === 2) {
          positionLoss += item.loss
          if (item.contract_id === contractID) {
            if (item.position_type === 2) {
              otherLossLong += item.loss
            } else {
              otherLossSort += item.loss
            }
          } else {
            otherLossSort += item.loss
          }
        }
      }
    }
    positionLoss = positionLoss > 0 ? 0 : positionLoss
    otherLossLong = otherLossLong > 0 ? 0 : otherLossLong
    // 计算开仓可用余额
    // haveAssert += Number(positionLoss)
    // haveAssert = haveAssert < 0 ? 0 : haveAssert
    // 计算强平价格的可用余额
    liquidateAssertLong += Number(otherLossLong)
    liquidateAssertLong = liquidateAssertLong < 0 ? 0 : liquidateAssertLong
    // liquidateAssertSort += Number(otherLossSort)
    liquidateAssertSort = Number(otherLossSort) > 0 ? liquidateAssertSort : liquidateAssertSort + Number(otherLossSort)
    liquidateAssertSort = liquidateAssertSort < 0 ? 0 : liquidateAssertSort
    commit('com/SET_COMMON', { positionLoss, PNL, haveAssert, liquidateAssertLong, liquidateAssertSort, imTotal })
  },
  userWebSocket({state, dispatch}) {
    if (!state.auth.token) {
      return false
    }
    dispatch('userSend')
    let contractID = state.market.productInfo.contract.contract_id
    let userErrorFn = () => {
      clearTimeout(userTimeOut)
      if (window.webSocket_base.isConnection()) {
        dispatch('userWebSocket')
      } else {
        userTimeOut = setTimeout(() => {
          dispatch('getUserDate', contractID)
        }, 2000)
      }
    }
    window.webSocket_base.errorCallBackFunObj['userErrorFn'] = userErrorFn
  },
  userSend({state, dispatch}) {
    let timestamp = new Date().valueOf()
    let nonce = timestamp + '000'
    if (ApiConfig.isYun) {
      let token = (new Md5(Cookie.getCookie('token') + nonce)).hash()
      let expired_ts = Cookie.getCookie('expired_ts') // expired_ts 超时时间
      let access_key = Cookie.getCookie('access_key')
      window.webSocket_base.webSocketSend(`{"action":"access","args":["${access_key}","web","1.0","${token}","${nonce}", "${expired_ts}"]}`)
    } else {
      let token = aesEncrypy(Cookie.getCookie('token'), nonce)
      window.webSocket_base.webSocketSend(`{"action":"authenticate","args":["${Cookie.getCookie('uid')}","web","1.0","${token}","${nonce}"]}`)
    }
    window.webSocket_base.successFn[ApiConfig.isYun ? 'access' : 'authenticate'] = (res) => {
      window.webSocket_base.webSocketSend(`{"action":"subscribe","args":["unicast"]}`)
      window.webSocket_base.successFn['CUD'] = (res) => {
        dispatch('userMessageDispose', res.data)
      }
    }
  },
  userMessageDispose({state, commit, dispatch}, data) {
    let data_len = data.length
    let i = data_len
    if (data_len) {
      let contractID = state.market.productInfo.contract.contract_id
      let cabinList = [...state.market.cabinList]
      let curryEntrustList = [...state.market.curryEntrustList]
      let cabinListOther = [...state.market.cabinListOther]
      // 保证金不同不处理
      if (data[data_len - 1].c_assets && data[data_len - 1].c_assets.coin_code !== state.auth.accounts.coin_code) {
        return
      }
      let c_assets, s_assets
      for (;i--;) {
        if (!c_assets && data[i].c_assets) {
          c_assets = data[i].c_assets
        }
        if (!s_assets && data[i].s_assets) {
          s_assets = data[i].s_assets
        }
        if (data[i].order && contractID === data[i].order.contract_id) {
          curryEntrustList = curryEntrustList.filter(item => {
            return item.order_id !== data[i].order.order_id
          })
          if (~[1, 2].indexOf(data[i].order.status)) { // 1:申报中 4.委托记录先不处理
            curryEntrustList.push(data[i].order)
          }
          commit('market/SET_CURRYENTRUSTLIST', {
            data: curryEntrustList
          })
        }
        if (data[i].position) {
          // "status": 1, // 状态,1:持仓中,2:系统托管中,4:已平仓
          if (data[i].position.contract_id === contractID) {
            cabinList = cabinList.filter(item => {
              return item.position_id !== data[i].position.position_id
            })
            if (data[i].position.status === 1) { // 1:申报中
              cabinList.push(data[i].position)
            }
            commit('market/SET_CABINLIST', {
              data: cabinList
            })
          } else {
            let bl = true
            // 判断同保证金币下其他合约变化
            cabinListOther = cabinListOther.map(item => {
              let it = [...item]
              it = it.map(info => {
                if (info.contract_id === data[i].position.contract_id && info.position_id === data[i].position.position_id) {
                  bl = false
                  if (data[i].position.status === 1) {
                    return data[i].position
                  } else {
                    return
                  }
                }
                return info
              }).filter(info => info)
              return it
            })
            if (bl) {
              cabinListOther.push([data[i].position])
            }
            commit('market/SET_CABINLIST_OTHER', {
              data: cabinListOther
            })
          }
        }
      }
      // 合约资产
      if (c_assets) {
        commit('auth/SET_ACCOUNTS', {
          data: c_assets
        })
      }
      // 现货资产
      if (s_assets) {
        let ui = {...state.auth.userInfo}
        ui.user_assets = ui.user_assets.map(item => {
          return s_assets.coin_code === item.coin_code ? s_assets : item
        })
        commit('auth/SAVE_USERINFO', {
          data: ui
        })
      }
      dispatch('positionCalculate')
    }
  },
  clearDateTime() {
    clearTimeout(timeOut)
    clearTimeout(userTimeOut)
    if (themeOut) {
      window.webSocket_base.webSocketSend(themeOut)
      delete window.webSocket_base.errorCallBackFunObj['Ticker']
    }
  }
}
let productList = []
let timeOut = null
let userTimeOut = null
let themeOut = null
