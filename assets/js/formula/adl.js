import CalculateBankruptcyPrice from './bankrupt'
import LongOrSort from './close'
import { CalculateContractValue } from './value'
// CalculatePnl 计算仓位盈利排名系数
// 排序 = 盈利百分比 * 有效杠杆  (如果盈利)
//         = 盈利百分比 / 有效杠杆  (如果亏损)
// 其中
//   有效杠杆 = abs((标记价值) / (标记价值 - 破产价值))
//   盈利百分比 = (标记价值 - 平均开仓价值) / abs(平均开仓价值)
//   标记价值 = 位于标记价格时的仓位价值
//   破产价值 = 位于破产价格时的仓位价值
//   平均开仓价值 = 位于平均开仓价格时的仓位价值

function CalculatePNL(position, assets, fairPrice, contractInfo, way) {
  // 盈利百分比 = (标记价值 - 平均开仓价值) / abs(平均开仓价值)
  // 盈利百分比= [FP*Vol*S - HP*Vol*S]/HP*Vol*S
  // 有效杠杆 = abs[(标记价值) / (标记价值 - 破产价值)]
  // 有效杠杠 = abs[FP*Vol*S/(FP*Vol*S - BP*Vol*S)]
  // 排序 = [(FP*Vol*S - HP*Vol*S)/HP*Vol*S]*abs[FP*Vol*S/(FP*Vol*S - BP*Vol*S)]
  // Pnl = [(FP - HP)/HP]*abs[FP/(FP - BP)]
  if (!position) {
    return 0
  }
  let profit, positionValue, earningsRatio, BP, tmp, leverage
  profit = LongOrSort(position.HoldVol, position.HoldAvgPrice, fairPrice, contractInfo.Contract, way)
  positionValue = CalculateContractValue(position.HoldVol, position.HoldAvgPrice, contractInfo.Contract)
  earningsRatio = profit / positionValue
  BP = CalculateBankruptcyPrice(position, assets, contractInfo)
  tmp = fairPrice - BP
  if (tmp === 0) {
    if (profit > 0) {
      return 100000000
    } else {
      return 0
    }
  }
  leverage = Math.abs(fairPrice / tmp)
  if (leverage === 0) {
    if (profit > 0) {
      return 0
    }
    return -100000000
  }
  if (profit < 0) {
    return earningsRatio / leverage
  }
  return earningsRatio * leverage
}

function CalculateQuantile(i, size) {
  let f = Math.ceil(i * 5 / size)
  f *= 0.2
  return f * 100
}

export {CalculatePNL, CalculateQuantile}
