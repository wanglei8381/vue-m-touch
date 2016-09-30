var Touch = require('super-touch');

var app = module.exports = {};
app.install = function (Vue, options) {
    Vue.directive('touch', {
        acceptStatement: true,
        bind: function () {
            var self = this;
            var touch = this.touch = new Touch(this.el);
            var longTapTimeout = null;
            touch.on('touch:start', function (res) {
                var e = res.e;
                e.preventDefault();
                longTapTimeout = setTimeout(function () {
                    if (self.arg === 'longtap') {
                        self.handler(e);
                    }
                }, 750);
            });

            touch.on('touch:move', function () {
                clearTimeout(longTapTimeout);
            });

            touch.on('touch:end', function (res) {
                clearTimeout(longTapTimeout);

                if (self.arg === 'tap' && Math.abs(res.x1 - res.x2) < 30 && Math.abs(res.y1 - res.y2) < 30) {
                    self.handler(res.e);
                }
            });

            touch.start();
        },
        update: function (cb) {
            if (typeof cb === 'function') {
                this.handler = cb;
            } else {
                this.handler = function () {
                    console.warn('[vue][directive][touch]请设置后调函数:' + self.arg + '="' + self.descriptor.raw + '"');
                };
            }
        },
        unbind: function () {
            //删除dom监听事件
            this.touch._remove();
            this.touch = null;
        }
    });
}