// 破产相关公式
import { IsReverse } from './common'
import { CalculateContractValue } from './value'
// CalculateBankruptcyPrice 计算破产价
// position:用户的仓位
// assets:用户的资产,如果仓位的全仓模式,需要传入用户资产,如果是逐仓模式,不需要传入用户资产
function CalculateBankruptcyPrice(position, assets, contractInfo, way) {
  let HV, HP, PV, IM, resValue, S, T, M, D, BP
  HV = position.HoldVol
  HP = position.HoldAvgPrice
  PV = CalculateContractValue(HV, HP, contractInfo.Contract)
  // 当前仓位需要的维持保证金
  IM = position.IM
  if (assets) {
    IM = IM + assets
  }
  // ToDo 保证金不够怎么办
  // if (IM < 0) {
  //   return -1
  // }
  S = contractInfo.Contract.contractSize
  T = contractInfo.FeeConfig.TakerFee
  // HV: hold volume
  // BP: 破产价
  // S: 合约价格
  // T: TakeFeeRatio
  // TF: TakeFee
  // HV*BP*S*T = TF
  // 多仓
  // PV-IM = resValue
  // (resValue-TF)/(HV*S) = BP
  // resValue/(HV*S+HV*S*T) = BP
  // 空仓
  // PV+IM = resValue
  // (PV+IM-TF)/(HV*S) = BP
  // resValue/(HV*S+HV*S*T) = BP
  // 破产时用户持仓的价值
  // 开多仓,破产时的仓位价值 = 现在的仓位价值 - 开仓保证金
  // 开空仓,破产时的仓位价值 = 现在的仓位价值 + 开仓保证金
  let isR = IsReverse(contractInfo.Contract.quoteCoin, contractInfo.Contract.priceCoin)
  if (isR) {
    way = !way
  }
  if (way) {
    resValue = PV - IM
    // 如果保证金大于仓位的资产,肯定没有达到强平位置
    if (resValue <= 0) {
      return 0
    }
    D = HV * S * (1 - T)
  } else {
    resValue = PV + IM
    D = HV * S * (1 + T)
  }
  M = resValue
  if (D <= 0) {
    return -1
  }
  BP = M / D
  if (isR) {
    if (BP <= 0) {
      return -1
    }
    BP = 1 / BP
  }
  return BP
}
export default CalculateBankruptcyPrice
