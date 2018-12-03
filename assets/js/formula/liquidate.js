  // -------------------------- 开仓验证 --------------------------------------
  // 1.在最大和最小区间内
  // 2.必须小于等于最大可开
  // 3.判断价格是不是强平价
  // IsLiquidate 根据价格和开仓方向判断是否会强平
  // positionType:开仓方向
  // positionLiquidatePrice:强平价
  // fairPrice:当前合理价格
  import { CalculateContractValue, CalculateQuotePrice } from './value'
  import { CalculateMM, CalculateIMR } from './margin'
  import { IsReverse } from './common'
  function IsLiquidate(longOrSort, positionLiquidatePrice, fairPrice) {
    if (positionLiquidatePrice < 0) {
      return true
    } else if (positionLiquidatePrice === 0) {
      return false
    }
    if (longOrSort) {
      if (fairPrice <= positionLiquidatePrice) {
        return true
      }
    } else {
      if (fairPrice >= positionLiquidatePrice) {
        return true
      }
    }
    return false
  }
  // CalculateOrderLiquidatePrice 计算订单的强平价
  // order:订单
  // assets:用户资产,如果是全仓模式,才需要输入用户资产,逐仓模式不需要
  // contractInfo:合约信息
  function CalculateOrderLiquidatePrice(order, asset, contractInfo, longOrSort) {
    let value, restM, MM, IMR, leverageIMR, IM
    value = CalculateContractValue(order.Vol, order.Price, contractInfo.Contract)
    restM = 0
    MM = CalculateMM(value, contractInfo.RiskLimit)
    // 如果是全仓模式
    // 全仓模式,不考虑用户输入的杠杆大小
    if (order.OpenType) {
      if (asset) {
        restM = asset - MM // asset.AvailableVol
      }
    } else {
      // 如果是逐仓模式
      IMR = CalculateIMR(value, contractInfo.RiskLimit)
      if (order.Leverage > 0) {
        leverageIMR = 1 / order.Leverage
        if (leverageIMR > IMR) {
          IMR = leverageIMR
        }
      }
      IM = value * IMR
      restM = IM - MM
    }
    if (restM < 0) {
      // 如果返回小于零,表示订单无效
      return -1
    }
    let isR = IsReverse(contractInfo.Contract.quoteCoin, contractInfo.Contract.priceCoin)
    if (isR) {
      longOrSort = !longOrSort
    }
    // 如果开多
    if (longOrSort) {
      value = value - restM
      // 用户资产的价值大于订单的价值
      // 只要当合约价格清零时才会强平
      if (value <= 0) {
        // 返回零
        return isR ? 100000000 : 0
      }
    } else {
      value = value + restM
    }
    return CalculateQuotePrice(value, order.Vol, contractInfo.Contract)
  }
  // CalculatePositionLiquidatePrice 计算仓位的强平价
  // position:仓位
  // assets:用户资产,如果是全仓模式,才需要输入用户资产,逐仓模式不需要
  // contractInfo:合约信息
  function CalculatePositionLiquidatePrice(position, assets, contractInfo, longOrSort) {
    let HV, HP, PV, resValue, IM, restM, T, D, M, LP
    HV = position.HoldVol
    HP = position.HoldAvgPrice
    PV = CalculateContractValue(HV, HP, contractInfo.Contract)
    // 当前仓位需要的维持保证金
    IM = position.IM
    if (assets) {
      IM = IM + assets
    }
    restM = IM - position.MM
    // ToDo 保证金不够怎么办
    // if (restM < 0) {
    //   return -1
    // }
    let S = contractInfo.Contract.contractSize
    T = contractInfo.FeeConfig.TakerFee
    // HV: hold volume
    // LP: 强平价
    // S: 合约价格
    // T: TakeFeeRatio
    // TF: TakeFee
    // HV*LP*S*T = TF
    // 多仓
    // PV-(IM-MM) = resValue
    // (resValue+TF)/(HV*S) = LP
    // resValue/(HV*S-HV*S*T) = LP
    // 空仓
    // PV+(IM-MM) = resValue
    // (PV+(IM-MM)-TF)/(HV*S) = LP
    // resValue/(HV*S+HV*S*T) = LP
    D = 0
    let isR = IsReverse(contractInfo.Contract.quoteCoin, contractInfo.Contract.priceCoin)
    if (isR) {
      longOrSort = !longOrSort
    }
    // 判断是否是开多
    if (longOrSort) {
      resValue = PV - restM
      // 如果保证金大于仓位的资产,肯定没有达到强平位置
      if (resValue <= 0) {
        return isR ? 100000000 : 0
      }
      D = HV * S * (1 - T)
    } else {
      resValue = PV + restM
      D = HV * S * (1 + T)
    }
    M = resValue
    if (D <= 0) {
      return -1
    }
    LP = M / D
    if (isR) {
      LP = 1 / LP
    }
    if (LP > 100000000) {
      LP = 100000000
    }
    return LP
  }
  export {IsLiquidate, CalculateOrderLiquidatePrice, CalculatePositionLiquidatePrice}
