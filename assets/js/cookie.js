// 对cookie的用法进行封装
const stCookie = {
  // 设置cookie
  setCookie: function (name, value, exdays, path, domain) {
    var stExdays = ''
    var stDomain = ''
    if (exdays) {
      var date = new Date()
      date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000))
      stExdays = ';expires=' + date.toUTCString()
    }
    if (domain) {
      stDomain = ';domain=' + domain
    }
    window.document.cookie = name + '=' + value + stExdays + ';path=' + path + stDomain
  },
  // 获取cookie
  getCookie: function (name) {
    var cookieName = name + '='
    var arr = document.cookie.split(';')
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      while (item.charAt(0) === ' ') item = item.substring(1)
      if (!item.indexOf(cookieName)) {
        return item.substring(cookieName.length, item.length)
      }
    }
    return ''
  },
  // 清除cookie
  clearCookie: function (name, domain) {
    var date = new Date()
    date.setTime(date.getTime() - 10000)
    var cookieValue = this.getCookie(name)
    var stDomain = ''
    if (domain) {
      stDomain = ';domain=' + domain
    }
    if (cookieValue !== null) {
      document.cookie = name + '=' + ' ' + ';expires=' + date.toGMTString() + ';path=/' + stDomain
    } else {
      alert(name + '的值为空！')
    }
  }
}

export default stCookie
