  // IsReverse 是否是反向合约
  function IsReverse(QuoteCoin, PriceCoin) {
    return QuoteCoin === PriceCoin
  }
  // MarginCoin 保证金币
  function MarginCoin(BaseCoin, QuoteCoin, PriceCoin) {
    return IsReverse(QuoteCoin, PriceCoin) ? BaseCoin : QuoteCoin
  }
  export {IsReverse, MarginCoin}
