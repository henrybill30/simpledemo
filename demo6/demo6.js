// demo6/demo6.js
Page({

  getSysInfo: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({sysInfo: res })
        console.log(res)
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
  },

  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        that.setData({res: res })
      },
    })
  },

 viewLocation: function(){
   var that=this;
   wx.getLocation({
     success: function(res) {
       that.setData({
         lat:res.latitude
       })
     },
   })
 },

})