var Touch = require('super-touch')

module.exports = function (Vue, options) {

  options = options || {}
  var longTapTime = options.longTapTime || 350

  Vue.directive('touch', {
    bind: function (el, binding, vnode) {
      var touch = el.touch = new Touch(el)
      var longTapTimeout = null,
          tapTimeout     = null,
          swipeTimeout   = null

      var handler = function (res, type) {
        if (type !== binding.arg) return
        var e = res.e
        if (typeof binding.value === 'function') {
          var _handler = function () {
            e.currentTarget = el
            if (binding.modifiers.self) {
              if (e.target === el) {
                binding.value(e, el)
              }
            } else {
              binding.value(e, el)
            }
          }

          switch (binding.arg) {
            case 'tap':
              if (res.spend < 250 && Math.abs(res.x1 - res.x2) < 10 && Math.abs(res.y1 - res.y2) < 10) {
                _handler()
              }
              break
            case 'longtap':
              _handler()
              break
            case 'swipeleft':
              if (res.dir === 'left' && Math.abs(res.x1 - res.x2) > 30) {
                _handler()
              }
              break
            case 'swiperight':
              if (res.dir === 'right' && Math.abs(res.x1 - res.x2) > 30) {
                _handler()
              }
              break
          }
        }
      }

      var modify = function (e) {
        if (binding.modifiers.stop) {
          e.stopPropagation()
        }
        if (binding.modifiers.prevent) {
          e.preventDefault()
        }
      }

      touch.on('touch:start', function (res) {
        modify(res.e)
        longTapTimeout = setTimeout(function () {
          handler(res, 'longtap')
        }, longTapTime)
      })

      touch.on('touch:move', function (res) {
        modify(res.e)
        clearTimeout(longTapTimeout)
      })

      touch.on('touch:end', function (res) {
        clearTimeout(longTapTimeout)
        modify(res.e)
        tapTimeout = setTimeout(function () {
          handler(res, 'tap')
        }, 0)

        swipeTimeout = setTimeout(function () {
          handler(res, 'swipeleft')
          handler(res, 'swiperight')
        }, 0)
      })

      touch.on('scroll', function () {
        clearTimeout(tapTimeout)
        clearTimeout(longTapTimeout)
        clearTimeout(swipeTimeout)
      })

      touch.start()
    },
    unbind: function (el) {
      // 删除dom监听事件
      if (el.touch) {
        el.touch.destroy()
      }
      el.touch = null
    }
  })
}