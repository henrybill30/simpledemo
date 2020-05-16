// pages/components/API/API.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0,
    pageNum: 5,
    nbTitle: '',
    titleArr: ['系统信息','传感器','振动','扫码','获取位置信息'],
    sysInfo: {},
    toUrl: '',
    gyroscope: {},
    compass: {}
  },
  //系统信息
  getSystemMsg(){
    let that =this
    wx.getSystemInfo({
      success(res) {
        let obj = {
          model: `${res.brand} ${res.model}`,
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          language: res.language,
          version: res.version,
          system: res.system,
        }
        that.setData({
          sysInfo: obj
        })
      }
    })
  },
  //陀螺仪
  startGyroscope(){
    let that = this
    wx.startGyroscope({
      success(res){
        console.log(res)
        wx.onGyroscopeChange((result)=>{
          console.log(result)
          that.setData({
            gyroscope: result
          })
        })
      }
    })
  },
  stopGyroscope(){
    wx.stopGyroscope({
      success(res){
        console.log('关闭陀螺仪成功')
      }
    })
  },
  //震动
  vibrate(e){
    if(e.currentTarget.dataset.time){
      console.log('长震动')
      wx.vibrateLong()
    } else {
      console.log('短震动')
      wx.vibrateShort()
    }
  },
  //扫码
  scanCode(){
    let that = this
    wx.scanCode({
      success(res) {
        console.log(res)
        that.setData({
          toUrl: res.result
        })
      }
    })
  },
  //位置
  getLocation(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
    })
  },
  //罗盘
  startCompass(){
    let that = this;
    wx.startCompass({
      success(res){
        console.log(res);
        wx.onCompassChange((result)=>{
          that.setData({
            compass: result
          })
        })
      }
    })
  },
  stopCompass() {
    wx.stopCompass({
      success(){
        console.log('罗盘已关闭')
      }
    })
  },
  tobefore(e) {
    if (this.data.currentPage === 0) {
      this.setData({
        nbTitle: this.data.titleArr[0]
      })
      wx.cloud.callFunction({
        name: 'addRecord',
        data: {
          envID: getApp().globalData.envID,
          openid: getApp().globalData.openid,
          behavior: 'browse',
          component: this.data.titleArr[0],
          time: new Date()
        },
        success: res => {
          console.log("result: " + JSON.stringify(res.result))
        },
        fail: err => {
          console.log("error: " + JSON.stringify(err))
        }
      })
      return
    }
    var that = this;
    this.setData({
      currentPage: parseInt(this.data.currentPage) - 1,
      leftanimation: 'fade',
      nbTitle: this.data.titleArr[parseInt(this.data.currentPage) - 1]
    })
    wx.cloud.callFunction({
      name: 'addRecord',
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid,
        behavior: 'browse',
        component: this.data.titleArr[parseInt(this.data.currentPage)],
        time: new Date()
      },
      success: res => {
        console.log("result: " + JSON.stringify(res.result))
      },
      fail: err => {
        console.log("error: " + JSON.stringify(err))
      }
    })
    setTimeout(function () {
      that.setData({
        leftanimation: ''
      })
    }, 200)
  },
  tonext(e) {
    if (this.data.currentPage === this.data.pageNum - 1) {
      this.setData({
        nbTitle: this.data.titleArr[this.data.pageNum - 1]
      })
      wx.cloud.callFunction({
        name: 'addRecord',
        data: {
          envID: getApp().globalData.envID,
          openid: getApp().globalData.openid,
          behavior: 'browse',
          component: this.data.titleArr[this.data.pageNum],
          time: new Date()
        },
        success: res => {
          console.log("result: " + JSON.stringify(res.result))
        },
        fail: err => {
          console.log("error: " + JSON.stringify(err))
        }
      })
      return
    }
    var that = this;
    this.setData({
      currentPage: parseInt(this.data.currentPage) + 1,
      rightanimation: 'fade',
      nbTitle: this.data.titleArr[parseInt(this.data.currentPage) + 1]
    })
    wx.cloud.callFunction({
      name: 'addRecord',
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid,
        behavior: 'browse',
        component: this.data.titleArr[parseInt(this.data.currentPage)],
        time: new Date()
      },
      success: res => {
        console.log("result: " + JSON.stringify(res.result))
      },
      fail: err => {
        console.log("error: " + JSON.stringify(err))
      }
    })
    setTimeout(function () {
      that.setData({
        rightanimation: ''
      })
    }, 200)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentPage: parseInt(options.index),
      nbTitle: this.data.titleArr[parseInt(options.index)]
    })
    wx.cloud.callFunction({
      name: 'addRecord',
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid,
        behavior: 'browse',
        component: this.data.titleArr[parseInt(options.index)],
        time: new Date()
      },
      success: res => {
        console.log("result: " + JSON.stringify(res.result))
      },
      fail: err => {
        console.log("error: " + JSON.stringify(err))
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})