require('./style.css');
var Vue = require('vue');

Vue.use(require('../'));
var i = 0;
new Vue({
    el: '.container',
    data: {
        message: ''
    },
    methods: {
        tap () {
            this.message = 'tap' + i++;
            console.log('tap');
        },
        longtap(){
            this.message = 'longtap' + i++;
            console.log('longtap');
        },
        swipeleft() {
            this.message = 'swipeleft' + i++;
            console.log('swipeleft');
        },
        swiperight() {
            this.message = 'swiperight' + i++;
            console.log('swiperight');
        }
    }
});