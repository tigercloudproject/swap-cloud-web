## 模式

### 本地开发模式

对应默认的`./config/api.config.js`配置项，`./config/api.config.local.bk.js`为其备份。

#### 步骤

1. 配置`api.config.js`内的`domain`、`swapsDomain`为自己所需的域名
2. 运行`nuxt`
```bash
npm run dev
```
3. 本地将运行web服`0.0.0.0:3008`，需在本地host配置`api.config.js`中`swapsDomain`对应的域名
4. 使用`swapsDomain`的域名+端口进行访问

### 测试模式

对应`./config/api.config.dev.js`配置项。

#### 步骤

1. 配置`api.config.dev.js`内的`domain`、`swapsDomain`为自己所需的域名
2. 把`api.config.dev.js`的内容复制替换到`api.config.js`内
```bash
cp -f ./config/api.config.dev.js ./config/api.config.js
```
3. build
```bash
npm run build
```
4. 完毕后，开启nuxt
```bash
npm start
```
5. 将运行web服`0.0.0.0:3008`，并在所部署的服务器内配置反向代理进行关联；或使用PM2管理Node，代码如下：
`pm2 startOrRestart pm2.json`
6. 使用`swapsDomain`的域名进行访问

### 生产模式

对应`./config/api.config.master.js`配置项。

#### 步骤

1. 配置`api.config.master.js`内的`domain`、`swapsDomain`为自己所需的域名
2. 把`api.config.master.js`的内容复制替换到`api.config.js`内
```bash
cp -f ./config/api.config.master.js ./config/api.config.js
```
3. build
```bash
npm run build
```
4. 完毕后，开启nuxt
```bash
npm start
```
5. 将运行web服`0.0.0.0:3008`，并在所部署的服务器内配置反向代理进行关联；或使用PM2管理Node，代码如下：
`pm2 startOrRestart pm2.json`
6. 使用`swapsDomain`的域名进行访问
