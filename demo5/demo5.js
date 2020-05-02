const app = getApp()
Page({
  data: {
    x: false,
    k: 0,
  },

  xChange: function (e) {
    this.setData({ x: e.detail.value }),
      console.log('switch发生change事件，携带value值为：', e.detail.value)
  },

  kAdd: function () {
    this.setData({ k: this.data.k + 1 }),
      console.log('button发生change事件，携带value值为：', this.data.k)
  },
  kZero: function () {
    this.setData({ k: 0 }),
      console.log('button发生change事件，携带value值为：', this.data.k)
  },
  onLoad: function (options) {
  },
})
