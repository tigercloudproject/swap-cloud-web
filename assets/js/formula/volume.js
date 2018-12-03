import { CalculateMarketOrderIMR } from './margin'
import { CalculateContractValue } from './value'
import { IsReverse } from './common'
// -----------------------------------------------------------计算市价可开多少张 ------------------
// CalculateVolume 通过资产和价格,计算量
// asset:资产
// advance:用户的已提交委托订单价值
// position:用户仓位
// price:价格
// way:开仓类型,是开多,还是开空
// contractInfo:合约信息
// leverage 杠杆
function CalculateVolume(asset, advance, position, price, contractInfo, way, leverage) {
  if (asset <= 0) {
    return 0
  }
  let IMR, takeFeeRatio, bankruptTakeFeeRatio, M, IMRT
  IMRT = CalculateMarketOrderIMR(asset, advance, position, contractInfo, way)
  IMR = Math.max(IMRT, 1 / leverage)

  takeFeeRatio = contractInfo.FeeConfig.TakerFee
  bankruptTakeFeeRatio = takeFeeRatio
  if (!way) { // 开空
    bankruptTakeFeeRatio = takeFeeRatio * (1 + IMR)
  }
  // 空仓 bankruptTakeFeeRatio = BTR =  (1+IMR)*TR
  // 多仓 bankruptTakeFeeRatio = TR
  // A = vol * p * s * [IMR + TR + BTR]
  let isR = IsReverse(contractInfo.Contract.quoteCoin, contractInfo.Contract.priceCoin) // asset = vol * price*s*(IMR+2*takeFeeRatio)
      // asset = vol*s*(IMR+2*takeFeeRatio)/price
    // D = asset * price
    // M = s*(IMR+2*takeFeeRatio)
  M = contractInfo.Contract.contractSize * (IMR + takeFeeRatio + bankruptTakeFeeRatio)
  if (M <= 0) {
    return 0
  }
  price = isR ? price : 1 / price
  let max = Math.floor(asset * price / M)
  if (IMR > contractInfo.RiskLimit.InitialMargin) {
    let advanceValue = 0
    let holdValue = 0
    if (advance && advance.Vol) {
      advanceValue = CalculateContractValue(advance.Vol, advance.Amount / advance.Vol, contractInfo.Contract)
    }
    if (position) {
      holdValue = CalculateContractValue(position.HoldVol, position.HoldAvgPrice, contractInfo.Contract)
    }
    let up = Math.floor(price * ((IMRT / contractInfo.RiskLimit.InitialMargin - 2) * contractInfo.RiskLimit.Step + contractInfo.RiskLimit.BaseLimit - advanceValue - holdValue) / contractInfo.Contract.contractSize)
    max = IMRT <= 1 / leverage ? max : Math.max(max, up)
  }
  return max
}
export { CalculateVolume }
