// rem适配方案
(function (win) {
  var doc = win.document
  var docEl = doc.documentElement
  var tid

  // 这里没解决DDR的1px边框问题 用border.css解决了
  function refreshRem () {
    var width = docEl.getBoundingClientRect().width
    // 默认以设计稿为iphone6的750px
    var rem = width / 7.5 // 将屏幕宽度分成7.5份， 1份为1rem
    docEl.style.fontSize = rem + 'px'
  }

  win.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 10)
  }, false)
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 10)
    }
  }, false)

  refreshRem()
})(window)
