import { swapsAxios } from '../axiosConfig'
import BASE from '../../../config/base'

let ifaccount = 'ifaccount'
let ifcontract = 'ifcontract'
let swapsApi = {
  // 获取k线数据
  getBar(code, type, unit, start, end) {
    // end = end ? end : Date.parse(String(new Date()).replace(/-/g, "/"));
    // end = Date.parse(String(new Date()).replace(/-/g, '/'))
    // if (isIncremental) { // 增量查询
    //   start = end - 10000
    // } else { // 查询全部
    //   start = start || (end - 86400000)
    // }
    start = parseInt(start / 1000)
    end = parseInt(end / 1000)
    code = code || 1
    type = type || ''
    code = String(code)
    let getUrl
    getUrl = ifcontract + '/quote?contractID=' + code + '&startTime=' + start + '&endTime=' + end + '&resolution=' + type + '&unit=' + unit
    return swapsAxios.get(getUrl)
  },
  // 退出
  userLogout() {
    return swapsAxios.get(ifaccount + '/logout')
  },
  // 获得用户信息
  getAssets() {
    return swapsAxios.get(ifaccount + '/users/me')
  },
  // 获取合约集合
  getContracts(contractID) {
    return swapsAxios.get(ifcontract + '/contracts', {params: {
      contractID,
      exchange: BASE.exchangeName
    }})
  },
  // 获取当前委托和历史委托
  // 订单状态 1:申报中 2:委托中 4:完成 如果请求参数status=3,标识同时请求申报中和委托中的订单,如果请求参数status=0或者7,标识同时请求所有状态的订单
  getUserOrders(contractID, status, offset, size) {
    return swapsAxios.get(ifcontract + '/userOrders', {params: {
      contractID,
      offset,
      size,
      status
    }})
  },
  // 获取仓位和历史仓位
  //  1:持仓中 2:系统委托中 4:已平仓 如果请求参数中的status值为3,标识同时请求持仓中和系统委托中的仓位 如果请求参数中的status值为0或者7,标识同时请求所有状态的仓位
  getUserPositions(contractID, status, offset, size) {
    return swapsAxios.get(ifcontract + '/userPositions', {params: {
      contractID,
      offset,
      size,
      status
    }})
  },
  // 提交订单
  submitOrder(obj) {
    return swapsAxios.post(ifcontract + '/submitOrder', obj)
  },
  // 取消订单(支持批量取消)
  cancelOrders(obj) {
    return swapsAxios.post(ifcontract + '/cancelOrders', obj)
  },
  // 深度
  depth(obj) {
    return swapsAxios.get(ifcontract + '/depth', {params: obj})
  },
  // 获取合约的交易记录
  trades(contractID) {
    return swapsAxios.get(ifcontract + '/trades', {params: {contractID}})
  },
  // 获取用户的交易记录
  userTrades(contractID, offset, size) {
    return swapsAxios.get(ifcontract + '/userTrades', {params: {contractID, offset, size}})
  },
  // 获取用户资产
  accounts(coinCode) {
    return swapsAxios.get(ifcontract + '/accounts', {params: {coinCode}})
  },
  // 获取行情
  getTickers(contractID) {
    return swapsAxios.get(ifcontract + '/tickers', {params: {contractID}})
  },
  // 获取用户的爆仓记录
  userLiqRecords(orderID) {
    return swapsAxios.get(ifcontract + '/userLiqRecords', {params: {orderID}})
  },
  // 获取用户一个订单的详细交易记录
  orderTrades(contractID, orderID) {
    return swapsAxios.get(ifcontract + '/orderTrades', {params: {contractID, orderID}})
  },
  // 获取合约仓位的自动减仓排序表
  pnls(contractID) {
    return swapsAxios.get(ifcontract + '/pnls', {params: {contractID}})
  },
  // 转账接口 "type":1  1 交易所=>合约  2 合约=>交易所
  transferFunds(coin_code, vol, type) {
    return swapsAxios.post(ifcontract + '/transferFunds', {coin_code, vol, type})
  },
  // 获取可转金额
  // transferFundsMoney(type) {
  //   return swapsAxios.get(ifaccount + '/transferFunds', { params: { type: type } })
  // },
  //  获取指数列表
  getIndexList() {
    return swapsAxios.get(ifcontract + '/indexes')
  },
  // 获取指数k线数据
  getIndexBar(code, type, unit, start, end) {
    start = parseInt(start / 1000)
    end = parseInt(end / 1000)
    code = code || 1
    type = type || ''
    code = String(code)
    let getUrl
    getUrl = ifcontract + '/indexquote?indexID=' + code + '&startTime=' + start + '&endTime=' + end + '&resolution=' + type + '&unit=' + unit
    return swapsAxios.get(getUrl)
  },
  // 获取合理价格k线数据
  getFpBar(code, type, unit, start, end) {
    start = parseInt(start / 1000)
    end = parseInt(end / 1000)
    code = code || 1
    type = type || ''
    code = String(code)
    let getUrl
    getUrl = ifcontract + '/fpquote?contractID=' + code + '&startTime=' + start + '&endTime=' + end + '&resolution=' + type + '&unit=' + unit
    return swapsAxios.get(getUrl)
  },
  // 给逐仓仓位追加或减少保证金 oper_type 1:追加保证金,2:减少保证金
  marginOper(contract_id, position_id, vol, oper_type) {
    let nonce = parseInt(Date.now() / 1000)
    return swapsAxios.post(ifcontract + '/marginOper', {contract_id, position_id, vol, oper_type, nonce})
  },
  // 获取资金费率
  fundingrate(contractID, offset, size = 10) {
    return swapsAxios.get(ifcontract + '/fundingrate', {params: {contractID, offset, size}})
  },
  // 创建合约账号
  createContractAccount(contractID) {
    return swapsAxios.get(ifcontract + '/createContractAccount', {params: {contractID}})
  },
  // 获取合约的保险金记录
  riskReserves(contractID, offset, size = 10) {
    return swapsAxios.get(ifcontract + '/riskReserves', {params: {contractID, offset, size}})
  },
  // 检查合约账户开通奖励是否被领取 action=check 领取合约账户开通奖励 action=receive
  openAccountReward(action) {
    return swapsAxios.get(ifcontract + '/activity/openAccountReward', {params: {action}})
  },
  // 检查合约充值奖励是否被领取 action=check 领取合约充值奖励 action=receive
  depositReward(action) {
    return swapsAxios.get(ifcontract + '/activity/depositReward', {params: {action}})
  },
  // 获取邀请返佣人数
  rebates() {
    return swapsAxios.get(ifaccount + '/rebates')
  },
  // 提交计划委托
  submitPlanOrder(info) {
    return swapsAxios.post(ifcontract + '/submitPlanOrder', info)
  },
  // 取消计划委托
  cancelPlanOrders(info) {
    return swapsAxios.post(ifcontract + '/cancelPlanOrders', info)
  },
  //  获取用户计划委托记录
  userPlanOrders(contractID, offset, status = 0, size = 10) {
    return swapsAxios.get(ifcontract + '/userPlanOrders', {params: {contractID, offset, size, status}})
  },
  //  获取用户计划委托记录
  userOrderInfo(contractID, orderID) {
    return swapsAxios.get(ifcontract + '/userOrderInfo', {params: {contractID, orderID}})
  },
  // 获取币种详情
  coinBrief(coinCode) {
    return swapsAxios.get('/ifglobal/coinBrief', {params: {coinCode}})
  },
  // 获取仓位资金费用(1016加)
  positionFee(contract_id, position_id) {
    return swapsAxios.get(ifcontract + `/positionFee?contractID=${contract_id}&positionID=${position_id}`)
  }
}
export default swapsApi
