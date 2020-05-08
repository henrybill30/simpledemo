// demo7/demo7.js
Page({
  to: function() {
    wx.reLaunch({
      url: '/index/index',
    })
  },
  keyInput: function(e) {
    this.setData({
      key: e.detail.value
    })
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "keyInput",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },
  valueInput: function(e) {
    this.setData({
      value: e.detail.value
    })
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "valueInput",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },
  setStorageSync: function(e) {
    let key = this.data.key
    if (key.length == 0) {
      wx.showToast({
        title: 'KEY不能为空',
      })
    } else {
      wx.setStorageSync(key, this.data.value)
      let logs = wx.getStorageSync('logs') || []
      logs.unshift({
        operation: true,
        time: Date.now(),
        type: "setStorageSync",
        value: {
          key: key,
          value: this.data.value
        }
      })
      wx.setStorageSync('logs', logs)
    }
  },
  removeStorageSync: function() {
    let key = this.data.key;
    wx.removeStorageSync(key)
    wx.showToast({
      title: '删除成功',
    })
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "removeStorageSync",
      value: key
    })
    wx.setStorageSync('logs', logs)
  },
  getStorageSync: function() {
    var that = this
    let key = this.data.key
    var data = wx.getStorageSync(key)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "getStorageSync",
      value: key
    })
    wx.setStorageSync('logs', logs)
    if (data) {
      that.setData({
        value: data
      })
    } else {
      wx.showToast({
        title: '没有数据',
      })
      console.log(key)
    }
  },
})