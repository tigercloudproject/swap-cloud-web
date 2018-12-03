  import { IsReverse } from './common'
  import Util from '../util'
  // CalculateContractValue 通过量和价格计算合约价值
  // vol:量
  // price:价格
  // contract:合约信息
  function CalculateContractValue(vol, price, Contract) {
    return calculateContractValue(vol, price, Contract.contractSize, IsReverse(Contract.quoteCoin, Contract.priceCoin))
  }
  function calculateContractValue(vol, price, contractSize, isReverse) {
    let amount = 0
    if (vol <= 0 || price === 0 || contractSize <= 0) {
      return 0
    }
    if (isReverse) {
      amount = Util.precision.divide(Util.precision.times(vol, contractSize), price)
    } else {
      amount = Util.precision.times(vol, contractSize, price)
    }
    return amount
  }
  // CalculateQuotePrice 通过价值和量计算价格
  // value:价值
  // vol:量
  // contract:合约
  function CalculateQuotePrice(value, vol, contract) {
    if (!contract) {
      return 0
    }
    return calculateQuotePrice(value, vol, contract.contractSize, IsReverse(contract.quoteCoin, contract.priceCoin))
  }
  function calculateQuotePrice(value, vol, contractSize, isReverse) {
    let price
    if (contractSize <= 0) {
      return 0
    }
    if (isReverse) {
      if (value <= 0) {
        return 0
      }
      price = vol * contractSize / value
      return price
    }
    if (vol <= 0) {
      return 0
    }
    price = value / vol / contractSize
    return price
  }
  // CalculateContractBasicValue 通过量和价格计算合约的基础比价值
  // coinUnit true  返回值单位为张  false 单位和BaseCoin单位一致
  function CalculateContractBasicValue(vol, price, contract, coinUnit) {
    // console.log(66)
    let amount = 0
    if (vol <= 0 || price <= 0 || !contract) {
      return amount
    }
    amount = vol
    if (IsReverse(contract.quoteCoin, contract.priceCoin)) {
      amount = coinUnit ? Math.floor(amount * price / contract.contractSize) : amount / price * contract.contractSize
      return amount
    }
    return coinUnit ? Math.floor(amount / contract.contractSize) : Util.precision.times(amount, contract.contractSize)
  }

    // CalculateContractBasicValue 通过量和价格计算合约的基础比价值
  // 把张换成mrginCoin
  function CalculateContractBasicValueTwo(vol, price, contract) {
    let amount = 0
    if (vol <= 0 || price <= 0 || !contract) {
      return amount
    }
    amount = vol
    if (IsReverse(contract.quoteCoin, contract.priceCoin)) {
      return amount / price * contract.contractSize
    }
    return amount * contract.contractSize * price
  }

  export {CalculateContractValue, CalculateQuotePrice, CalculateContractBasicValue, CalculateContractBasicValueTwo}
