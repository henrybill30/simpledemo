
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    windowWidth: 0,
    windowHeight: 0,
    skeletonVisible: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      windowWidth: getApp().globalData.windowWidth,
      windowHeight: getApp().globalData.windowHeight
    })
    wx.cloud.callFunction({
      name: "get_article",
      data: {
        envID: getApp().globalData.envID
      },
      success: res => {
        console.log(res.result.res.data)
        that.setData({
          articles: res.result.res.data
        })
      },
      fail: err => {
        console.log("调用云函数失败：" + JSON.stringify(err))
      },
      complete: () => {
        that.setData({
          skeletonVisible: false
        })
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