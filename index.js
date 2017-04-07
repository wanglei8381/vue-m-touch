var Touch = require('super-touch')

module.exports = function (Vue, options) {

  options = options || {}
  var longTapTime = options.longTapTime || 350

  Vue.directive('touch', {
    bind: function (el, binding, vnode) {
      var touch = el.__touch = new Touch(el)
      var longTapTimeout      = null,
          tapTimeout          = null,
          swipeTimeout        = null,
          handler, args       = null,
          isFunctionalHandler = isFunction(binding.value)

      if (isFunctionalHandler) {
        handler = binding.value
      } else if (isObject(binding.value)) {
        el.__value = binding.value
        handler = binding.value.handler
      }

      var resolve = function (res, type) {
        if (type !== binding.arg || !handler) return
        var e = res.e
        var _handler = function () {
          if (isFunctionalHandler) {
            args = [e, el]
          } else {
            args = [el.__value, e, el]
          }
          if (binding.modifiers.self) {
            if (e.target === el) {
              handler.apply(binding.value, args)
            }
          } else {
            handler.apply(binding.value, args)
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
          resolve(res, 'longtap')
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
          resolve(res, 'tap')
        }, 0)

        swipeTimeout = setTimeout(function () {
          resolve(res, 'swipeleft')
          resolve(res, 'swiperight')
        }, 0)
      })

      touch.on('scroll', function () {
        clearTimeout(tapTimeout)
        clearTimeout(longTapTimeout)
        clearTimeout(swipeTimeout)
      })

      touch.start()
    },

    update (el, binding) {
      if (isObject(binding.value)) {
        el.__value = binding.value
      }
    },

    unbind: function (el) {
      // 删除dom监听事件
      if (el.__touch) {
        el.__touch.destroy()
      }
      el.__touch = null
    }
  })
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isFunction (obj) {
  return typeof obj === 'function'
}
