var Touch = require('super-touch');

var app = module.exports = {};
app.install = function (Vue, options) {

    options = options || {};
    var longTapTime = options.longTapTime || 350;

    Vue.directive('touch', {
        bind: function (el, binding, vnode) {
            var touch = el.touch = new Touch(el);
            var longTapTimeout = null;
            var handler = function (res) {
                var e = res.e;
                if (typeof binding.value === 'function') {
                    var _handler = function () {
                        if (binding.modifiers.self) {
                            if (e.target === e.currentTarget) {
                                binding.value(e);
                            }
                        } else {
                            binding.value(e);
                        }
                    }

                    switch (binding.arg) {
                        case 'tap':
                            if (Math.abs(res.x1 - res.x2) < 30 && Math.abs(res.y1 - res.y2) < 30) {
                                _handler();
                            }
                            break;
                        case 'longtap':
                            _handler();
                            break;
                    }
                }
            };

            var modify = function (e) {
                if (binding.modifiers.stop) {
                    e.stopPropagation();
                }
                if (binding.modifiers.prevent) {
                    e.preventDefault();
                }
            }

            touch.on('touch:start', function (res) {
                modify(res.e);
                longTapTimeout = setTimeout(function () {
                    handler(res);
                }, longTapTime);
            });

            touch.on('touch:move', function () {
                clearTimeout(longTapTimeout);
            });

            touch.on('touch:end', function (res) {
                clearTimeout(longTapTimeout);
                modify(res.e);
                handler(res);
            });

            touch.start();
        },
        unbind: function (el) {
            //删除dom监听事件
            el.touch._remove();
            el.touch = null;
        }
    });
}