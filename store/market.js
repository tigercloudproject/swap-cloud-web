export const state = () => ({
  productInfo: {contract: {}},
  productList: null,
  // 单位为张或者base_coin
  coinUnit: true,
  // 计算仓位的未实现盈亏的依赖单位
  pnlPriceUnit: true,
  cabinList: [],
  curryEntrustList: [],
  ticker: {},
  // 多仓未实现盈亏
  longOptions: 0,
  // 空仓为实现盈亏
  sortOptions: 0,
  // 设置输入框价格和量
  price: '',
  priceTwo: '',
  vol: '',
  // 最新成交
  trades: [],
  // 亮灯集合
  pnls: null,
  // 指数集合
  indexs: [],
  // 行情集合
  tickerList: [],
  // 同保证金下其他合约仓位
  cabinListOther: []
})

export const mutations = {
  SET_TICKER(state, payload) {
    state.ticker = payload.data
  },
  SET_PRODUCT(state, payload) {
    state.productInfo = payload.data
  },
  SET_PRODUCTLIST(state, payload) {
    state.productList = payload.data
  },
  SET_COINUNIT(state, payload) {
    state.coinUnit = payload.data
  },
  SET_CABINLIST(state, payload) {
    state.cabinList = payload.data
  },
  SET_CABINLIST_OTHER(state, payload) {
    state.cabinListOther = payload.data
  },
  SET_CURRYENTRUSTLIST(state, payload) {
    state.curryEntrustList = payload.data
  },
  SAVE_DEEP(state, payload) {
    state[payload.key] = payload.data
  },
  SAVE_DEEPTIMEOUT(state, payload) {
    state.depthTimeOut = payload.data
  },
  SET_MARKET(state, payload) {
    state[payload.key] = payload.data
  }
}
