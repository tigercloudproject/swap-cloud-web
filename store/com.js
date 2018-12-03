export const state = () => ({
  // 价格精度
  priceUnit: 0,
  // 量精度
  volUnit: 0,
  // 价值精度
  valueUnit: 0,
  // 保证金单位
  marginUnit: '',
  // 可用余额
  haveAssert: 0,
  // 仓位亏损
  positionLoss: 0,
  // 是否需要创建账户
  showOpenAccount: false,
  // 未实现盈亏
  PNL: 0,
  // 计算强平价格时的余额
  liquidateAssertLong: 0,
  liquidateAssertSort: 0,
  // 仓位保证金总数
  imTotal: 0,
  leverageList: [],
  // 是否是计划委托
  isPlan: false
})

export const mutations = {
  SET_COMMON(state, payload) {
    for (let item in payload) {
      state[item] = payload[item]
    }
  }
}
