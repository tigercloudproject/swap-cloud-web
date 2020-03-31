export default {
  // 加密后的 api_secret，需从后端获取
  cloudToken: '',
  // api_key，需从后端获取
  cloudAccessKey: '',
  // expired_ts，需从后端获取
  cloudExpiredTs: undefined,
  // 交易所名称，用语针对指定的交易所进行接口数据过滤
  exchangeName: '',
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
