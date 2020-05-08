App({
  onLaunch: function() {
    wx.clearStorage()
    wx.cloud.init()
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    past: 0,
    timer: null,
    nickname: "",
    openid: ""
  }
})