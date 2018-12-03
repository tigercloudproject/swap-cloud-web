  import { CalculateContractValue } from './value'
  import { CalculateIMR } from './margin'
  // CalculateAdvanceOpenCost 提交开仓订单时,计算预开仓成本
  // order:订单信息
  // position:用户持有仓位
  // openOrderSize:已提交的委托订单大小
  // contractInfo:合约信息
  // way 是否开多 traue : false
  function CalculateAdvanceOpenCost(order, position, openOrderSize, Contract, RiskLimit, way) {
    if (order.Vol <= 0 || order.Price <= 0) {
      return 0
    }
    let holdVol = 0
    let holdAvgPrice = 0
    let advanceVol = 0
    let advancePrice = 0
    if (position) {
      holdVol = position.HoldVol
      holdAvgPrice = position.HoldAvgPrice
    }
    if (openOrderSize && openOrderSize.Vol > 0) {
      advanceVol = openOrderSize.Vol
      advancePrice = openOrderSize.Amount / openOrderSize.Vol
    }
    return _calculateAdvanceOpenCost(holdVol, advanceVol, holdAvgPrice, advancePrice, order, Contract, RiskLimit, way)
  }
  function _calculateAdvanceOpenCost(holdVol, advanceVol, holdAvgPrice, advancePrice, order, Contract, RiskLimit, way) {
    let orderValue = CalculateContractValue(order.Vol, order.Price, Contract)
    let advanceValue = CalculateContractValue(advanceVol, advancePrice, Contract)
    let holdValue = CalculateContractValue(holdVol, holdAvgPrice, Contract)
    let totalValue = orderValue + advanceValue + holdValue
    // 开仓保证金率
    order.IMR = CalculateIMR(totalValue, RiskLimit)
    if (order.Leverage > 0) {
      let leverageIMR = 1 / order.Leverage
      if (leverageIMR > order.IMR) {
        order.IMR = leverageIMR
      }
    }
    let IM = orderValue * order.IMR
    let brankruptTakeFee = orderValue * BTR(way, order.TakeFeeRatio, order.IMR)
    let MaxTakeFee = orderValue * order.TakeFeeRatio + brankruptTakeFee
    let FreezAssets = IM + MaxTakeFee
    return FreezAssets
  }
  // 是否开多单
  // BTR 获取订单破产时的takeFeeRatio
  function BTR(way, TakeFeeRatio, IMR) {
    return way ? TakeFeeRatio : (TakeFeeRatio * (1 + IMR))
  }
  export default CalculateAdvanceOpenCost
