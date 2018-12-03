export default {
  // 获取合约信息
  getContract(productInfo) {
    return {contractSize: Number(productInfo.contract_size), quoteCoin: productInfo.quote_coin, priceCoin: productInfo.price_coin}
  },
  // 获取合约系数
  getRiskLimit(risk_limit) {
    return {BaseLimit: Number(risk_limit.base_limit), Step: Number(risk_limit.step), InitialMargin: Number(risk_limit.initial_margin), MaintenanceMargin: Number(risk_limit.maintenance_margin)}
  }
}
