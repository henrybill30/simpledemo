const envID = 'simpledemo-9jk60' //线上版本
// const envID = 'test-pjzus'    //测试版本
App({
  onLaunch: async function() {
    let that = this
    wx.cloud.init({
      env: envID,
    })
    wx.getSetting({
      success (res) {
        // 如果已经授权用户信息，视为已登录
        if(res.authSetting['scope.userInfo']){
          that.globalData.loginFlag = true
        }
      }
    })
    let res = await wx.cloud.callFunction({
      name: 'login',
      data: {
        envID: envID,
      }
    })
    if(res.result.state){
      that.globalData.isNewUser = res.result.isNewUser
    }
    if(res.result.isNewUser){
      that.globalData.loginFlag = false
      wx.switchTab({
        url: '/pages/person/index',
      })
    }else{
      this.globalData.openid = res.result.openid
    }
  },
  globalData: {
    envID: envID,
    past: 0,
    timer: null,
    nickname: "",
    openid: "",
    isNewUser: true,
    isAdmin: false,
    loginFlag: false
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