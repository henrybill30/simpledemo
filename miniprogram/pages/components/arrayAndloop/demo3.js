const app = getApp()

Page({
  data: {
    switchValue: "none",
    radioValue: "none",
    checkBoxValue: "none",
    sliderValue: 0,
    timePickerValue: "09:30"
  },
  to: function(e) {
    let id = e.target.dataset.id
    if (id == '1') {
      wx.navigateTo({
        url: '/demo4/demo4',
      })
    } else if (id == '2') {
      wx.reLaunch({
        url: '/index/index',
      })
    }
  },

  switchChange: function(e) {
    this.setData({
      switchValue: e.detail.value
    })
    console.log('switch发生change事件，携带value值为：', e.detail.value)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "switchChange",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },

  radioBoxChange: function(e) {
    this.setData({
      radioValue: e.detail.value
    })
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

  checkBoxChange: function(e) {
    this.setData({
      checkBoxValue: e.detail.value
    })
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

  timePickerChange: function(e) {
    this.setData({
      timePickerValue: e.detail.value
    })
    console.log('Time picker发生change事件，携带value值为：', e.detail.value)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "timePickerChange",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },

  sliderChange: function(e) {
    this.setData({
      sliderValue: e.detail.value
    })
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

  onGotUserInfo: function(e) {
    console.log(e.detail.userInfo)
    this.setData({
      buttonValue: e.detail.userInfo.nickName
    })
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "onGotUserInfo",
      value: e.detail.userInfo.nickName
    })
    wx.setStorageSync('logs', logs)
  },

  onLoad: function(options) {},
})