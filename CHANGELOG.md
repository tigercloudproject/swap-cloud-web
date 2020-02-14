# CHANGELOG

## 1.1.3.0214
### a
- C 支持通过配置 exchangeName，使接口回传指定数据

## 1.1.3.0206
### a
- C 账户权益计算修改
- C 全仓强平价格计算修改
- C 可用余额字段修改
- C 可划转金额字段修改
- C 修改接口地址
- C 域名更改

## 1.1.2.1105
### a
- U 补充 `README.md`

## 1.1.2.1028
### a
- C 调整因 `越南语` 造成的布局错位

## 1.1.2.1023
### a
- A 新增 `越南语` 支持
- C 针对因 `越南语` 造成的布局错位，进行样式调整
- R 移除顶部导航的几处入口，及调整样式
- U 调整 main-nav.vue 的界面

## 1.1.1.1018
### a
- C 关闭 ESlint
- U 补充 `README.md`
- R 移除无用的资源文件
- A 添加swap.bbx.com已存在的“合约资产显示区域”

## 1.1.0.1017
### a
- F 修复24H成交量的值被小数点转化后，会造成10位转成9位的问题
- C 缺省启服IP从 `0.0.0.0` 跟换至 `127.0.0.1`
- A 新增 `./config/base`，使得可在此配置
- U 优化 `expired_ts`
- U 补充 `README.md`
### b
- C 调整本地开发模式 `./config/api.config.js` 内 `isYun` 缺省为 true
### c
- U 优化参数配置

## 1.1.0.1015
### a
- U 补充 `README.md` 中的FAQ
- C 取消 `axiosClassYun` 内 `Bbx-Ver`、`Bbx-Dev` 的注释状态
### b
- U 补充 `README.md`

## 1.1.0.1009
### a
-   F 修复`config`下当CFG.productTicker为空对象时，造成交易对不显示的问题；exclude的逻辑显示问题
### b
-   C 补全注释

## 1.1.0.1008
### a
-   C 优化`README.md`格式
-   F 纠正`README.md`内的调用说明
-   R 移除`合约修改基本说明.docx`，并把内容融合进`README.md`
-   A config内可过滤交易对的显示
-   R 删除无用文件
### b
-   F 过滤交易对将针对every
-   C `README.md`内新增FAQ

## 1.1.0.1003
### a
-   C 优化README.md中的说明
### b
-   C 优化README.md中的缩进格式

## 1.1.0.0930
### a
-   C 优化README.md中针对部署、模式的说明
-   C 优化`config`中本地开发模式的配置

## 1.1.0.0909
### a
-   F 修复`config`文件夹内的各配置项
-   A 新增`CHANGELOG.md`
