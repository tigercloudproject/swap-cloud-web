// import Utils from './utils'
class WebSocketClass {
  constructor(wsUrl) {
    this.successFn = {}
    this.wsUrl = wsUrl
    this.errorCallBackFunObj = {}
    this.isConnection = false
    this.isErrorCallBack = false
    this.lockReconnect = false // 避免重复连接
    this.ping = null
    this.cmdTime = {} // 没有发送的消息队列
    this.heartCheck()
    this.createWebSocket()
  }
  createWebSocket(bl) {
    try {
      this.webSocket = new WebSocket(this.wsUrl)
      this.initEventHandle()
      if (bl) {
        this.isErrorCallBack = false
        this.errorCallBackData()
      }
    } catch (e) {
      this.errorCallBackData()
      this.reconnect()
    }
  }
  initEventHandle() {
    this.webSocket.onclose = () => {
      this.errorCallBackData()
      this.reconnect()
    }
    this.webSocket.onerror = () => {
      this.isErrorCallBack = false
      this.errorCallBackData()
      this.reconnect()
    }
    this.webSocket.onopen = () => {
      this.isConnection = true
      this.isErrorCallBack = false
      clearInterval(this.ping)
      this.ping = setInterval(() => {
        this.webSocketSend('{"action":"ping"}')
      }, 10000)
      // 心跳检测重置
      this.heartCheck.start()
    }
    this.webSocket.onmessage = data => {
      // 如果获取到消息，心跳检测重置
      // 拿到任何消息都说明当前连接是正常的
      this.heartCheck.start()
      this.decodeData(data)
    }
  }
  reconnect() {
    this.isConnection = false
    if (this.lockReconnect) {
      return
    }
    this.lockReconnect = true
    // 没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
      this.createWebSocket(true)
      this.lockReconnect = false
    }, 2000)
  }
  errorCallBackData() {
    if (!this.isErrorCallBack) {
      this.isErrorCallBack = true
      for (let item in this.errorCallBackFunObj) {
        this.errorCallBackFunObj[item]()
      }
    }
  }
  decodeData(data) {
    if (data.data instanceof Blob) {
      let blob = data.data
      // js中的blob没有没有直接读出其数据的方法，通过FileReader来读取相关数据
      let reader = new FileReader()
      reader.readAsArrayBuffer(blob)
      // 当读取操作成功完成时调用.
      reader.onload = (evt) => {
        if (evt.target.readyState === FileReader.DONE) {
          let result = new Uint8Array(evt.target.result)
          result = (new window.Zlib.RawInflate(result)).decompress()
          let strResult = ''
          let length = result.length
          for (let i = 0; i < length; i++) {
            strResult += String.fromCharCode(result[i])
          }
          this.callBackData(JSON.parse(strResult))
        }
      }
      return
    }
    let d = JSON.parse(data.data)
    if (d.code === '10010') {
      let dt = {}
      Object.assign(dt, d)
      delete dt.code
      delete dt.msg
      setTimeout(() => {
        this.webSocketSend(JSON.stringify(dt))
      }, 2000)
      return
    }
    this.callBackData(JSON.parse(data.data))
  }
  callBackData(data) {
    if (data instanceof Array) {
      for (let i = 0; i < data.length; i++) {
        this.doCallback(data[i])
      }
    } else if (data instanceof Object) {
      if (data.hasOwnProperty('data') && data.data === 'pong') {
        return
      } else if (data.action === 'authenticate' || data.action === 'access') {
        let fn = this.successFn[data.action]
        if (typeof fn === 'function') {
          fn(data)
        }
      } else if (data.success) {
        return
      }
      // data.payload && (data.payload = JSON.parse(data.payload))
      this.doCallback(data)
    }
  }
  doCallback(data) {
    if (data.group) {
      let fn = this.successFn[data.group]
      if (typeof fn === 'function') {
        fn(data)
      }
    }
  }
  // 心跳检测
  heartCheck() {
    let that = this
    this.heartCheck = {
      timeout: 10000, // 10秒
      timeoutObj: null,
      serverTimeoutObj: null,
      reset: function () {
        clearTimeout(this.timeoutObj)
        clearTimeout(this.serverTimeoutObj)
      },
      start: function () {
        this.reset()
        let self = this
        this.timeoutObj = setTimeout(function () {
          // 这里发送一个心跳，后端收到后，返回一个心跳消息
          // onmessage拿到返回的心跳就说明连接正常
          that.webSocketSend('{"action":"ping"}')
          self.serverTimeoutObj = setTimeout(function () { // 如果超过一定时间还没重置，说明后端主动断开了
            that.webSocket.close() // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
          }, self.timeout)
        }, this.timeout)
      }
    }
  }
  webSocketSend(cmd) {
    if (!cmd) {
      return
    }
    this.cmdTime[cmd] && clearTimeout(this.cmdTime[cmd])
    if (this.webSocket.readyState !== 1) {
      this.cmdTime[cmd] = setTimeout(() => {
        this.webSocketSend(cmd)
      }, 200)
      return
    }
    if (this.isConnection && this.webSocket.readyState === 1) { // 只有当链接打开时才进行订阅
      this.webSocket.send(cmd)
    }
  }
}
function webSocketFn(url) {
  let wb = new WebSocketClass(url)
  return {
    webSocketSend: wb.webSocketSend.bind(wb),
    errorCallBackFunObj: wb.errorCallBackFunObj,
    successFn: wb.successFn,
    isConnection: function () {
      return wb.isConnection
    }
  }
}
export default webSocketFn
