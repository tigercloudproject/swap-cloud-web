export default {
  // cookie domain,change this to save cookie
  domain: 'test.com',
  mainDomain: '',
  swapsDomain: 'http://swap.test.com/',
  // api URL,change this to get Data
  baseUrl: '',
  swapsUrl: 'https://devapi.bbx.com/v1/',
  testUrl: '',
  webSocketUrl: 'wss://devapi.bbx.com/v1/ifcontract/realTime',
  // 如果是合约云则为true
  isYun: false,
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
