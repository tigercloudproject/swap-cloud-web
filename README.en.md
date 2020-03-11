# Tiger Cloud Contract Frontend Demo

This project uses the [Nuxt.js] (https://zh.nuxtjs.org/) framework. For a detailed description of how it works, check out [Nuxt.js docs] (https://github.com/nuxt/nuxt.js)
> The project party needs to implement the login and registration function by themselves. This demo only provides contract transaction functions.

## Step

### 1. Install dependent environment

- [Install Node.js 8.x / 10.x] (http://nodejs.org)

### 2. git clone project or download zip project package

### 3. Install project dependencies

```bash
# install dependencies
npm install

# install global webpack
npm install webpack -g
```

### 4. Configuration

1. The server should provide an interface that can obtain `api_key`, `api_secret`, `expired_ts`, and the contract transaction can be called after the front-end gets it.
    - Code description
        ```javascript
        cookie.getCookie ('token'); // encrypted api_secret
        cookie.getCookie ('expired_ts'); // timeout timestamp
        cookie.getCookie ('access_key'); // api_key
        ```
        > Note: The site relies heavily on the token field as the basis for determining the user's login status, so after the project is logged in, the project party must store `token`,` expired_ts`, and `access_key` in the cookie.

    - Access the `. / Config / base.js` file in the project and modify the` cloudToken` and `cloudAccessKey` to their default values.
        <img src = "https://github.com/tigercloudproject/swap-cloud-web/blob/master/static/readme/img1.jpg?raw=true" width = "800" hegiht = "auto" align = " center "/>
    - Visit `. / Assets / js / axiosClassYun.js` in the project, and assign the values ​​of` api_key`, `api_secret`, and` expired_ts` obtained from the server within the ** 32 ~ 38 ** lines.
        <img src = "https://github.com/tigercloudproject/swap-cloud-web/blob/master/static/readme/img3.jpg?raw=true" width = "800" hegiht = "auto" align = " center "/>
    - If you want to improve security, you can shorten the expiry_ts period.
2. The above configuration will only be called if the `isYun` field is set to` true` in the corresponding `.js` file in`. / Config / `.
`IsYun: true` in all current mode configurations.

3. Need to access the user assets and user information of the current platform to prepare for transfer to futures and head display.
    <img src = "https://github.com/tigercloudproject/swap-cloud-web/blob/master/static/readme/usage-3.png?raw=true" width = "800" hegiht = "auto" align = "center" />

4. If you need to allow the interface to perform data filtering before obtaining data (such as displaying the specified contract transaction pair), you can modify the value of `exchangeName` in the`. / Config / base.js` to the name of the exchange .

### 5. Run mode

There are three operation modes for the project. For details, please refer to the steps provided in ** Mode **.

## Mode

### Local development mode

Corresponds to the default `. / Config / api.config.js` configuration item, and `. / Config / api.config.local.bk.js` is its backup.
The test interface will be accessed.

#### steps

1. Configure the `domain` and `swapsDomain` in the `api.config.js` as your desired domain name (after modification, you need to modify the domain in the subsequent steps)
2. Related host configuration domain
    ```
    127.0.0.1 swap.test.com
    ```

3. Run `nuxt`
    ```bash
    npm run dev
    ```
4. Wait until `127.0.0.1: 3008` is displayed
5. Use the domain name + port of `swapsDomain` for access
    > <http://swap.test.com:3008>

### Test mode (test suit mode)

Corresponds to `. / Config / api.config.dev.js` configuration item.
The test interface will be accessed.

1. Configure `domain` and `swapsDomain` in `api.config.dev.js` as your desired domain name (after modification, you need to modify the domain in the subsequent steps)
2. Related host configuration domain
    ```
    127.0.0.1 devswap.bbx.com
    ```

3. Copy and replace the contents of `api.config.dev.js` into `api.config.js`
    ```bash
    cp -f ./config/api.config.dev.js ./config/api.config.js
    ```
4. build
    ```bash
    npm run build
    ```
5. When finished, directly open nuxt or use pm2
    ```bash
    npm start
    ```
    Waiting to show `127.0.0.1: 3008`
    or
    ```bash
    # pm2
    pm2 startOrRestart pm2.json
    ```
6. Use the domain name of `swapsDomain` for access (such as configuring a reverse proxy without adding a port)
    > <https://devswap.bbx.com:3008>

### Production mode (online mode)

Corresponds to `. / Config / api.config.master.js` configuration item.
Official online interface will be accessed.

1. Configure `domain` and `swapsDomain` in `api.config.master.js` as your desired domain name
2. Related host configuration domain
    ```
    127.0.0.1 swap.bbx.com
    ```

3. Copy and replace the contents of `api.config.master.js` into `api.config.js`
    ```bash
    cp -f ./config/api.config.master.js ./config/api.config.js
    ```
4. build
    ```bash
    npm run build
    ```
5. When finished, pm2
    ```bash
    # pm2
    pm2 startOrRestart pm2.json
    ```
6. The web server `127.0.0.1: 3008` will be running, and a reverse proxy needs to be configured
7. Access using `swapsDomain` domain name
    > <https://swap.bbx.com>

## Components

| Component | filename | path |
| --- | --- | --- |
| User transfer | [transfer-window.vue] (https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/submit-entrust-cp/transfer-window.vue) | / components / index / submit-entrust-cp / transfer-window.vue |
| User Information | [user-info.vue] (https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/template/user-info.vue) | / components / template / user- info.vue |
| Head Contract List | [main-nav.vue] (https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/main-nav.vue) | components / index / main -nav.vue |
| Delegation Form | [submit-entrust.vue] (https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/submit-entrust.vue) | / components / index / submit- entrust.vue |
| Delegation List | [entrust-list.vue] (https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/entrust-list.vue) | / components / index / entrust- list.vue |
| Operation Record | [record-list.vue] (https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/record-list.vue) | / components / index / record- list.vue |
| Latest Transaction Price | [news-deal.vue] (https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/news-deal.vue) | / components / index / news -deal.vue |
| Contract Calculator | [calculator-window.vue] (https://github.com/tigercloudproject/swap-cloud-web/blob/master/components/index/type-title-cp/calculator-window.vue) | /components/index/type-title-cp/calculator-window.vue) |

## List of used interfaces

**/ifcontract**

- GET /quote
- GET /contracts
- GET /userOrders
- GET /userPositions
- GET /submitOrder
- POST /cancelOrders
- GET /depth
- GET /trades
- GET /userTrades
- GET /accounts
- GET /tickers
- GET /userLiqRecords
- GET /orderTrades
- GET /pnls
- POST /transferFunds
- GET /indexes
- GET /indexquote
- GET /fpquote
- POST /marginOper
- GET /fundingrate
- GET /createContractAccount
- GET /riskReserves
- GET /activity/openAccountReward
- GET /activity/depositReward
- GET /submitPlanOrder
- POST /cancelPlanOrders
- GET /userPlanOrders
- GET /userOrderInfo
- GET /positionFee

**/ifaccount**

- GET /logout
- GET /users/me
- GET /rebates

**/ifglobal**

- GET /coinBrief

## FAQ

1. Show or hide the trading pairs in the head contract list in a controlled manner
     View the js file corresponding to the pattern in `. / Config`, which is filtered by` exclude` or `contain` of` productTicker`
2. Response returns `invalid system time`
     `expired_ts` is in microseconds
3. Response returns `invalid expired ts`
     The server uses a time setting of 0 time zone, and expired_ts is valid for 20 minutes (front end). It can be changed in `. / Config / base`.
4. Response returns `invalid request`
     Please check if there are `tc-Accesskey`,` tc-Sign`, `tc-Ver`,` tc-Dev`, `tc-Ts` in the Request Header. If it is missing, it needs to be configured under `. / Assets / js / axiosClassYun`. This problem generally does not occur.
5. Response returns `invalid signature`
     View backend documentation 6.3 6.4
6. API interface location
     `. / assets / js / api / swapsApi`
7. Where are the relevant pages of contract tutorials and historical materials?
     In `. / Pages / information`,`. / Components / information`
