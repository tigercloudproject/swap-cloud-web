export default {
  // 加密后的 api_secret
  cloudToken: '461581496df9211abeaddf3cb108129a',
  // api_key
  cloudAccessKey: 'ebb1b16a-3556-45b3-ad00-13d3120ba834',
  // 单位分，expired_ts 有效时长
  cloudEffectiveTime: 20,
  // 交易对
  productTicker: {
    /*
      交易对显示过滤
        - 同时使用时，exclude比contain权重高；
        - USDT、主区、创新区内无数据时，则自动隐藏
        - exclude：排除指定的交易对（空数组则都显示）
        - contain：显示指定的交易对（空数组则都不显示）
     */
     // exclude: [ 'HTUSDT', 'XDAG/ETH 二号' ]
     // contain: [ 'HTUSDT', 'XDAG/ETH 二号' ]
  }
}
