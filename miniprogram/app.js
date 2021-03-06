const envID = 'simpledemo-9jk60' //线上版本
// const envID = 'test-pjzus'    //测试版本
App({
  onLaunch: async function() {
    let that = this
    wx.cloud.init({
      env: envID,
    })
    let size = wx.getSystemInfoSync()
    that.globalData.windowWidth = size.screenWidth,
    that.globalData.windowHeight = size.windowHeight
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
    
    wx.getSystemInfo({
      success(res) {
        let obj = {
          platform: res.platform
        }
        that.globalData.phoneSystem = (obj.platform === 'ios')
      }
    })

    // 获取是否已存储学号信息
    wx.cloud.callFunction({
      name: 'get_userInfo',
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid
      },
      success: res => {
        console.log(res.result.res[0].stuNum===undefined,'llll')
        if(res.result.res[0].stuNum===undefined){
          that.globalData.stuNumExist = false;
        } else {
          that.globalData.stuNumExist = true;
        }
      },
      fail: err => {
        console.log(err)
      }
    })

  },
  globalData: {
    envID: envID,
    past: 0,
    timer: null,
    nickname: "",
    openid: "",
    isNewUser: true,
    isAdmin: false,
    loginFlag: false,
    windowWidth: null,
    windowHeight: null,
    movedBtn:{
      x: 0,
      y: 0
    },
    stuNumExist: false,
    phoneSystem: false  // false标识安卓；true标识ios
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


