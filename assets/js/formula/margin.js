  import { CalculateContractValue } from './value'
  // CalculateMMR 计算维持保证金率
  function CalculateMMR(value, riskLimit) {
    if (value <= riskLimit.BaseLimit || riskLimit.Step <= 0) {
      return riskLimit.MaintenanceMargin
    }
    let stepValue = value - riskLimit.BaseLimit
    let stepsCount = Math.ceil(stepValue / riskLimit.Step)
    let MMR = riskLimit.MaintenanceMargin * (stepsCount + 1)
    // 大于0.5
    if (MMR > 0.5) {
      return 0.5
    }
    return MMR
  }
  // CalculateMM 计算维持保证金
  function CalculateMM(value, riskLimit) {
    let MMR
    if (value <= 0) {
      return 0
    }
    MMR = CalculateMMR(value, riskLimit)
    return value * MMR
  }
  // CalculateIMR 计算开仓保证金率
  function CalculateIMR(value, riskLimit) {
    if (value < riskLimit.BaseLimit || riskLimit.Step <= 0) {
      return riskLimit.InitialMargin
    }
    let IMR = (Math.ceil((value - riskLimit.BaseLimit) / riskLimit.Step) + 1) * riskLimit.InitialMargin
    return IMR > 1 ? 1 : IMR
  }
  // CalculateMarketOrderIMR 通过用户资产计算用户将资产全部开市价单时的开仓保证金率
  // asset:用户资产
  // advance:用户的已提交委托订单价值
  // position:用户仓位
  // contractInfo:合约信息
  function CalculateMarketOrderIMR(asset, advance, position, contractInfo, way) {
    let advanceValue = 0
    let holdValue = 0
    let preValue = 0
    let IMR, IMR2
    let takeFeeRatio = contractInfo.FeeConfig.TakerFee
    if (advance && advance.Vol) {
      advanceValue = CalculateContractValue(advance.Vol, advance.Amount / advance.Vol, contractInfo.Contract)
    }
    if (position) {
      holdValue = CalculateContractValue(position.HoldVol, position.HoldAvgPrice, contractInfo.Contract)
    }
    preValue = advanceValue + holdValue
    let i = 0
    while (++i) {
      IMR = contractInfo.RiskLimit.InitialMargin * i
      IMR2 = CalculateIMR(asset / (IMR + 2 * takeFeeRatio + (way ? 0 : takeFeeRatio * IMR)) + preValue, contractInfo.RiskLimit)
      if (IMR >= IMR2) {
        return IMR
      }
    }
  }
  export {CalculateMMR, CalculateIMR, CalculateMarketOrderIMR, CalculateMM}
