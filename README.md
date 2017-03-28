# vue-m-touch
 <h5>基于vue移动端手势库</h5>
 <h6>从v0.0.3开始支持vue2.x</h6>
 
## Install
npm install vue-m-touch

## Use
<pre>
var Vue = require('vue');
Vue.use(require('vue-m-touch'));
</pre>

## Api
<pre>
v-touch:tap
v-touch:longtap
v-touch:swipeleft
v-touch:swiperight
v-touch:tap.stop
v-touch:tap.prevent
v-touch:tap.self

传参数:
vue建议通过dataset方式
v-touch:tap="handler"
也可以通过对象的形式传参数,必须存在一个handler属性用于回调
v-touch:tap="{handler:handler,arg1:'1',arg2:{}}"
</pre>
