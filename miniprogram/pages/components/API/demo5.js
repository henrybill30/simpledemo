const app = getApp()
Page({
  data: {
    x: false,
    k: 0,
  },
  to: function(e) {
    let id = e.target.dataset.id
    if (id == '1') {
      wx.navigateTo({
        url: '/demo6/demo6',
      })
    } else if (id == '2') {
      wx.reLaunch({
        url: '/index/index',
      })
    }
  },

  xChange: function(e) {
    this.setData({
      x: e.detail.value
    })
    console.log('switch发生change事件，携带value值为：', e.detail.value)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "xChange",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },

  kAdd: function() {
    this.setData({
      k: this.data.k + 1
    })
    console.log('button发生change事件，携带value值为：', this.data.k)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "kAdd",
      value: this.data.k
    })
    wx.setStorageSync('logs', logs)
  },
  kZero: function() {
    this.setData({
      k: 0
    })
    console.log('button发生change事件，携带value值为：', this.data.k)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "kZero",
      value: this.data.k
    })
    wx.setStorageSync('logs', logs)
  },
  onLoad: function(options) {},
})