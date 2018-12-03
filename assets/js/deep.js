class Deep {
  constructor(canvas, toolTips, arr1, arr2, priceLabel = '委托价', sumLabel = '累计', bits, unit_filter) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.toolTips = toolTips
    this.ctxTool = toolTips.getContext('2d')
    this.arr1 = arr1  // 左侧数据(原始)
    this.arr2 = arr2  // 右侧数据(原始)
    this.arr = [] // 绘制深度数据
    this.width = 0  // 坐标系宽度
    this.height = 0 // 坐标系高度
    this.pxY = 0  // 纵坐标轴单位像素累积量
    this.priceLabel = priceLabel  // 文本label
    this.sumLabel = sumLabel  // 文本label
    this.bits = bits  // 数据精度
    this.unit_filter = unit_filter // 过滤精度
    this.init()
  }

  init() {
    this.setSize()
    this.canvas.height = this.canvas.offsetHeight
    this.toolTips.height = this.canvas.offsetHeight
    this.height = this.canvas.height - Deep.deepStyle.top - Deep.deepStyle.bottom
    this.clearDeep()
    if (!this.arr1 || !this.arr2) return false
    this.arr1 = this.getShowList(this.arr1).reverse()
    this.arr2 = this.getShowList(this.arr2)
    this.draw()
  }
  getShowList(list) {
    let info, item
    let len = list.length
    let newlist = []
    let index = 0
    for (;index < len; index++) {
      item = list[index]
      if (this.unit_filter && info && Number(item.price) * this.unit_filter - Number(info.price) < 0) {
        break
      }
      info = item
      newlist.push([item.price, item.vol])
    }
    return newlist
  }
  // 设置画布尺寸
  setSize() {
    this.canvas.width = this.canvas.offsetWidth
    this.toolTips.width = this.canvas.offsetWidth
    this.width = this.canvas.width - Deep.deepStyle.left - Deep.deepStyle.right
  }

  // 深度绘制
  draw() {
    if (this.width <= 0) {
      return false
    }
    // 坐标 -0.5 处理单像素线条模糊
    let Ox = this.width + Deep.deepStyle.left - 0.5
    let Oy = Deep.deepStyle.top + this.height - 0.5
    let x1 = Deep.deepStyle.left + Deep.deepStyle.sideSpace - 0.5
    let x0 = Ox - Deep.deepStyle.sideSpace
    let innerWidth = x0 - x1  // 坐标标记点内宽度
    let numX = Math.floor(innerWidth / Deep.deepStyle.spaceX)
    let numY = Math.ceil(this.height / Deep.deepStyle.spaceY)
    let range = this.getRange()
    let pxX = Math.abs(range.rangeX / this.width)
    // 初始化绘制数据数组
    this.arr = []
    for (let i = 0; i <= this.width; i++) {
      this.arr.push([range.startX + pxX * i, 0])
    }
    // 计算绘制数据数组
    this.getPx1Arr(this.arr, range.startX, pxX)
    this.getPx2Arr(this.arr, range.startX, pxX)
    // 获取纵坐标轴范围
    range.endY = Math.max(Number(this.arr[0][1]), Number(this.arr[this.arr.length - 1][1]))
    // 计算纵轴单位像素累积量
    let pxY = (range.endY / this.height)
    // Y坐标最小单位为0.1
    let unitMarkY = pxY * Deep.deepStyle.spaceY
    if (unitMarkY < 1000) pxY = Math.ceil(unitMarkY * 10) / 10 / Deep.deepStyle.spaceY
    this.pxY = pxY
    // 绘制坐标轴
    this.ctx.strokeStyle = Deep.deepStyle.axisColor
    this.ctx.lineWidth = Deep.deepStyle.lineWidth
    this.ctx.font = Deep.deepStyle.font
    this.ctx.fillStyle = Deep.deepStyle.axisFontColor
    this.ctx.textAlign = 'center'
    this.ctx.beginPath()
    this.ctx.moveTo(Ox - this.width, Oy)
    this.ctx.lineTo(Ox + 1, Oy)
    this.ctx.lineTo(Ox + 1, 0)
    for (let i = 0; i <= numX; i++) {
      this.ctx.moveTo(x1 + innerWidth * i / numX, Oy)
      this.ctx.lineTo(x1 + innerWidth * i / numX, Oy + Deep.deepStyle.markLine)
      this.ctx.fillText((pxX * (Deep.deepStyle.sideSpace + innerWidth * i / numX) + range.startX).toFixed(this.bits.price), x1 + innerWidth * i / numX, Oy + 20)
    }
    // 绘制坐标刻度
    this.ctx.textAlign = 'start'
    for (let i = 0; i <= numY; i++) {
      if (i === numY && Oy - numY * Deep.deepStyle.spaceY < 30) break
      this.ctx.moveTo(Ox, Oy - i * Deep.deepStyle.spaceY)
      this.ctx.lineTo(Ox + Deep.deepStyle.markLine, Oy - i * Deep.deepStyle.spaceY)
      let markY = pxY * i * Deep.deepStyle.spaceY
      if (markY >= 1000 && markY < 1000000) {
        markY = (markY / 1000).toFixed(2) + 'K'
      } else if (markY >= 1000000 && markY < 1000000000) {
        markY = (markY / 1000000).toFixed(2) + 'M'
      } else if (markY >= 1000000000 && markY < 1000000000000) {
        markY = (markY / 1000000000).toFixed(2) + 'G'
      } else if (markY >= 1000000000000 && markY < 1000000000000000) {
        markY = (markY / 1000000000000).toFixed(2) + 'T'
      } else if (markY >= 1000000000000000 && markY < 1000000000000000000) {
        markY = (markY / 1000000000000000).toFixed(2) + 'P'
      } else markY = (pxY * i * Deep.deepStyle.spaceY).toFixed(this.bits.size)
      this.ctx.fillText(markY, Ox + 10, Oy - i * Deep.deepStyle.spaceY + 4)
    }
    this.ctx.stroke()
    // 绘制左侧深度
    this.ctx.strokeStyle = Deep.deepStyle.color1
    this.ctx.fillStyle = Deep.deepStyle.color1
    this.ctx.beginPath()
    this.ctx.moveTo(Ox - this.width, Oy)
    for (let i = 0; i < parseInt(this.width / 2); i++) {
      this.ctx.lineTo(Ox - this.width + i, Oy - this.arr[i][1] / pxY)
    }
    this.ctx.lineTo(Ox - parseInt(this.width / 2) + 1, Oy)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    // 绘制右侧深度
    this.ctx.strokeStyle = Deep.deepStyle.color2
    this.ctx.fillStyle = Deep.deepStyle.color2
    this.ctx.beginPath()
    this.ctx.moveTo(Ox - this.width + parseInt(this.width / 2), Oy)
    for (let i = parseInt(this.width / 2); i < this.width + 1; i++) {
      this.ctx.lineTo(Ox - this.width + i, Oy - this.arr[i][1] / pxY)
    }
    this.ctx.lineTo(Ox, Oy)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
  }

  // 获取水平轴尺度范围
  getRange() {
    let range = {}
    let buyFirst = this.arr1[this.arr1.length - 1] ? Number(this.arr1[this.arr1.length - 1][0]) : 0
    let buyLast = this.arr1[0] ? Number(this.arr1[0][0]) : 0
    let sellFirst = this.arr2[0] ? Number(this.arr2[0][0]) : 0
    let sellLast = this.arr2[this.arr2.length - 1] ? Number(this.arr2[this.arr2.length - 1][0]) : 0
    let middleX = (buyFirst + sellFirst) / 2
    !buyFirst && (middleX = sellFirst)
    !sellFirst && (middleX = buyFirst)
    let rangeX = Math.min(middleX - buyLast, sellLast - middleX)
    !buyFirst && (rangeX = sellFirst !== sellLast ? sellLast - middleX : middleX)
    !sellFirst && (rangeX = buyFirst !== buyLast ? middleX - buyLast : middleX)
    range.rangeX = rangeX * 2
    range.startX = middleX - rangeX
    range.startX === middleX && (range.startX = 0)
    return range
  }

  // 获取arr1深度累计量
  getPx1Arr(arr, startX, pxX) {
    this.arr1.map(v => {
      // console.log(((v[0])))
      if (parseInt((v[0] - startX) / pxX) > this.width / 2) return false
      for (let i = 0; i <= parseInt((v[0] - startX) / pxX) && i >= 0; i++) {
        arr[i][1] += Number(v[1])
      }
    })
  }

  // 获取arr2深度累计量
  getPx2Arr(arr, startX, pxX) {
    this.arr2.map(v => {
      for (let i = this.width; i > parseInt((v[0] - startX) / pxX) && i >= 0; i--) {
        arr[i][1] += Number(v[1])
        // if (arr[i]) {
        // } else {
        //   console.log(arr[i], 88)
        // }
      }
    })
  }

  // 清除深度图层
  clearDeep() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // 清除工具图层
  clearTool() {
    this.ctxTool.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // 视口尺寸改变
  resize() {
    if (!this.arr1 || !this.arr2) return false
    this.setSize()
    this.clearDeep()
    this.draw()
  }

  // 数据变化
  dataChange(arr1, arr2) {
    this.clearDeep()
    this.arr1 = arr1 || []
    this.arr2 = arr2 || []
    this.arr1 = this.getShowList(this.arr1).reverse()
    this.arr2 = this.getShowList(this.arr2)
    this.arr = []
    this.draw()
  }

  // 鼠标移动绘制提示工具
  mouseMove(x) {
    this.clearTool()
    this.drawTips(x)
  }

  // 绘制提示工具
  drawTips(x) {
    if (x - Deep.deepStyle.left < 0 || x > Deep.deepStyle.left + this.width) return false
    let Oy = Deep.deepStyle.top + this.height - 0.5
    if (!this.arr[x - Deep.deepStyle.left]) return false
    let position = [x, Oy - this.arr[x - Deep.deepStyle.left][1] / this.pxY]
    // 绘制圆点
    this.ctxTool.beginPath()
    this.ctxTool.fillStyle = Deep.deepStyle.dotColor2
    this.ctxTool.arc(position[0], position[1], 10, 0, 2 * Math.PI)
    this.ctxTool.fill()
    this.ctxTool.beginPath()
    this.ctxTool.fillStyle = Deep.deepStyle.dotColor1
    this.ctxTool.arc(position[0], position[1], 5, 0, 2 * Math.PI)
    this.ctxTool.fill()
    // 绘制文本框
    let width = Deep.deepStyle.textBoxWidth
    let height = Deep.deepStyle.textBoxHeight
    let boxX = position[0] - width / 2
    let boxY = position[1] - height - 20
    if (position[0] < width / 2 + Deep.deepStyle.left) boxX = Deep.deepStyle.left + 5
    if (position[0] > Deep.deepStyle.left + this.width - width / 2) boxX = Deep.deepStyle.left + this.width - width - 5
    if (boxY < 20) boxY = position[1] + 20
    this.ctxTool.beginPath()
    this.ctxTool.fillStyle = Deep.deepStyle.textBgColor
    this.ctxTool.strokeStyle = Deep.deepStyle.textBgColor
    this.ctxTool.lineJoin = 'round'
    this.ctxTool.lineWidth = Deep.deepStyle.radius
    this.ctxTool.strokeRect(boxX, boxY, width, height)
    this.ctxTool.stroke()
    this.ctxTool.fillRect(boxX, boxY, width, height)
    this.ctxTool.fill()
    this.ctxTool.beginPath()
    this.ctxTool.fillStyle = Deep.deepStyle.textFontColor
    this.ctxTool.font = Deep.deepStyle.textFont
    this.ctxTool.fillText(this.priceLabel, boxX + Deep.deepStyle.textPaddingLeft, boxY + Deep.deepStyle.textLineHeight)
    this.ctxTool.fillText(this.sumLabel, boxX + Deep.deepStyle.textPaddingLeft, boxY + Deep.deepStyle.textLineHeight * 2)
    this.ctxTool.fillText(this.arr[x - Deep.deepStyle.left][0].toFixed(this.bits.price), boxX + Deep.deepStyle.textPaddingLeft + 46, boxY + Deep.deepStyle.textLineHeight)
    this.ctxTool.fillText(this.arr[x - Deep.deepStyle.left][1].toFixed(this.bits.size), boxX + Deep.deepStyle.textPaddingLeft + 46, boxY + Deep.deepStyle.textLineHeight * 2)
    this.ctxTool.fill()
  }
}
Deep.deepStyle = {
  color1: '#284141',  // 左侧数组颜色
  color2: '#483137',  // 右侧数组颜色
  axisColor: '#313A56', // 坐标轴颜色
  axisFontColor: '#8096B7', // 坐标字体颜色
  dotColor1: '#7a98f7', // 小圆点颜色
  dotColor2: 'rgba(122, 152, 247, 0.3)',  // 大圆颜色
  textBgColor: 'rgba(46, 61, 88, 0.9)', // 文本容器颜色
  textBoxWidth: 140,  // 文本容器宽度
  textBoxHeight: 60,  // 文本容器高度
  textFontColor: '#cbd7f0',  // 文本颜色
  textFont: '12px', // 文本字体大小
  textPaddingLeft: 12,
  textLineHeight: 22,
  radius: 6,  // 文本框圆角（线型round）
  font: '12px Arial', // 数字字体
  lineWidth: 1, // 坐标轴宽度
  left: 16, // 坐标轴位置(画布)
  right: 60,
  top: 80,
  bottom: 27,
  spaceX: 100, // 坐标轴x最小间距
  spaceY: 75, // 坐标轴y最小间距
  sideSpace: 50, // 坐标轴x边界间距
  markLine: 6  // 坐标标记线长度
}
export default Deep
