(function () {
  var hm = document.createElement('script')
  var div = document.createElement('div')
  div.innerHTML = '<!-- Global site tag (g (gtag.js) - ) - Google Analytics -->'
  hm.src = 'https://www.googletagmanager.com/gtag/js?id=UA-113179273-1'
  // hm.async = false
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(div, s)
  s.parentNode.insertBefore(hm, s)
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'UA-113179273-1')
})()
