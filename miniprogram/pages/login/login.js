// miniprogram/login/login.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  getUserInfo: async function(e) {
    // console.log(JSON.parse(e.detail.rawData).nickName);
    getApp().globalData.nickname = JSON.parse(e.detail.rawData).nickName
    console.log(getApp().globalData.envID)
    wx.cloud.callFunction({
      name: 'login',
      data: {
        envID: getApp().globalData.envID,
        username: JSON.parse(e.detail.rawData).nickName
      },
      success: res => {
        // console.log("111: " + JSON.stringify(res.result))
        if(res.result.state == true){
          getApp().globalData.openid = res.result.openid
          getApp().globalData.isNewUser = res.result.isNewUser
          // console.log(getApp().globalData)
          // console.log(res.result.msg)
          wx.setStorageSync('openid', res.result.openid)
          // wx.setStorageSync('nickname', JSON.parse(e.detail.rawData).nickName)
          if(res.result.isNewUser){
            wx.switchTab({
              url: '/pages/person/index'
            })
          } else {
            wx.switchTab({
              url: '/pages/components/index/index'
            })
          }
        }else {
          console.log(res.result.msg)
        }
        

        // let that = getApp()
        // //周期性上传新数据到云数据库
        // that.globalData.timer = setInterval(function() {
        //   console.log(getApp().globalData)
        //   let logs = wx.getStorageSync('logs') || []
        //   let length = logs.length
        //   if (length > that.globalData.past) {
        //     let newLogs = logs.slice(0, length - that.globalData.past)
        //     console.log(that.globalData.nickname, that.globalData.openid, newLogs )
        //     wx.cloud.callFunction({
        //       name: 'add',
        //       data: {
        //         nickname: that.globalData.nickname,
        //         openid: that.globalData.openid,
        //         newLogs
        //       },
        //       success: res => {
        //         console.log("add success")
        //         console.log(res)
        //         that.globalData.past = length
        //       },
        //       fail: res => {
        //         console.log("add fail")
        //         console.log(res)
        //       }
        //     })
        //   }
        // }, 1000 * 10)
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})