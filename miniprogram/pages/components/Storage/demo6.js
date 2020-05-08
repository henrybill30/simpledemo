// demo6/demo6.js
Page({
  to: function (e) {
    let id = e.target.dataset.id
    if (id == '1') {
      wx.navigateTo({
        url: '/demo7/demo7',
      })
    } else if (id == '2') {
      wx.reLaunch({
        url: '/index/index',
      })
    }
  },
  getSysInfo: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({sysInfo: res })
        console.log(res)
        let logs = wx.getStorageSync('logs') || []
        logs.unshift({
          operation: true,
          time: Date.now(),
          type: "getSysInfo",
          value: res
        })
        wx.setStorageSync('logs', logs)
      },
    })
  },

  onLoad: function (options) {
    var that = this
    wx.onCompassChange(function (res) {
      that.setData({ degree: res.direction })
    })

    wx.onAccelerometerChange(function (res) {
      that.setData({ res: res })
    })
  },

  vib: function () {
    wx.vibrateLong({
    })
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "vib",
      value: ""
    })
    wx.setStorageSync('logs', logs)
  },

  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        that.setData({res: res })
        let logs = wx.getStorageSync('logs') || []
        logs.unshift({
          operation: true,
          time: Date.now(),
          type: "scanCode",
          value: res
        })
        wx.setStorageSync('logs', logs)
      },
    })
  },

 viewLocation: function(){
   var that=this;
   wx.getLocation({
     success: function(res) {
       that.setData({
         lat:res.latitude,
         long: res.longitude
       })
       let logs = wx.getStorageSync('logs') || []
       logs.unshift({
         operation: true,
         time: Date.now(),
         type: "viewLocation",
         value: res.latitude
       })
       wx.setStorageSync('logs', logs)
     },
   })
 },

})