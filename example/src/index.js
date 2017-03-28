import './style.css'
import Vue from 'vue'
import touch from '../../'

Vue.use(touch)
var i = 0

/* eslint-disable no-new */
new Vue({
  el: '.container',

  data: {
    message: 'tap'
  },

  methods: {
    remove () {
      this.list.splice(0, 1)
    },

    tap () {
      this.message = 'tap' + i++
      console.log('tap')
    },

    tap2 (arg) {
      console.log(arg.msg)
    },

    longtap () {
      this.message = 'longtap' + i++
      console.log('longtap')
    },

    swipeleft () {
      this.message = 'swipeleft' + i++
      console.log('swipeleft')
    },

    swiperight () {
      this.message = 'swiperight' + i++
      console.log('swiperight')
    },

    handler (...args) {
      console.log(args)
    }
  },

  directives: {
    demo: {
      // 调用一次,指令绑定到元素上的时候
      bind (el, binding, vnode) {
        console.log(typeof binding.value)
      },

      // 元素插入到父节点中,可能并不存在dom树中
      inserted (el, binding, vnode) {

      },

      // 组件每次更新都会调用(render),但可能在孩子节点更新之前
      update (el, binding, vnode, oldVnode) {
        // binding.value.handler(binding.value.name)
      },

      // 组件每次更新都会调用(render),在孩子节点更新之后
      componentUpdated (el, binding, vnode, oldVnode) {

      },

      // 调用一次,指令解绑
      unbind (el, binding, vnode) {

      }
    }
  }
})
