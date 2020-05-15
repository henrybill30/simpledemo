// const envID = 'simpledemo-9jk60' //线上版本
const envID = 'test-pjzus'    //测试版本
App({
  onLaunch: function() {
    wx.clearStorage()
    wx.cloud.init({
      env: envID,
    })
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    envID: envID,
    past: 0,
    timer: null,
    nickname: "",
    openid: ""
  }
})