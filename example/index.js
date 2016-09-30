require('./style.css');
var Vue = require('Vue');

Vue.use(require('../'));
var i = 0;
new Vue({
    el: 'body',
    data: {
        message: ''
    },
    methods: {
        choose: function (a, b, c) {
            confirm('确定删除');
            this.message = '选中次数' + i++;
        }
    },
    ready(){
    }
});