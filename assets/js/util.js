class Precision {
  // 乘法
  times(num1, num2, ...others) {
    if (others.length > 0) {
      return this.times(this.times(num1, num2), ...others)
    }
    num1 = num1 || 0
    num2 = num2 || 0
    const num1Changed = this.float2Fixed(num1)
    const num2Changed = this.float2Fixed(num2)
    // 把两个数的小数位数相加
    const baseNum = this.digitLength(num1) + this.digitLength(num2)
    const leftValue = num1Changed * num2Changed
    // this.checkBoundary(leftValue)
    return leftValue / Math.pow(10, baseNum)
  }
// 精确加法
  plus(num1, num2, ...others) {
    if (others.length > 0) {
      return this.plus(this.plus(num1, num2), ...others)
    }
    const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    return (this.times(num1, baseNum) + this.times(num2, baseNum)) / baseNum
  }
// 精确减法
  minus(num1, num2, ...others) {
    if (others.length > 0) {
      return this.minus(this.minus(num1, num2), ...others)
    }
    const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    return (this.times(num1, baseNum) - this.times(num2, baseNum)) / baseNum
  }
// 精确除法
  divide(num1, num2, ...others) {
    if (others.length > 0) {
      return this.divide(this.divide(num1, num2), ...others)
    }
    const num1Change = this.float2Fixed(num1)
    const num2Change = this.float2Fixed(num2)
    return this.times(num1Change / num2Change, Math.pow(10, this.digitLength(num2) - this.digitLength(num1)))
  }
// 四舍五入，且保留小数
  round(num, ratio) {
    const base = Math.pow(10, ratio)
    return this.divide(Math.round(this.times(num, base)), base)
  }
// 把小数转成整数，支持科学计数法。如果是小数则放大成整数
  float2Fixed(num) {
    if (!~num.toString().indexOf('e')) {
      return Number(num.toString().replace('.', ''))
    }
    const dlen = this.digitLength(num)
    return dlen > 0 ? num * Math.pow(10, dlen) : num
  }
// 获取当前数小数位的长度(处理科学计数法，本质上处理e-n的情况)
  digitLength(num) {
    const eSplit = num.toString().split(/[eE]/)
    const len = (eSplit[0].split('.')[1] || '').length - (+eSplit[1] || 0)
    return len > 0 ? len : 0
  }
//  检测数字是否越界，如果越界给出提示
  checkBoundary(num) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.log(`${num} is beyond boundary when transfer to integer, the results may not be accurate`)
    }
  }
}

const Utils = {
  precision: new Precision(),
  // 获取小数位数
  retainDecimals(value, obj = {}) {
    if (!value) return 0
    value = value.toString()
    if (~value.indexOf('e')) {
      return 0
    }
    let decimals = ''
    if (value.indexOf('.') > 0 && obj.decimal !== 0) {
      let decimalsRe = new RegExp('[.]{1}[0-9]{0,' + (obj.decimal || 8) + '}')
      let decimalsExec = decimalsRe.exec(value)
      decimalsExec && (decimals = decimalsExec[0])
    }
    let v = 0
    let re = new RegExp('^-?[0-9]{1}[0-9]{0,' + (obj.integer - 1 || 8) + '}')
    v = re.exec(value)
    let n = ''
    if (v) {
      n = v[0]
    }
    return n + decimals
  },
  // 数字加逗号
  numberFormat(num) {
    if (num) {
      let [num1, num2] = num.toString().split('.')
      num1 = num1.split('').reverse().map((item, index) => {
        return (index) % 3 || !index || item === '-' || item === '+' ? item : item + ','
      }).reverse().join('')
      num2 ? num = num1 + '.' + num2 : num = num1
    }
    return num
  },
  // 补充0
  splitFormat(num, fractionDigits, len) {
    if (isNaN(num)) return num
    if (num) {
      if (num === '0') {
        return num
      }
      let digit = num.toString().split('.')
      if (fractionDigits === 0) {
        return digit[0]
      }
      if (digit.length > 1) {
        if (fractionDigits === 0) {
          return digit[0]
        } else if (digit[1].length < fractionDigits) {
          let digitResult = ''
          for (let i = 0; i < fractionDigits - digit[1].length; i++) {
            digitResult += '0'
          }
          return num + digitResult
        } else {
          let digitResult = digit[1].substring(0, len || fractionDigits)
          return digit[0] + '.' + digitResult
        }
      } else {
        let digitResult = '.'
        for (let i = 0; i < fractionDigits; i++) {
          digitResult += '0'
        }
        return num + digitResult
      }
    } else {
      return num
    }
  },
  // 位数不够补0
  addZero(num, len) {
    if (isNaN(num)) return 0
    let str = String(num)
    // console.log(num, len)
    return String(str).replace(new RegExp(`^(\\-?)(\\d+)(\\.\\d{1,${len}})?`), (n, a, b, c) => {
      // console.log(a, b, c)
      let str = a + b // .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      if (!len) {
        return str
      }
      if (c) {
        str += c + repeat('0', len - c.length)
      } else {
        str += '.' + repeat('0', len)
      }
      return str
    })
  },
  // 数字加逗号
  addCommom(num, len) {
    if (isNaN(num) || !num) return num
    num = String(num)
    if (!isNaN(len)) {
      if (len === 0) {
        num = num.split('.')[0]
      }
      return num.replace(/(\d+)(\.\d+)?/, (a, b, c) => {
        // console.log(b, c)
        return b.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (c ? c.slice(0, len + 1) : '')
      })
    } else {
      return num.replace(/^\d+/, (a) => { return a.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') })
    }
  },
  // 获取时间年月日 时分秒
  timeFormat(time, type) {
    let date = getTimeZone(time)
    if (!type) return getYMD(date) + ' ' + getHMS(date)
    switch (type) {
      case 'HMS': return getHMS(date)
      case 'YMD': return getYMD(date)
    }
  },
  cssProperty(attr) {
    var prefix = [ 'O', 'ms', 'Moz', 'Webkit' ]
    var len = prefix.length
    var style = document.createElement('i').style
    if (attr in style) {
      return true
    }
    attr = attr.replace(/^[a-z]/, function (val) {
      return val.toUpperCase()
    })
    while (len--) {
      if (prefix[ len ] + attr in style) {
        return true
      }
    }
    return false
  }
}
  // 字符串复制
function repeat(target, n) {
  var s = ''
  while (n > 0) {
    if (n % 2 === 1) {
      s += target
    }
    if (n === 1) { break }
    target += target
    n = n >> 1
  }
  return s
}
function singleFormat(str) {
  return str.toString().length === 1 ? ('0' + str) : str
}

function getYMD(time) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  return year + '-' + singleFormat(month) + '-' + singleFormat(date)
}

function getHMS(time) {
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  return singleFormat(hours) + ':' + singleFormat(minutes) + ':' + singleFormat(seconds)
}
function getTimeZone(time) {
  let GTM_8 = 480  // -480
  let date = new Date(time)
  let subMin = date.getTimezoneOffset() + GTM_8
  date.setMinutes(date.getMinutes() + subMin)
  return date
}

export default Utils
