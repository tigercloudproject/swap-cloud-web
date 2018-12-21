# swap-cloud-web

> 老虎合约云前端demo

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install*[see note below]

# serve with hot reload at localhost:3008
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start
```

>Note: Due to a bug in yarn's engine version detection code if you are
using a prerelease version of Node (i.e. v7.6.0-rc.1) you will need to either:
  1. Use `npm install`
  2. Run `yarn` with a standard release of Node and then switch back

该项目使用了 [Nuxt.js](https://zh.nuxtjs.org/) 框架。有关工作原理的详细说明请查看[Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Usage  

基本配置  
1. 服务器应提供一个获取`api_key` 和 `api_secret`的接口,前端拿到`api_key` 和 `api_secret`后即可调用合约交易.  
    ```javascript
    cookie.getCookie('token');     // 加密后的api_secret
    cookie.getCookie('expired_ts'); // 超时时间
    cookie.getCookie('access_key'); // api_key
    ```
    >注意: 站点重度依赖token字段为用户登录态判断依据，所以项目方在登录后，要把`token`、`expired_ts`,`access_key`储存到cookie中。eg:    

    ```javascript
    cookie.setCookie('token', '461581496df9211abeaddf3cb108129a', '', '/', 'test.com')
    cookie.setCookie('expired_ts', '1542971159000000', '', '/', 'test.com')
    cookie.setCookie('access_key', 'ebb1b16a-3556-45b3-ad00-13d3120ba834', '', '/', 'test.com')
    ```  
2. 上线需把**api.config.master.js** 的内容覆盖**api.config.js**  

3. `isYun` 字段设为`true`  

  <img src="https://github.com/tigercloudproject/swap-cloud-web/blob/master/static/readme/usage-2.png?raw=true" width="800" hegiht="auto" />  
4. 需要接入当前平台的用户资产和用户信息，为转账到期货和头部显示做准备  

  <img src="https://github.com/tigercloudproject/swap-cloud-web/blob/master/static/readme/usage-3.png?raw=true" width="800" hegiht="auto" align="center" />    
5. 项目方需自己实现登录注册功能,demo 本身只提供合约交易功能  

## Components Intro  
|组件|文件名|路径|
|---|---|---|
|用户转账|[transfer-window.vue](https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/submit-entrust-cp/confirm-plan-window.vue)|/components/index/submit-entrust-cp/confirm-plan-window.vue|
|用户信息|[user-info.vue](https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/template/user-info.vue)|/components/template/user-info.vue|
|头部合约列表|[main-nav-new.vue](https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/main-nav-new.vue)|components/index/main-nav-new.vue|
|委托表单|[submit-entrust.vue](https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/submit-entrust.vue)|/components/index/submit-entrust.vue|
|委托列表|[entrust-list.vue](https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/entrust-list.vue)|/components/index/entrust-list.vue|
|操作记录|[record-list.vue](https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/record-list.vue)|/components/index/record-list.vue|
|最新成交价|[news-deal.vue](https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/news-deal.vue)|/components/index/news-deal.vue|
|合约计算器|[calculator-window.vue](https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/type-title-cp/calculator-window.vue)|/components/index/type-title-cp/calculator-window.vue)|

## Deploy  
pm2
