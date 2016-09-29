var touch = module.exports = {};
touch.install = function (Vue, options) {
    var uid = 0;
    Vue.directive('validator', {
        acceptStatement: true,
        bind: function () {
            this._uid = uid++;
        },
        update: function (cb) {
        },
        unbind: function () {
        }
    });
}