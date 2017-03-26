import './style.css'
import Vue from 'vue'
import touch from '../../'

Vue.use(touch)
var i = 0

/* eslint-disable no-new */
new Vue({
  el: '.container',

  data: {
    message: ''
  },

  methods: {
    remove () {
      this.list.splice(0, 1)
    },

    tap () {
      this.message = 'tap' + i++
      console.log('tap')
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
    }
  }
})
