const envID = 'simpledemo-9jk60' //线上版本
//const envID = 'test-pjzus'    //测试版本
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
    openid: "",
    isNewUser: true
  }
})



// {
//   "pagePath": "pages/components/componentpileup/index",
//   "text": "组件叠加",
//   "iconPath": "./pages/components/componentstear/叠加.png",
//   "selectedIconPath": "./pages/components/componentstear/叠加 (1).png"
// },{
//   "pagePath": "pages/components/componentstear/index",
//   "text": "组件拆解",
//   "iconPath": "./pages/components/componentstear/积木编程.png",
//   "selectedIconPath": "./pages/components/componentstear/积木编程 (1).png"
// },