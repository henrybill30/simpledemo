const app = getApp()

Page({
  data: {},
  to: function (e) {
    let id = e.target.dataset.id
    if (id == '1') {
      wx.navigateTo({
        url: '/demo3/demo3',
      })
    } else if (id == '2') {
      wx.reLaunch({
        url: '/index/index',
      })
    }
  },

  switchChange: function (e) {
    console.log(e)
    console.log('switch发生change事件，携带value值为：', e.detail.value)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation:true,
      time: Date.now(),
      type: "switchChange",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },

  radioBoxChange: function (e) {
    console.log('radiobox发生change事件，携带value值为：', e.detail.value)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "radioBoxChange",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },

  checkBoxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "checkBoxChange",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },

  sliderChange: function (e) {
    console.log('slider发生change事件，携带value值为：', e.detail.value)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "sliderChange",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },

  onGotUserInfo: function (e) {
    console.log(e.detail.userInfo)
  }

})
