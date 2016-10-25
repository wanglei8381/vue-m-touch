var Touch = require('super-touch');

var app = module.exports = {};
app.install = function (Vue, options) {
    Vue.directive('touch', {
        bind: function (el, binding, vnode) {
            var touch = el.touch = new Touch(el);
            var longTapTimeout = null;
            touch.on('touch:start', function (res) {
                var e = res.e;
                e.preventDefault();
                longTapTimeout = setTimeout(function () {
                    if (binding.arg === 'longtap') {
                        binding.value(res.e);
                    }
                }, 350);
            });

            touch.on('touch:move', function () {
                clearTimeout(longTapTimeout);
            });

            touch.on('touch:end', function (res) {
                clearTimeout(longTapTimeout);

                if (binding.arg === 'tap' && Math.abs(res.x1 - res.x2) < 30 && Math.abs(res.y1 - res.y2) < 30) {
                    binding.value(res.e);
                }
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