# swap-cloud-web

> 老虎合约云前端demo。  
> 该项目使用了 [Nuxt.js](https://zh.nuxtjs.org/) 框架。有关工作原理的详细说明请查看[Nuxt.js docs](https://github.com/nuxt/nuxt.js)  
> 项目方需自己实现登录注册功能，本demo只提供合约交易功能。

## Usage

#### 1.安装依赖环境

- [Install Node.js 8.x/10.x](http://nodejs.org)

#### 2. git clone 项目或 download zip 项目包

#### 3. 安装项目依赖包

``` bash
# install dependencies
$ npm install

# install global webpack
$ npm install webpack -g
```

#### 4. 配置

1. 服务器应提供一个获取 `api_key` 和 `api_secret` 的接口，前端拿到 `api_key` 和 `api_secret` 后即可调用合约交易。
    - 代码说明
    ```javascript
    cookie.getCookie('token');     // 加密后的api_secret
    cookie.getCookie('expired_ts'); // 超时时间
    cookie.getCookie('access_key'); // api_key
    ```
    > 注意: 站点重度依赖token字段为用户登录态判断依据，所以项目方在登录后，要把 `token`、`expired_ts`、`access_key` 储存到cookie中。  
    - 访问项目中的 `./assets/js/axiosClassYun.js` 文件，把第 **37~39** 行的如下代码，其中 value、domain 修改为项目方自己的值。
    ```javascript
    cookie.setCookie('token', '461581496df9211abeaddf3cb108129a', '', '/', 'test.com')
    cookie.setCookie('expired_ts', '1542971159000000', '', '/', 'test.com')
    cookie.setCookie('access_key', 'ebb1b16a-3556-45b3-ad00-13d3120ba834', '', '/', 'test.com')
    ```

2. 只有在 `./config/` 内对应的模式 `.js` 文件中，`isYun` 字段设为 `true`，才会调用上面的配置。  
目前本地开发模式配置中 `isYun: false`。
    <img src="https://github.com/tigercloudproject/swap-cloud-web/blob/master/static/readme/usage-2.png?raw=true" width="800" hegiht="auto"/>

3. 需要接入当前平台的用户资产和用户信息，为转账到期货和头部显示做准备。
    <img src="https://github.com/tigercloudproject/swap-cloud-web/blob/master/static/readme/usage-3.png?raw=true" width="800" hegiht="auto" align="center" />

#### 5. 运行模式

项目共三种运行模式，具体请参考 **Mode** 中所提供的步骤进行操作。

## Mode

### 本地开发模式

对应默认的`./config/api.config.js`配置项，`./config/api.config.local.bk.js`为其备份。  
*注意：本模式默认 `isYun` 为 `false`*

#### 步骤

1. 配置`api.config.js`内的`domain`、`swapsDomain`为自己所需的域名（修改后需修改后续步骤中的domain）
2. 本地host配置相关domain
    > 0.0.0.0 swap.test.com
3. 运行`nuxt`
    ```bash
    $ npm run dev
    ```
4. 等待显示出`0.0.0.0:3008`
5. 使用`swapsDomain`的域名+端口进行访问
    > http://swap.test.com:3008

### 测试模式（测试服模式）

对应`./config/api.config.dev.js`配置项。

1. 配置`api.config.dev.js`内的`domain`、`swapsDomain`为自己所需的域名（修改后需修改后续步骤中的domain）
2. 本地host配置相关domain
    > 0.0.0.0 devswap.bbx.com
3. 把`api.config.dev.js`的内容复制替换到`api.config.js`内
    ```bash
    $ cp -f ./config/api.config.dev.js ./config/api.config.js
    ```
4. build
    ```bash
    $ npm run build
    ```
5. 完毕后，直接开启nuxt或使用pm2
    ```bash
    $ npm start
    ```
    等待显示出`0.0.0.0:3008`  
    or  
    ```bash
    # pm2
    $ pm2 startOrRestart pm2.json
    ```
6. 使用`swapsDomain`的域名进行访问（如配置反向代理等可不加端口）
    > https://devswap.bbx.com:3008

### 生产模式（线上模式）

对应`./config/api.config.master.js`配置项。

1. 配置`api.config.master.js`内的`domain`、`swapsDomain`为自己所需的域名
2. 本地host配置相关domain
    > 0.0.0.0 swap.bbx.com
3. 把`api.config.master.js`的内容复制替换到`api.config.js`内
    ```bash
    $ cp -f ./config/api.config.master.js ./config/api.config.js
    ```
4. build
    ```bash
    $ npm run build
    ```
5. 完毕后，pm2
    ```bash
    # pm2
    $ pm2 startOrRestart pm2.json
    ```
6. 将运行web服`0.0.0.0:3008`，需配置反向代理
7. 使用`swapsDomain`的域名进行访问
    > https://swap.bbx.com

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
