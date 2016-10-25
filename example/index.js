require('./style.css');
var Vue = require('vue');

Vue.use(require('../'));
var i = 0;
new Vue({
    el: '.choose-result',
    data: {
        message: ''
    },
    methods: {
        choose: function (a, b, c) {
            console.log(a, b, c);
            this.message = '选中次数' + i++;
        }
    }
});