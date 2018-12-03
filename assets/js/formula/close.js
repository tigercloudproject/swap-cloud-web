import { IsReverse } from './common'
// CalculateCloseLongProfitAmount 计算多仓位的未实现盈亏
// vol:持仓量
// openPrice:持仓均价
// closePrice:当前标记价
// contractSize:合约大小
// isReverse:是否是反向合约
function CalculateCloseLongProfitAmount(vol, openPrice, closePrice, contract) {
  if (vol <= 0 || contract.contractSize <= 0 || openPrice <= 0 || closePrice <= 0) {
    return 0
  }
  // let openValue, closeValue
  if (IsReverse(contract.quoteCoin, contract.priceCoin)) {
    // openValue = vol * contract.contractSize / openPrice
    // closeValue = vol * contract.contractSize / closePrice
    return vol * contract.contractSize * (1 / openPrice - 1 / closePrice) // openValue - closeValue
  }
  // openValue = vol * contract.contractSize * openPrice
  // closeValue = vol * contract.contractSize * closePrice
  return vol * contract.contractSize * (closePrice - openPrice) // closeValue - openValue
}
// CalculateCloseShortProfitAmount 计算空仓位的未实现盈亏
// vol:持仓量
// openPrice:持仓均价
// closePrice:当前标记价
// contractSize:合约大小
// isReverse:是否是是方向合约
// let openValue, closeValue
function CalculateCloseShortProfitAmount(vol, openPrice, closePrice, contract) {
  if (vol <= 0 || contract.contractSize <= 0 || openPrice <= 0 || closePrice <= 0) {
    return 0
  }
  if (IsReverse(contract.quoteCoin, contract.priceCoin)) {
    // openValue = vol * contract.contractSize / openPrice
    // closeValue = vol * contract.contractSize / closePrice
    return vol * contract.contractSize * (1 / closePrice - 1 / openPrice) // closeValue - openValue
  }
  // openValue = vol * contract.contractSize * openPrice
  // closeValue = vol * contract.contractSize * closePrice
  return vol * contract.contractSize * (openPrice - closePrice) // openValue - closeValue
}
function LongOrSort(vol, openPrice, closePrice, contract, way) {
  return way ? CalculateCloseLongProfitAmount(vol, openPrice, closePrice, contract) : CalculateCloseShortProfitAmount(vol, openPrice, closePrice, contract)
}
export default LongOrSort
